<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KontenController extends Controller
{
    public function index()
    {
        $konten = \App\Models\Konten::all();

        return view("konten.index",['konten' => $konten]);
    }

    public function create(Request $request)
    {
        \App\Models\Konten::create($request->all());
        return redirect('/konten');
    }

    public function edit($id_konten)
    {
        $konten = \App\Models\Konten::find($id_konten);
        return view('konten.edit',['konten' => $konten]);
    }

    public function update(Request $request, $id_konten)
    {
        $konten = \App\Models\Konten::find($id_konten);
        $konten->update($request->all());
        return redirect('/konten');
    }

    public function delete($id_konten)
    {
        $konten = \App\Models\Konten::find($id_konten);
        $konten->delete();
        return redirect('/konten');
    }
}
