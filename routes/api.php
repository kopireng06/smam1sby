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

Route::get('pengumuman/home', function() {
    $pengumumanH = DB::table('pengumumen')->select('judul_pengumuman','tanggal_pengumuman')->orderBy('created_at', 'desc')->limit(4)->get();
    return response()->json($pengumumanH);
});

Route::get('berita/home', function() {
    $beritaH = DB::table('artikel')->select('judul_artikel','foto_artikel','id_kategoriartikel','created_at','isi_artikel')->orderBy('created_at', 'desc')->limit(2)->get();
    return response()->json($beritaH);
});

Route::get('testimoni', function() {
    $testi = DB::table('testimoni')->select('foto_testi','nama_testi','isi_testi','jurusan_testi','universitas_testi')->get();
    return response()->json($testi);
});

Route::get('prestasi', function() {
    $prestasi = DB::table('prestasi')->select('nama_prestasi','juara_prestasi','tingkat_prestasi')->orderBy('created_at', 'desc')->limit(4)->get();
    return response()->json($prestasi);
});

Route::get('profil/{judul}', function($judul) {
    $progilJ = DB::table('konten')->select('judul_konten','isi_konten')->where('kelompok_konten','profil')->where('judul_konten',$judul)->get();
    return response()->json($progilJ);
});

Route::get('alumni/{tahun}', function($tahun) {
    $alumniT = DB::table('alumni')->select('nama_alumni','univ_alumni','jurusan_alumni')->where('angkatan',$tahun)->get();
    return response()->json($alumniT);
});

Route::get('ekstrakurikuler/{namaekstra}', function($namaekstra) {
    $ekskulN = DB::table('konten')->select('judul_konten','isi_konten')->where('kelompok_konten','Ekstrakurikuler')->where('judul_konten',$namaekstra)->get();
    return response()->json($ekskulN);
});

Route::get('fasilitas/{namafasil}', function($namafasil) {
    $fasilitasN = DB::table('konten')->select('judul_konten','isi_konten')->where('kelompok_konten','Fasilitas')->where('judul_konten',$namafasil)->get();
    return response()->json($fasilitasN);
});

Route::get('pengumuman/{judul}', function($judul) {
    $pengumumanJ = DB::table('pengumumen')->select('judul_pengumuman','isi_pengumuman')->where('judul_pengumuman',$judul)->get();
    return response()->json($pengumumanJ);
});

Route::get('list-alumni', function() {
    $lAlumni = DB::table('alumni')->select('angkatan')->get();
    return response()->json($lAlumni);
});

Route::get('list-fasilitas', function() {
    $lFasil = DB::table('konten')->select('judul_konten')->where('kelompok_konten','Fasilitas')->get();
    return response()->json($lFasil);
});

Route::get('list-ekstrakurikuler', function() {
    $lEkstrakurikuler = DB::table('konten')->select('judul_konten')->where('kelompok_konten','Ekstrakurikuler')->get();
    return response()->json($lEkstrakurikuler);
});

Route::get('berita/search/{param}', function($param) {
    $beritaS = DB::table('artikel')->select('judul_artikel','isi_artikel','foto_artikel')->where('judul_artikel','like',"%{$param}%")->get();
    return response()->json($beritaS);
});

Route::get('carousel', function() {
    $carousel = DB::table('carousel')->select('foto_car','judul_car','isi_car')->get();
    return response()->json($carousel);
});

Route::get('berita/{judul}', function($judul){
    $berita = DB::table('artikel')->select('judul_artikel','isi_artikel','foto_artikel')->where('judul_artikel',$judul)->get();
    return response()->json($berita);
});

Route::get('program-unggulan', function(){
    $email = DB::table('konten')->select('judul_konten','isi_konten')->where('kelompok_konten','Program Unggulan')->get();
    return response()->json($email);
});

Route::get('prestasi/{offset}/{limit}', function($offset,$limit){
    $prestasi = DB::table('prestasi')->select('nama_prestasi','juara_prestasi','tingkat_prestasi','id_prestasi')->orderBy('id_prestasi', 'desc')->offset($offset)->limit($limit)->get();
    return response()->json($prestasi);
});

Route::get('berita/{offset}/{limit}', function($offset,$limit){
    $berita = DB::table('artikel')->select('judul_artikel','foto_artikel','created_at')->orderBy('created_at','desc')->offset($offset)->limit($limit)->get();
    return response()->json($berita);
});

Route::get('menu',function(){
    $menu = array();

    $menu['fasilitas'] = DB::table('konten')->select('judul_konten')->orderBy('created_at', 'desc')->where('kelompok_konten','Fasilitas')->limit(1)->get();
    $menu['ekskul'] = DB::table('konten')->select('judul_konten')->orderBy('created_at', 'desc')->where('kelompok_konten','Ekstrakurikuler')->limit(1)->get();
    $menu['alumni'] = DB::table('alumni')->select('angkatan')->orderBy('angkatan', 'desc')->limit(1)->get();
    $menu['profil'] = DB::table('konten')->select('judul_konten')->where('kelompok_konten','Profil')->get();
    $menu['web-terkait'] = DB::table('web_terkait')->select('nama_web','link_web')->get();

    return response()->json($menu);
});

Route::get('footer',function(){
    $footer = array();

    $footer['profil-footer'] = DB::table('konten')->select('isi_konten')->where('kelompok_konten','Profil Footer')->limit(1)->get();
    $footer['email'] = DB::table('konten')->select('isi_konten')->where('kelompok_konten','Email')->limit(1)->get();
    $footer['lokasi'] = DB::table('konten')->select('isi_konten')->where('kelompok_konten','Lokasi')->limit(1)->get();
    $footer['whatsapp'] = DB::table('konten')->select('isi_konten')->where('kelompok_konten','WhatsApp')->limit(1)->get();
    $footer['youtube'] = DB::table('konten')->select('isi_konten')->where('kelompok_konten','Youtube')->limit(1)->get();

    return response()->json($footer);
});

