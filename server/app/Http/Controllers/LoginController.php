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
            return response(['message' => 'Invalid login credentials']);
        }

        $user = User::where('email', $request->email)->first();

        $loginToken = $user->createToken('loginToken')->accessToken;

        return response([Auth::user(), 'login_token' => $loginToken]);
    }
}
