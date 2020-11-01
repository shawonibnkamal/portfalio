<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['string'],
            'username' => ['string'],
            'password' => ['string','required'],
        ]);


        if (Arr::exists($request, 'email'))
        {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password]))
            {
                $loginToken = Auth::user()->createToken('loginToken')->accessToken;

                return response(['user_info' => User::where('email', $request->email)->get(), 'login_token' => $loginToken]);
            }
            else
            {
                return response()->json(['error' => 'Invalid login credentials'], 401);
            }
        }
        else
        {
            if (Auth::attempt(['username' => $request->username, 'password' => $request->password]))
            {
                $loginToken = Auth::user()->createToken('loginToken')->accessToken;

                return response([User::where('username', $request->username)->get(), 'login_token' => $loginToken]);
            }
            else
            {
                return response()->json(['error' => 'Invalid login credentials'], 401);
            }
        }
    }

    public function logout(Request $request)
    {
        if (Auth::guard('api')->check()) {
            Auth::guard('api')->user()->token()->delete();
            Auth::logout();

            return response(['message' => 'logout success!']);
        }
        else
        {
            return response(['message' => 'logout fail!']);
        }
    }
}
