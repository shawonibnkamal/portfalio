<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use App\Models\Portfolio;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Portfolio::all();
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
            'name' => ['string', 'required'],
            'url' => ['string', 'required'],
            //'user_id' => ['required'],
            'logo_image' => ['mimes:jpeg,png'],
        ]);

        //create portfolio
        if (Auth::guard('api')->check())
        {
            //rename image and store location to db
            if (Arr::exists($request, 'logo_image') && $request->hasFile('logo_image'))
            {
                if ($request->file('logo_image')->isValid())
                {
                    //rename file
                    $originalFileExtension = $request->file('logo_image')->getClientOriginalExtension();
                    $imageFileMD5 = md5_file($request->file('logo_image'));
                    $dateTimeString = now()->day . '-' . now()->month . '-' . now()->year;
                    //$newName = Auth::guard('api')->user()->id . '-' . $dateTimeString . '-' . $imageFileMD5 . '.' . $originalFileExtension;
                    $newName = $imageFileMD5 . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '.' . $originalFileExtension;

                    $file = $request->file('logo_image')->storeAs('images',$newName);
                    $request->merge(['logo' => $file]);
                }
                else
                {
                    return response(['message' => 'Invalid file']);
                }
            }
            
            $request->merge(['user_id' => Auth::guard('api')->user()->id]);
            //return response(['message' => $request->all()]);
            return Portfolio::create($request->all());
        }
        else
        {
            return response(['message' => 'Invalid login credentials']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Portfolio::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //validation
        $request-> validate([
            'name' => ['string'],
            'url' => ['string'],
            'logo_image' => ['mimes:jpeg,png'],
        ]);

        if (Auth::guard('api')->check() && Portfolio::find($id)->user_id == Auth::guard('api')->user()->id)
        {
            if (Arr::exists($request, 'logo_image') && $request->hasFile('logo_image'))
            {
                //rename image and store location to db
                if ($request->file('logo_image')->isValid())
                {
                    //rename file
                    $originalFileExtension = $request->file('logo_image')->getClientOriginalExtension();
                    $imageFileMD5 = md5_file($request->file('logo_image'));
                    $dateTimeString = now()->day . '-' . now()->month . '-' . now()->year;
                    $newName = $imageFileMD5 . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '.' . $originalFileExtension;

                    $file = $request->file('logo_image')->storeAs('images',$newName);
                    $request->merge(['logo' => $file]);
                }
                else
                {
                    return response(['message' => 'Invalid file']);
                }
            }
            
            $request->merge(['user_id' => Auth::guard('api')->user()->id]);

            return Portfolio::find($id)->update($request->all());
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
    public function destroy($id)
    {
        if (Auth::guard('api')->check())
        {
            return Portfolio::delete($id);
        }
        else
        {
            return response(['message' => 'Invalid login credentials']);
        }
    }
}
