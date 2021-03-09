<?php

namespace App\Http\Controllers;

use App\Models\KelKonten;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KelKontenController extends Controller
{
    public function index(Request $request)
    {
        $search = request()->query('search');

        if($search){
            $kelompok_konten = KelKonten::where('nama_kelompok_konten', 'LIKE', "%{$search}%")->simplePaginate(5);

        }else{            
            $kelompok_konten = KelKonten::simplePaginate(5);
        }

        $count = $kelompok_konten->firstItem();
        return view ('kelkonten.index',compact('kelompok_konten', 'count'));
    }

    public function createKelKonten()
    {
        return view ('kelkonten.create');
    }

    public function create(Request $request)
    {
        KelKonten::create($request->all());
        return redirect ('/dashboard/kelompok-konten')
            ->with('success', 'Kelompok Konten Berhasil Ditambahkan !');
        
    }

    public function edit($id_kelompok_konten)
    {
        $kelkonten = KelKonten::find($id_kelompok_konten);
        return view ('kelkonten.edit',['kelompok_konten'=> $kelkonten]);
    }

    public function update(Request $request, $id_kelompok_konten)
    {
        $kelkonten = KelKonten::find($id_kelompok_konten);
        $kelkonten->update($request->all());
        return redirect ('/dashboard/kelompok-konten')
        ->with('success', 'Kelompok Konten Berhasil Diubah !');
    }

    public function delete($id_kelompok_konten)
    {
        $kelkonten = KelKonten::find($id_kelompok_konten);
        $kelkonten->delete();
        return redirect ('/dashboard/kelompok-konten')
        ->with('success', 'Kelompok Konten Berhasil Dihapus !');
    }
}
