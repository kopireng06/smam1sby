<?php

namespace App\Http\Controllers;

use App\Models\Konten;
use App\Models\KelKonten;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KontenController extends Controller
{
    public function index()
    {
        $konten = Konten::all();
        $kelkonten = KelKonten::all();

        return view("konten.index",['konten' => $konten],['kelkonten' => $kelkonten]);
    }

    public function createKonten()
    {
        $kelkonten = KelKonten::all();
        return view("konten.create",['kelkonten' => $kelkonten]);
    }

    public function create(Request $request)
    {
        Konten::create($request->all());
        return redirect('/dashboard/konten');
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
        return redirect('/dashboard/konten');
    }

    public function delete($id_konten)
    {
        $konten = Konten::find($id_konten);
        $konten->delete();
        return redirect('/dashboard/konten');
    }
}
