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

Route::get('alumni', function() {
    $alumni = DB::table('alumni')->select('nama_alumni','univ_alumni','jurusan_alumni')->get();
    return response()->json($alumni);
});

Route::get('prestasi', function() {
    $prestasi = DB::table('prestasi')->select('nama_prestasi','juara_prestasi','tingkat_prestasi')->get();
    return response()->json($prestasi);
});

Route::get('web', function() {
    $web = DB::table('web_terkait')->select('nama_web','link_web')->get();
    return response()->json($web);
});

Route::get('carousel', function() {
    $carousel = DB::table('carousel')->select('foto_car','judul_car','isi_car')->get();
    return response()->json($carousel);
});

Route::get('berita/{judul}', function($judul){
    $berita = DB::table('artikel')->select('judul_artikel','isi_artikel','foto_artikel')->where('judul_artikel',$judul)->get();
    return response()->json($berita);
});

Route::get('{kelompok}/{judul}', function($judul){
    $konten = DB::table('konten')->select('judul_konten','kelompok_konten','isi_konten')->where('judul_konten',$judul)->get();
    return response()->json($konten);
});