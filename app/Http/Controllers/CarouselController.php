<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Carousel;

class CarouselController extends Controller
{
    public function index()
    {
        $carousel = \App\Models\Carousel::all();

        return view("carousel.index",['carousel' => $carousel]);
    }

    public function store(Request $request)
    {
        $image = $request->file('foto_car');
        $imageName = time().'.'.$image->extension();
        $image->move(public_path('images'),$imageName);
        $judul = $request->judul_car;
        $isi = $request->isi_car;
        $carousel = new Carousel();
        $carousel->foto_car = '/public/images/'.$imageName;
        $carousel->judul_car = $judul;
        $carousel->isi_car = $isi;
        $carousel->save();
        return redirect("/carousel");
    }
}