<?php

namespace App\Http\Controllers;

use App\Models\Konten;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KontenController extends Controller
{
    public function index(Request $request)
    {
        $search = request()->query('search');

        if($search){
            $konten = Konten::where('judul_konten', 'LIKE', "%{$search}%")->orderBy('kelompok_konten', 'ASC')->orderBy('created_at', 'DESC')->simplePaginate(5);

        }else{            
            $konten = Konten::orderBy('kelompok_konten', 'ASC')->orderBy('created_at', 'DESC')->simplePaginate(5);

        }

        $count = $konten->firstItem();

        return view("konten.index",compact('konten','count'));
    }

    public function createKonten()
    {
        return view("konten.create");
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
        return view('konten.edit',['konten' => $konten]);
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
