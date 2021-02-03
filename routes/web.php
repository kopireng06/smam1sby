<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/dashboard', function () {
    return view('contohadmin');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
