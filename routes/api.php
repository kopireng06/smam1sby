<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('carousel', function() {
    $carousel = DB::table('carousel')->select('foto_car','judul_car','isi_car')->get();
    return response()->json($carousel);
});

Route::get('berita/{judul}', function($judul){
    $berita = DB::table('artikel')->select('judul_artikel','isi_artikel','foto_artikel')->where('judul_artikel',$judul)->get();
    return response()->json($berita);
});

