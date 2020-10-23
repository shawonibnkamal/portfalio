<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use App\Models\User;

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
        $request-> validate([
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:App\Models\User,email', 'string'],
            'password' => ['required', 'string'],
            'profile_pic_image' => ['mimes:jpeg,png'],
        ]);

        if (Arr::exists($request, 'profile_pic_image') && $request->hasFile('logo_image')) // profile pic submitted
        {
            //rename image and store location to db
            if ($request->file('profile_pic_image')->isValid())
            {
                //rename file
                $originalFileExtension = $request->file('profile_pic_image')->getClientOriginalExtension();
                $imageFileMD5 = md5_file($request->file('profile_pic_image'));
                $dateTimeString = now()->day . '-' . now()->month . '-' . now()->year;
                $newName = $imageFileMD5 . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '.' . $originalFileExtension;

                $file = $request->file('profile_pic_image')->storeAs('images',$newName);
                $request->merge(['profile_pic' => $file]);
            }
            else
            {
                return response(['message' => 'Invalid file']);
            }
        }

        $request->merge(['password' => Hash::make($request -> password)]);

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
        $request-> validate([
            'first_name' => ['string'],
            'last_name' => ['string'],
            'email' => ['email', 'unique:App\Models\User,email', 'string'],
            'password' => ['string'],
            'profile_pic_image' => ['mimes:jpeg,png'],
        ]);

        if (Auth::guard('api')->check())
        {
            if (Arr::exists($request, 'profile_pic_image') && $request->hasFile('logo_image')) // profile pic submitted
            {
                //rename image and store location to db
                if ($request->file('profile_pic_image')->isValid())
                {
                    //rename file
                    $originalFileExtension = $request->file('profile_pic_image')->getClientOriginalExtension();
                    $imageFileMD5 = md5_file($request->file('profile_pic_image'));
                    $dateTimeString = now()->day . '-' . now()->month . '-' . now()->year;
                    $newName = $imageFileMD5 . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '.' . $originalFileExtension;

                    $file = $request->file('profile_pic_image')->storeAs('images',$newName);
                    $request->merge(['profile_pic' => $file]);
                }
                else
                {
                    return response(['message' => 'Invalid file']);
                }
            }

            //if password was updated, run this
            if (Arr::exists($request, 'password'))
            {
                $request->merge(['password' => Hash::make($request -> password)]);
            }

            return Auth::guard('api')->user()->update($request->all());
        }
        else
        {
            return response(['message' => 'Invalid login credentials']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        if (Auth::check())
        {
            //return User::destroy($id);
            return Auth::guard('api')->user()->delete();
        }
        else
        {
            return response(['message' => 'Invalid login credentials']);
        }
    }
}
