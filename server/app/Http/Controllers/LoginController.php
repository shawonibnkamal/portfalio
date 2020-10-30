<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $loginInfo = $request->validate([
            'email' => ['required','string'],
            'password' => ['required','string'],
        ]);

        if (Auth::attempt($loginInfo))
        {
            $loginToken = Auth::user()->createToken('loginToken')->accessToken;

            return response([Auth::guard('api')->user(), 'login_token' => $loginToken]);
        }
        else
        {
            return response()->json(['error' => 'Invalid login credentials'], 401);
            //return response(['error' => 'Invalid login credentials'], 401);
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
