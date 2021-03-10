<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Imports\AlumniImport;
use Maatwebsite\Excel\Facades\Excel;
use Carbon\Carbon;
use DB;

class AlumniController extends Controller
{
    public function index(Request $request)
    {
        $search = request()->query('search');

        if($search){
            $data_alumni = Alumni::where('nama_alumni', 'LIKE', "%{$search}%")->orderBy('created_at', 'DESC')->simplePaginate(10);

        }else{            
            $data_alumni = Alumni::orderBy('created_at', 'DESC')->simplePaginate(10);

        }
        
        $count = $data_alumni->firstItem();

        Alumni::where('created_at', '<', Carbon::now()->subYears(7))->delete();
        return view('alumni.index',compact('data_alumni', 'count'));
    }

    public function importAlumni()
    {
        return view('alumni.import');
    }
    
    public function import(Request $request)
    {
        $file = $request->file('file');

        Excel::import(new AlumniImport, $file);

        return redirect("/dashboard/alumni")
            ->with('success', 'Alumni Berhasil Diimport !');
        
    }
    
    public function edit($id_alumni)
    {
        $alumni = Alumni::find($id_alumni);
        return view('alumni.edit',compact('alumni'));
    }

    public function update(Request $request, $id_alumni)
    {
        $alumni = Alumni::find($id_alumni);
        $alumni->update($request->all());
        return redirect("/dashboard/alumni")
            ->with('success', 'Alumni Berhasil Diubah !');
    }

    public function delete($id_alumni)
    {
        $alumni = Alumni::find($id_alumni);
        $alumni->delete();
        return redirect('/dashboard/alumni')
            ->with('success', 'Alumni Berhasil Dihapus !');
    }
    
    public function regex(Request $request)
    {
        $namafasil = $request->namafasil;
        $data = DB::table('konten')->select('judul_konten','isi_konten')->where('kelompok_konten','fasilitas')->where('judul_konten',$namafasil)->first();
        if(preg_match_all('/img src="[^"]*/', $data->isi_konten, $matches)) {
            foreach ($matches as $key => $value) {
                $matches[$key]=str_replace('img src="http://127.0.0.1:8000/',"",$matches[$key]);
            }
            dd($matches);
        }
        dd($data->isi_konten);
    }
    
}