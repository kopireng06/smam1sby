<?php

namespace App\Http\Controllers;

use App\Models\Konten;
use App\Models\KelKonten;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KontenController extends Controller
{
    public function index(Request $request)
    {
        $search = request()->query('search');

        if($search){
            $konten = Konten::where('judul_konten', 'LIKE', "%{$search}%")->with('kelompok_konten')->orderBy('created_at', 'DESC')->simplePaginate(5);

        }else{            
            $konten = Konten::with('kelompok_konten')->orderBy('created_at', 'DESC')->simplePaginate(5);

        }

        $count = $konten->firstItem();

        $kelkonten = KelKonten::all();

        return view("konten.index",compact('konten','count','kelkonten'));
    }

    public function createKonten()
    {
        $kelkonten = KelKonten::all();
        return view("konten.create",['kelkonten' => $kelkonten]);
    }

    public function create(Request $request)
    {
        Konten::create($request->all());

        return redirect('/dashboard/konten')
            ->with('success', 'Konten Berhasil Ditambahkan !');        
    }

    public function edit($id_konten)
    {
        $konten = Konten::find($id_konten);
        $kelkonten = KelKonten::all();
        return view('konten.edit',['konten' => $konten],['kelkonten' => $kelkonten]);
    }

    public function update(Request $request, $id_konten)
    {
        $konten = Konten::find($id_konten);
        $konten->update($request->all());
        return redirect('/dashboard/konten')
            ->with('success', 'Konten Berhasil Diubah !');
    }

    public function delete($id_konten)
    {
        $konten = Konten::find($id_konten);
        $konten->delete();
        return redirect('/dashboard/konten')
            ->with('success', 'Konten Berhasil Dihapus !');
    }
}
