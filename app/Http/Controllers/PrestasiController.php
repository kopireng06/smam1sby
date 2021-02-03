<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Imports\PrestasiImport;
use Maatwebsite\Excel\Facades\Excel;

class PrestasiController extends Controller
{
    public function index()
    {
        $prestasi = \App\Models\Prestasi::all();
        return view('prestasi.index',['prestasi' => $prestasi]);
    }

    public function import(Request $request)
    {
        $file = $request->file('file');

        Excel::import(new PrestasiImport, $file);

        return redirect("/prestasi");
    }

    public function edit($id_prestasi)
    {
        $prestasi = \App\Models\Prestasi::find($id_prestasi);
        return view('prestasi.edit',['prestasi' => $prestasi]);
    }

    public function update(Request $request, $id_prestasi)
    {
        $prestasi = \App\Models\Prestasi::find($id_prestasi);
        $prestasi->update($request->all());
        return redirect("/prestasi");
    }

    public function delete($id_prestasi)
    {
        $prestasi = \App\Models\Prestasi::find($id_prestasi);
        $prestasi->delete();
        return redirect("/prestasi");
    }

    public function deleteSelection(Request $request)
    {
    
        $id = $request->id;
        
            \App\Models\Prestasi::where("id_prestasi", $id)->delete();
        
        return redirect("/prestasi");
    }
}
