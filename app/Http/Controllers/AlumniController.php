<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Imports\AlumniImport;
use Maatwebsite\Excel\Facades\Excel;

class AlumniController extends Controller
{
    public function index()
    {
        $data_alumni = \App\Models\Alumni::all();
        return view('alumni.index',['data_alumni' => $data_alumni]);
    }

    public function import(Request $request)
    {
        $file = $request->file('file');

        Excel::import(new AlumniImport, $file);

        return redirect("/alumni");
    }
    
    public function edit($id_alumni)
    {
        $alumni = \App\Models\Alumni::find($id_alumni);
        return view('alumni.edit',['alumni' => $alumni]);
    }

    public function update(Request $request, $id_alumni)
    {
        $alumni = \App\Models\Alumni::find($id_alumni);
        $alumni->update($request->all());
        return redirect('/alumni');
    }

    public function delete($id_alumni)
    {
        $alumni = \App\Models\Alumni::find($id_alumni);
        $alumni->delete();
        return redirect('/alumni');
    }
    
    
}