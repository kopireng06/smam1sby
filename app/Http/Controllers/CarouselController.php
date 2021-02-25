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
        $image->move(public_path('images/carousel'),$imageName);

        $judul = $request->judul_car;
        $isi = $request->isi_car;
        $carousel = new Carousel();
        $carousel->foto_car = $imageName;
        $carousel->judul_car = $judul;
        $carousel->isi_car = $isi;
        $carousel->save();
        return redirect("/carousel");
    }

    public function edit($id_car)
    {
        $carousel = \App\Models\Carousel::find($id_car);
        return view('carousel.edit',compact('carousel'));
    }

    public function update(Request $request)
    {

        if($request->file('foto_car')==""){ 
            $judul = $request->judul_car;
            $isi = $request->isi_car;
            $carousel = \App\Models\Carousel::find($request->id_car);
            $carousel->judul_car = $judul;
            $carousel->isi_car = $isi;
            $carousel->save();
        }else{
            $image = $request->file('foto_car');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('images/carousel'),$imageName);

            $judul = $request->judul_car;
            $isi = $request->isi_car;
            $carousel = new Carousel();
            $carousel = \App\Models\Carousel::find($request->id_car);
            unlink(public_path('images/carousel/').$carousel->foto_car);
            
            $carousel->foto_car = $imageName;
            $carousel->judul_car = $judul;
            $carousel->isi_car = $isi;
            $carousel->save();
        }
        return redirect('/carousel');
    }

    public function delete($id_car)
    {
        $carousel = \App\Models\Carousel::find($id_car);
        $carousel->delete();
        return redirect('/carousel');
    }
}
