<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KelKontenController extends Controller
{
    public function index()
    {
        $kelkonten = \App\Models\KelKonten::all();
        return view ('kelkonten.index',['kelompok_konten'=> $kelkonten]);
    }

    public function create(Request $request)
    {
        \App\Models\KelKonten::create($request->all());
        return redirect ('/kelompok-konten');
    }

    public function edit($id_kelompok_konten)
    {
        $kelkonten = \App\Models\KelKonten::find($id_kelompok_konten);
        return view ('kelkonten.edit',['kelompok_konten'=> $kelkonten]);
    }

    public function update(Request $request, $id_kelompok_konten)
    {
        $kelkonten = \App\Models\KelKonten::find($id_kelompok_konten);
        $kelkonten->update($request->all());
        return redirect ('/kelompok-konten');
    }

    public function delete($id_kelompok_konten)
    {
        $kelkonten = \App\Models\KelKonten::find($id_kelompok_konten);
        $kelkonten->delete();
        return redirect ('/kelompok-konten');
    }
}
