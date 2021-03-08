<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Imports\AlumniImport;
use Maatwebsite\Excel\Facades\Excel;
use Carbon\Carbon;

class AlumniController extends Controller
{
    public function index()
    {
        $data_alumni = Alumni::all();
        Alumni::where('created_at', '<', Carbon::now()->subYears(7))->delete();
        return view('alumni.index',['data_alumni' => $data_alumni]);
    }

    public function importAlumni()
    {
        return view('alumni.import');
    }
    
    public function import(Request $request)
    {
        $file = $request->file('file');

        Excel::import(new AlumniImport, $file);

        return redirect("/dashboard/alumni");
    }
    
    public function edit($id_alumni)
    {
        $alumni = Alumni::find($id_alumni);
        return view('alumni.edit',['alumni' => $alumni]);
    }

    public function update(Request $request, $id_alumni)
    {
        $alumni = Alumni::find($id_alumni);
        $alumni->update($request->all());
        return redirect('/dashboard/alumni');
    }

    public function delete($id_alumni)
    {
        $alumni = Alumni::find($id_alumni);
        $alumni->delete();
        return redirect('/dashboard/alumni');
    }
    
    
}