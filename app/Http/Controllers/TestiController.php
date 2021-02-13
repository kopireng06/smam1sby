<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Testi;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\TestiImport;


class TestiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $testi = Testi::with('user')->get();
        $user = User::all();

        return view('testi.index', compact('testi', 'user'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_testi'=>'required|string',
            'isi_testi'=>'required',
            'pekerjaan_testi'=>'nullable|string',
            'jurusan_testi'=>'nullable|string',
            'fakultas_testi'=>'nullable|string',
            'universitas_testi'=>'nullable|string',
        ]);
        
        $nama = $request->nama_testi;
        $isi = $request->isi_testi;
        $pekerjaan = $request->pekerjaan_testi;
        $jurusan = $request->jurusan_testi;
        $fakultas = $request->fakultas_testi;
        $universitas = $request->universitas_testi;

        $testi = new Testi;
        $testi->nama_testi = $nama;        
        $testi->isi_testi = $isi;
        $testi->pekerjaan_testi = $pekerjaan;
        $testi->jurusan_testi = $jurusan;        
        $testi->fakultas_testi = $fakultas;
        $testi->universitas_testi = $universitas;
        $testi->penulis_testi = \Auth::user()->id;
        $testi->save();        

        return redirect()->route('testi.index')
            ->with('success', 'Testimoni Berhasil di Tambahkan !');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $testi = Testi::with('user')->find($id);
        $user = User::all();

        return view('testi.show', compact('testi', 'user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_testi'=>'required|string',
            'isi_testi'=>'required',
            'pekerjaan_testi'=>'nullable|string',
            'jurusan_testi'=>'nullable|string',
            'fakultas_testi'=>'nullable|string',
            'universitas_testi'=>'nullable|string',
        ]);

        $testi = new Testi;
        $testi->penulis_testi=\Auth::user()->id;
        Testi::find($id)->update($request->all());

        return redirect()->route('testi.index')
            ->with('success', 'Testimoni Berhasil di Update !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Testi::find($id)
            ->delete();
            
        return redirect()->route('testi.index')
            ->with('success', 'Testimoni Berhasil di Hapus !');
    }

    public function import(Request $request)
    {
        $file = $request->file('file');

        Excel::import(new TestiImport, $file);

        return redirect()->route('testi.index')
            ->with('success', 'Testimoni Berhasil di Import !');
    }
}
