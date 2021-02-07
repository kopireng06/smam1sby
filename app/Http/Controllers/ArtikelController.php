<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kategori_artikel;
use App\Models\User;
use App\Models\Artikel;

class ArtikelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$artikel = Artikel::paginate(10);
        $artikel = Artikel::all();
        $user = User::all();
        $kategori = Kategori_artikel::all();

        return view('artikel.index', compact('artikel', 'user', 'kategori'));
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
            'judul_artikel'=>'required',
            'isi_artikel'=>'required',
            'id_kategoriartikel'=>'required',
        ]);        
        //Kategori_artikel::create($request->all());
        
        $judul = $request->judul_artikel;
        $isi = $request->isi_artikel;
        $kat = $request->id_kategoriartikel;

        $artikel = new Artikel;
        $artikel->judul_artikel = $judul;        
        $artikel->isi_artikel = $isi;
        $artikel->id_kategoriartikel = $kat;
        $artikel->penulis_artikel=\Auth::user()->id;
        $artikel->save();


        return redirect()->route('artikel.index')
            ->with('success', 'Artikel Berhasil di Tambahkan !');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //$artikel = Artikel::with('user')->where('title', $property->title)->get();
        $artikel = Artikel::find($id);
        $user = User::all();
        $kategori = Kategori_artikel::all();

        return view('artikel.show', compact('artikel', 'user', 'kategori'));        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $artikel = Artikel::find($id);
        $user = User::all();
        $kategori = Kategori_artikel::all();

        return view('artikel.edit', compact('artikel', 'user', 'kategori'));
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
            'judul_artikel'=>'required',
            'isi_artikel'=>'required',
            'id_kategoriartikel'=>'required',
        ]);        
        //Kategori_artikel::create($request->all());

        $artikel = new Artikel;
        $artikel->penulis_artikel=\Auth::user()->id;
        Artikel::find($id)->update($request->all());


        return redirect()->route('artikel.index')
            ->with('success', 'Artikel Berhasil di Update !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Artikel::find($id)
            ->delete();
            
        return redirect()->route('artikel.index')
            ->with('success', 'Artikel Berhasil di Hapus !');
    }
}
