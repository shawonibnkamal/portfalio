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
        ]);

        if (Arr::exists($request, 'profile_pic')) // profile pic submitted
            {
                //rename profile_pic to unique name
                do
                {
                    $dateTimeString = now()->day . now()->month . now()->year . now()->hour . now()->minute . now()->second;
                    $newName = $request->logo . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '-' . random_int(1,99);
                } while (Portfolio::where('profile_pic', $newName)->exists());
                
                $request->merge(['profile_pic' => $newName]);
            }
        else
        {
            $request->merge(['profile_pic' => 'default_profile.jpg']);
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
        if (Auth::guard('api')->check())
        {
            if (Arr::exists($request, 'profile_pic')) // profile pic submitted
            {
                //rename profile_pic to unique name
                do
                {
                    $dateTimeString = now()->day . now()->month . now()->year . now()->hour . now()->minute . now()->second;
                    $newName = $request->logo . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '-' . random_int(1,99);
                } while (Portfolio::where('profile_pic', $newName)->exists());
                
                $request->merge(['profile_pic' => $newName]);
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
