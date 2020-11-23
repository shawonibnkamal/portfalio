<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get all users
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validation
        $request->validate([
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'username' => ['required', 'unique:App\Models\User,username', 'string', 'regex:/^[A-Za-z\.\-\_0-9]+$/', 'not_in:admin,administrator,operator,login,logout,dashboard,body,html,css,robot,robot_txt'],
            'email' => ['required', 'email', 'unique:App\Models\User,email', 'string'],
            'password' => ['required', 'string'],
            'profile_pic_image' => ['image'],
        ]);

        if (Arr::exists($request, 'profile_pic_image') && $request->hasFile('profile_pic_image')) // profile pic submitted
        {
            //rename image and store location to db
            if ($request->file('profile_pic_image')->isValid()) {
                //rename file
                $originalFileExtension = $request->file('profile_pic_image')->getClientOriginalExtension();
                $imageFileMD5 = md5_file($request->file('profile_pic_image'));
                $dateTimeString = now()->day . '-' . now()->month . '-' . now()->year;
                $newName = $imageFileMD5 . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '.' . $originalFileExtension;

                $image_path = Storage::disk('public')->putFileAs('images', $request->file('profile_pic_image'), $newName);
                $request->merge(['profile_pic' => $image_path]);
            } else {
                return response()->json(['error' => 'Invalid file'], 422);
            }
        }

        $request->merge(['password' => Hash::make($request->password)]);

        //create user
        return User::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //validation
        $request->validate([
            'first_name' => ['string'],
            'last_name' => ['string'],
            'username' => ['string', 'unique:App\Models\User,username', 'regex:/^[A-Za-z\.\-\_0-9]+$/', 'not_in:admin,administrator,operator,login,logout,dashboard,body,html,css,robot,robot_txt'],
            'email' => ['email', 'unique:App\Models\User,email', 'string'],
            'password' => ['string'],
            'profile_pic_image' => ['image'],
        ]);

        if (Auth::guard('api')->check()) {
            if (Arr::exists($request, 'profile_pic_image') && $request->hasFile('profile_pic_image')) // profile pic submitted
            {
                //rename image and store location to db
                if ($request->file('profile_pic_image')->isValid()) {
                    //delete old profic pic
                    if (Storage::disk('public')->exists(User::find(Auth::guard('api')->user()->id)->profile_pic)) {
                        Storage::disk('public')->delete(User::find(Auth::guard('api')->user()->id)->profile_pic);
                    }

                    //rename file
                    $originalFileExtension = $request->file('profile_pic_image')->getClientOriginalExtension();
                    $imageFileMD5 = md5_file($request->file('profile_pic_image'));
                    $dateTimeString = now()->day . '-' . now()->month . '-' . now()->year;
                    $newName = $imageFileMD5 . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '.' . $originalFileExtension;

                    $image_path = Storage::disk('public')->putFileAs('images', $request->file('profile_pic_image'), $newName);
                    $request->merge(['profile_pic' => $image_path]);
                } else {
                    return response()->json(['error' => 'Invalid file'], 422);
                    //return response(['message' => 'Invalid file']);
                }
            }

            //if password was updated, run this
            if (Arr::exists($request, 'password')) {
                $request->merge(['password' => Hash::make($request->password)]);
            }

            return Auth::guard('api')->user()->update($request->all());
        } else {
            return response()->json(['error' => 'Invalid login credentials'], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Auth::guard('api')->check()) {
            //delete user profile pic
            if (Storage::disk('public')->exists(User::find(Auth::guard('api')->user()->id)->profile_pic)) {
                Storage::disk('public')->delete(User::find(Auth::guard('api')->user()->id)->profile_pic);
            }
            //since portfolios are set to delete when user account is deleted,
            //delete portfolio images from storage also
            $portfolioList = Portfolio::where('user_id', Auth::guard('api')->user()->id)->get();

            foreach ($portfolioList as $pItem) {
                //delete profile pic
                if (Storage::disk('public')->exists(Portfolio::find($pItem->id)->portfolio_pic)) {
                    Storage::disk('public')->delete(Portfolio::find($pItem->id)->portfolio_pic);
                }
            }

            return Auth::guard('api')->user()->delete();
        } else {
            return response()->json(['error' => 'Invalid login credentials'], 401);
        }
    }

    public function getPortfolios($username)
    {
        $userInfo = User::where('username', $username)->get();

        $portfolioList = Portfolio::where('user_id', $userInfo[0]->id)->get();

        return response()->json(['userPortfolios' => [$userInfo, $portfolioList]]);
    }

}
