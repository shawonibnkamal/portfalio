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
        $logininfo = $request->validate([
            'userID' => ['string','required'],
            'password' => ['string','required'],
        ]);


        if (filter_var($request->userID, FILTER_VALIDATE_EMAIL))
        {
            if (Auth::attempt(['email' => $request->userID, 'password' => $request->password]))
            {
                $loginToken = Auth::user()->createToken('loginToken')->accessToken;

                return response(['user_info' => User::where('email', $request->userID)->get(), 'login_token' => $loginToken]);
            }
            else
            {
                return response()->json(['error' => 'Invalid login credentials'], 401);
            }
        }
        else
        {
            if (Auth::attempt(['username' => $request->userID, 'password' => $request->password]))
            {
                $loginToken = Auth::user()->createToken('loginToken')->accessToken;

                return response(['login_token' => $loginToken]);
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

    public function loggedInUser(Request $request)
    {
        if (Auth::guard('api')->check()) {
            return response()->json( ["user_info" => Auth::guard('api')->user()] );
        }
        else
        {
            return response()->json(['error' => 'Invalid login credentials'], 401);
        }
    }
}