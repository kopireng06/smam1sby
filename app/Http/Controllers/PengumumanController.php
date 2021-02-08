<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pengumuman;

class PengumumanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pengumuman = Pengumuman::all();
        $user = User::all();

        return view('pengumuman.index', compact('pengumuman', 'user'));
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
            'judul_pengumuman'=>'required',
            'isi_pengumuman'=>'required',
            'tanggal_pengumuman'=>'required',
        ]);
        
        //Pengumuman::create($request->all());

        $judul = $request->judul_pengumuman;
        $isi = $request->isi_pengumuman;
        $tanggal = $request->tanggal_pengumuman;

        $pengumuman = new Pengumuman;
        $pengumuman->judul_pengumuman = $judul;        
        $pengumuman->isi_pengumuman = $isi;
        $pengumuman->tanggal_pengumuman = $tanggal;
        $pengumuman->penulis_pengumuman = \Auth::user()->id;
        $pengumuman->save();        

        return redirect()->route('pengumuman.index')
            ->with('success', 'Pengumuman Berhasil di Tambahkan !');        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $pengumuman = Pengumuman::find($id);
        $user = User::all();

        return view('pengumuman.show', compact('pengumuman', 'user'));
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
            'judul_pengumuman'=>'required',
            'isi_pengumuman'=>'required',
            'tanggal_pengumuman'=>'required',
        ]);

        $pengumuman = new Pengumuman;
        $pengumuman->penulis_pengumuman=\Auth::user()->id;
        Pengumuman::find($id)->update($request->all());

        return redirect()->route('pengumuman.index')
            ->with('success', 'Pengumuman Berhasil di Update !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Pengumuman::find($id)
            ->delete();
            
        return redirect()->route('pengumuman.index')
            ->with('success', 'Pengumuman Berhasil di Hapus !');
    }
}
