<?php

namespace App\Http\Controllers;

use App\Models\Prestasi;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Imports\PrestasiImport;
use Maatwebsite\Excel\Facades\Excel;
use Carbon\Carbon;

class PrestasiController extends Controller
{
    public function index(Request $request)
    {   
        $search = request()->query('search');

        if($search){
            $prestasi = Prestasi::where('nama_prestasi', 'LIKE', "%{$search}%")->orWhere('tingkat_prestasi', 'LIKE', "%{$search}%")->orderBy('created_at', 'DESC')->simplePaginate(10);

        }else{            
            $prestasi = Prestasi::orderBy('created_at', 'DESC')->simplePaginate(10);

        }

        $count = $prestasi->firstItem();
        Prestasi::where('created_at', '<', Carbon::now()->subYears(7))->delete();

        return view('prestasi.index',compact('prestasi', 'count'));
    }

    public function importPrestasi()
    {
        return view('prestasi.import');
    }
    
    public function import(Request $request)
    {
        $file = $request->file('file');

        Excel::import(new PrestasiImport, $file);

        return redirect("/dashboard/prestasi")
            ->with('success', 'Prestasi Berhasil Diimport !');
        
    }

    public function edit($id_prestasi)
    {
        $prestasi = Prestasi::find($id_prestasi);
        return view('prestasi.edit',['prestasi' => $prestasi]);
    }

    public function update(Request $request, $id_prestasi)
    {
        $prestasi = Prestasi::find($id_prestasi);
        $prestasi->update($request->all());

        return redirect("/dashboard/prestasi")
            ->with('success', 'Prestasi Berhasil Diubah !');
    }

    public function delete($id_prestasi)
    {
        $prestasi = Prestasi::find($id_prestasi);
        $prestasi->delete();
        return redirect("/dashboard/prestasi")
        ->with('success', 'Prestasi Berhasil Dihapus !');
    }

    public function deleteSelection(Request $request)
    {
    
        $id = $request->id;
        
            Prestasi::where("id_prestasi", $id)->delete();
        
        return redirect("/dashboard/prestasi");
    }

    public function deleteChecked(Request $request)
    {
        $ids = $request->ids;
        Prestasi::where("id_prestasi", $ids)->delete();
        return response()->json(['success'=>"Prestasi dihapus"]);
    }
}
