<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumniController;
use App\Http\Controllers\PrestasiController;
use App\Http\Controllers\KontenController;
use App\Http\Controllers\KelKontenController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\WebTerkaitController;

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


Route::get('/keong', function () {
    $a = '<div class="text-white w-full bg-red-400 font-bold text-5xl">KEONG</div>';
    return json_encode($a);
});



Route::get('/test/regex/{namafasil}',[AlumniController::class,'regex']);

Route::group(['middleware' => ['auth']], function(){
    Route::get('/dashboard', function () {
        return redirect('/dashboard/alumni');
    });



    Route::get('/dashboard/alumni',[AlumniController::class,'index']);
    Route::get('/dashboard/alumni/import-alumni',[AlumniController::class,'importAlumni']);
    Route::post('/dashboard/alumni/import',[AlumniController::class,'import']);
    Route::get('/dashboard/alumni/{id_alumni}/edit',[AlumniController::class,'edit']);
    Route::post('/dashboard/alumni/{id_alumni}/update',[AlumniController::class,'update']);
    Route::get('/dashboard/alumni/{id_alumni}/delete',[AlumniController::class,'delete']);

    Route::get('/dashboard/prestasi',[PrestasiController::class,'index']);
    Route::get('/dashboard/prestasi/import-prestasi',[PrestasiController::class,'importPrestasi']);
    Route::post('/dashboard/prestasi/import',[PrestasiController::class,'import']);
    Route::get('/dashboard/prestasi/{id_prestasi}/edit',[PrestasiController::class,'edit']);
    Route::post('/dashboard/prestasi/{id_prestasi}/update',[PrestasiController::class,'update']);
    Route::get('/dashboard/prestasi/{id_prestasi}/delete',[PrestasiController::class,'delete']);

    Route::get('/dashboard/prestasi/delete-selection','App\Http\Controllers\PrestasiController@deleteSelection');

    Route::get('/dashboard/konten',[KontenController::class,'index']);
    Route::get('/dashboard/konten/create-konten',[KontenController::class,'createKonten']);
    Route::post('/dashboard/konten/create',[KontenController::class,'create']);
    Route::get('/dashboard/konten/{id_konten}/edit',[KontenController::class,'edit']);
    Route::post('/dashboard/konten/{id_konten}/update',[KontenController::class,'update']);
    Route::get('/dashboard/konten/{id_konten}/delete',[KontenController::class,'delete']);

    Route::get('/dashboard/kelompok-konten',[KelKontenController::class,'index']);
    Route::get('/dashboard/kelompok-konten/create-kelompok-konten',[KelKontenController::class,'createKelKonten']);
    Route::post('/dashboard/kelompok-konten/create',[KelKontenController::class,'create']);
    Route::get('/dashboard/kelompok-konten/{id_kelompok_konten}/edit',[KelKontenController::class,'edit']);
    Route::post('/dashboard/kelompok-konten/{id_kelompok_konten}/update',[KelKontenController::class,'update']);
    Route::get('/dashboard/kelompok-konten/{id_kelompok_konten}/delete',[KelKontenController::class,'delete']);

    Route::get('/dashboard/web-terkait',[WebTerkaitController::class,'index']);
    Route::get('/dashboard/web-terkait/create-web-terkait',[WebTerkaitController::class,'createWebTerkait']);
    Route::post('/dashboard/web-terkait/create',[WebTerkaitController::class,'create']);
    Route::get('/dashboard/web-terkait/{id_web}/edit',[WebTerkaitController::class,'edit']);
    Route::post('/dashboard/web-terkait/{id_web}/update',[WebTerkaitController::class,'update']);
    Route::get('/dashboard/web-terkait/{id_web}/delete',[WebTerkaitController::class,'delete']);

    Route::get('/dashboard/carousel',[CarouselController::class,'index']);
    Route::get('/dashboard/carousel/create-carousel',[CarouselController::class,'createCarousel']);
    Route::post('/dashboard/carousel/create',[CarouselController::class,'store'])->name("carousel.store");
    Route::get('/dashboard/carousel/{id_car}/edit',[CarouselController::class,'edit']);
    Route::post('/dashboard/carousel/{id_car}/update',[CarouselController::class,'update'])->name("carousel.update");
    Route::get('/dashboard/carousel/{id_car}/delete',[CarouselController::class,'delete']);

    //Route Kategori Artikel
    Route::resource('/dashboard/kategori-artikel', KategoriartikelController::class);

    //Route Artikel
    Route::resource('/dashboard/artikel', ArtikelController::class)->except([
        'edit'
    ]);

     /* Article Image */
    
    Route::post('/dashboard/artikel/upload/image', [ArtikelController::class, 'uploadImage'])->name('artikel-upload-image');
    Route::post('/dashboard/artikel/delete/image', [ArtikelController::class, 'deleteImage'])->name('artikel-delete-image');

    //Route Pengumuman
    Route::resource('/dashboard/pengumuman', PengumumanController::class)->except([
        'edit'
    ]);
    Route::post('/dashboard/pengumuman/upload/image', [PengumumanController::class, 'uploadImage'])->name('pengumuman-upload-image');
    Route::post('/dashboard/pengumuman/delete/image', [PengumumanController::class, 'deleteImage'])->name('pengumuman-delete-image');

    //Route Quotes
    Route::resource('/dashboard/quotes', QuotesController::class)->except([
        'create', 'edit'
    ]);
    Route::post('/dashboard/quotes/upload/image', [QuotesController::class, 'uploadImage'])->name('quotes-upload-image');
    Route::post('/dashboard/quotes/delete/image', [QuotesController::class, 'deleteImage'])->name('quotes-delete-image');


    //Route Testimoni
    Route::resource('/dashboard/testimoni', TestiController::class)->except([
        'edit'
    ]);
    Route::post('/dashboard/testimoni/import','App\Http\Controllers\TestiController@import');

    Route::post('/dashboard/testi/upload/image', [TestiController::class, 'uploadImage'])->name('testi-upload-image');
    Route::post('/dashboard/testi/delete/image', [TestiController::class, 'deleteImage'])->name('testi-delete-image');


    
    Route::post('ckeditor/upload', 'CKEditorController@upload')->name('ckeditor.image-upload');
    
    Route::delete('/selectd-students','App\Http\Controllers\PrestasiController@deleteChecked')->name('prestasi.deleteSelected');
});


require __DIR__.'/auth.php';

Route::get( '/{path?}', function(){
    return view('smam1sby');
})->where('path', '.*');