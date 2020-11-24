<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        $to_name = 'Shawon';
        $to_email = 'shawon.1165@gmail.com';
        $data = array('name'=>'Ogbonna Vitalis(sender_name)', 'body' => 'A test mail');
        Mail::send('emails.mail', $data, function($message) use ($to_name, $to_email) {
        $message->to($to_email, $to_name)
        ->subject('Laravel Test Mail');
        $message->from('SENDER_EMAIL_ADDRESS','Test Mail');
        });
    }
}