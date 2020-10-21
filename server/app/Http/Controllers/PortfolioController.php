<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'name' => 'required',
            'url' => 'required',
            'user_id' => 'required',
        ]);

        //create portfolio
        if (Auth::check())
        {
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
        if (Auth::check())
        {
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
        if (Auth::check())
        {
            return Portfolio::destroy($id);
        }
        else
        {
            return response(['message' => 'Invalid login credentials']);
        }
    }
}
