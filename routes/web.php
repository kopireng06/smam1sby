<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KategoriartikelController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\QuotesController;
use App\Http\Controllers\TestiController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('smam1sby');
});
Route::get('/keong', function () {
    $a = '<div class="text-white w-full bg-red-400 font-bold text-5xl">KEONG</div>';
    return json_encode($a);
});





Route::group(['middleware' => ['auth']], function(){
    Route::get('/dashboard', function () {
        return view('contohadmin');
    });

    Route::get('/alumni','App\Http\Controllers\AlumniController@index');
    Route::get('/alumni/{id_alumni}/edit','App\Http\Controllers\AlumniController@edit');
    Route::post('/alumni/{id_alumni}/update','App\Http\Controllers\AlumniController@update');
    Route::get('/alumni/{id_alumni}/delete','App\Http\Controllers\AlumniController@delete');
    Route::post('/alumni/import','App\Http\Controllers\AlumniController@import');

    Route::get('/prestasi','App\Http\Controllers\PrestasiController@index');
    Route::post('/prestasi/import','App\Http\Controllers\PrestasiController@import');
    Route::get('/prestasi/{id_prestasi}/edit','App\Http\Controllers\PrestasiController@edit');
    Route::post('/prestasi/{id_prestasi}/update','App\Http\Controllers\PrestasiController@update');
    Route::get('/prestasi/{id_prestasi}/delete','App\Http\Controllers\PrestasiController@delete');

    Route::get('/prestasi/delete-selection','App\Http\Controllers\PrestasiController@deleteSelection');

    Route::get('/konten','App\Http\Controllers\KontenController@index');
    Route::post('/konten/create','App\Http\Controllers\KontenController@create');
    Route::get('/konten/{id_konten}/edit','App\Http\Controllers\KontenController@edit');
    Route::post('/konten/{id_konten}/update','App\Http\Controllers\KontenController@update');
    Route::get('/konten/{id_konten}/delete','App\Http\Controllers\KontenController@delete');

    Route::get('/kelompok-konten','App\Http\Controllers\KelKontenController@index');
    Route::post('/kelompok-konten/create','App\Http\Controllers\KelKontenController@create');
    Route::get('/kelompok-konten/{id_kelompok_konten}/edit','App\Http\Controllers\KelKontenController@edit');
    Route::post('/kelompok-konten/{id_kelompok_konten}/update','App\Http\Controllers\KelKontenController@update');
    Route::get('/kelompok-konten/{id_kelompok_konten}/delete','App\Http\Controllers\KelKontenController@delete');

    Route::get('/web-terkait','App\Http\Controllers\WebTerkaitController@index');
    Route::post('/web-terkait/create','App\Http\Controllers\WebTerkaitController@create');
    Route::get('/web-terkait/{id_web}/edit','App\Http\Controllers\WebTerkaitController@edit');
    Route::post('/web-terkait/{id_web}/update','App\Http\Controllers\WebTerkaitController@update');
    Route::get('/web-terkait/{id_web}/delete','App\Http\Controllers\WebTerkaitController@delete');

    Route::get('/caraousel','App\Http\Controllers\CaraouselController@index');

    //Route Kategori Artikel
    Route::resource('/dashboard/kategori_artikel', KategoriartikelController::class)->except([
        'show', 'create'
    ]);

    //Route Artikel
    Route::resource('/dashboard/artikel', ArtikelController::class)->except([
        'create'
    ]);

     /* Article Image */
    
    Route::post('/dashboard/artikel/upload/image', [ArtikelController::class, 'uploadImage'])->name('artikel-upload-image');
    Route::post('/dashboard/artikel/delete/image', [ArtikelController::class, 'deleteImage'])->name('artikel-delete-image');

    //Route Pengumuman
    Route::resource('/dashboard/pengumuman', PengumumanController::class)->except([
        'create', 'edit'
    ]);
    Route::post('/dashboard/pengumuman/upload/image', [PengumumanController::class, 'uploadImage'])->name('pengumuman-upload-image');
    Route::post('/dashboard/pengumuman/delete/image', [PengumumanController::class, 'deleteImage'])->name('pengumuman-delete-image');

    //Route Quotes
    Route::resource('/dashboard/quotes', QuotesController::class)->except([
        'create', 'edit'
    ]);

    Route::post('/dashboard/quotes/upload/image', [QuotesController::class, 'uploadImage'])->name('quotes-upload-image');
    Route::post('/dashboard/quotes/delete/image', [QuotesController::class, 'deleteImage'])->name('quotes-delete-image');


    //Route Testi
    Route::resource('/dashboard/testi', TestiController::class)->except([
        'create', 'edit'
    ]);
    Route::post('/dashboard/testi/import','App\Http\Controllers\TestiController@import');

    Route::post('/dashboard/testi/upload/image', [TestiController::class, 'uploadImage'])->name('testi-upload-image');
    Route::post('/dashboard/testi/delete/image', [TestiController::class, 'deleteImage'])->name('testi-delete-image');


    
    Route::post('ckeditor/upload', 'CKEditorController@upload')->name('ckeditor.image-upload');
    
});
require __DIR__.'/auth.php';
