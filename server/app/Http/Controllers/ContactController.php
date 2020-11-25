<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        Mail::send('emails.welcome', $data, function ($message) {
            $message->from('us@example.com', 'Laravel');
        
            $message->to('foo@example.com')->cc('bar@example.com');
        });
    }
}