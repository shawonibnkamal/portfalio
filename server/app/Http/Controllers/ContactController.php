<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class ContactController extends Controller
{
    public function contactPost(Request $request){

        $this->validate($request, [
                        'name' => 'required',
                        'email' => 'required|email',
                        'comment' => 'required'
                ]);

        Mail::send('email', [
                'name' => $request->name,
                'email' => $request->email,
                'comment' => $request->comment ],

                function ($message) use($request) {
                        $message->from($request->email);
                        $message->to('me@shawon.dev', 'Shawon Ibn Kamal')
                        ->subject('Portfalio Contact Form');
        });

        return response()->json(['message' => 'Email sent!']);

    }
}