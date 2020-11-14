<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
            'url' => ['string'],
            'description' => ['string'],
            //'user_id' => ['required'],
            'portfolio_pic_image' => ['image'],
        ]);

        //create portfolio
        if (Auth::guard('api')->check())
        {
            //rename image and store location to db
            if (Arr::exists($request, 'portfolio_pic_image') && $request->hasFile('portfolio_pic_image'))
            {
                if ($request->file('portfolio_pic_image')->isValid())
                {
                    //rename file
                    $originalFileExtension = $request->file('portfolio_pic_image')->getClientOriginalExtension();
                    $imageFileMD5 = md5_file($request->file('portfolio_pic_image'));
                    $dateTimeString = now()->day . '-' . now()->month . '-' . now()->year;
                    $newName = $imageFileMD5 . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '.' . $originalFileExtension;

                    //$file = $request->file('portfolio_pic_image')->storeAs('public/images',$newName);
                    $image_path = Storage::disk('public')->putFileAs('images', $request->file('portfolio_pic_image'), $newName);

                    $request->merge(['portfolio_pic' => $image_path]);
                }
                else
                {
                    return response()->json(['error' => 'Invalid file'], 422);
                }
            }

            $request->merge(['user_id' => Auth::guard('api')->user()->id]);
            //return response(['message' => $request->all()]);
            return Portfolio::create($request->all());
        }
        else
        {
            return response()->json(['error' => 'Invalid login credentials'], 401);
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
    public function update(Request $request)
    {
        //validation
        $request-> validate([
            'name' => ['string'],
            'url' => ['string'],
            'description' => ['string'],
            'portfolio_pic_image' => ['image'],
        ]);

        if (Auth::guard('api')->check() && Portfolio::find($request->id)->user_id == Auth::guard('api')->user()->id)
        {
            if (Arr::exists($request, 'portfolio_pic_image') && $request->hasFile('portfolio_pic_image'))
            {
                //rename image and store location to db
                if ($request->file('portfolio_pic_image')->isValid())
                {
                    //rename file
                    $originalFileExtension = $request->file('portfolio_pic_image')->getClientOriginalExtension();
                    $imageFileMD5 = md5_file($request->file('portfolio_pic_image'));
                    $dateTimeString = now()->day . '-' . now()->month . '-' . now()->year;
                    $newName = $imageFileMD5 . '-' . Auth::guard('api')->user()->id . '-' . $dateTimeString . '.' . $originalFileExtension;

                    $file = $request->file('portfolio_pic_image')->storeAs('public/images',$newName);
                    $request->merge(['portfolio_pic' => $file]);
                }
                else
                {
                    return response()->json(['error' => 'Invalid file'], 422);
                }
            }

            $request->merge(['user_id' => Auth::guard('api')->user()->id]);

            return Portfolio::find($request->id)->update($request->all());
        }
        else
        {
            return response()->json(['error' => 'Invalid login credentials'], 401);
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
        if (Auth::guard('api')->check() && Portfolio::find($id)->user_id == Auth::guard('api')->user()->id)
        {
            //return Portfolio::delete($id);
            return Portfolio::find($id)->delete();
            //return response()->json(['message' => 'deleting portfolio']);
        }
        else
        {
            return response()->json(['error' => 'Invalid login credentials'], 401);
        }
    }
}