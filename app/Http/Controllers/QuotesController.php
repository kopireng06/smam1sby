<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Quote;

class QuotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $quote = Quote::all();
        $user = User::all();

        return view('quote.index', compact('quote', 'user'));
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
            'nama_quote'=>'required',
            'jabatan_quote'=>'required',
            'isi_quote'=>'required',
        ]);
        
        //Pengumuman::create($request->all());

        $nama = $request->nama_quote;
        $jabatan = $request->jabatan_quote;
        $isi = $request->isi_quote;

        $quote = new Quote;
        $quote->nama_quote = $nama;        
        $quote->jabatan_quote = $jabatan;
        $quote->isi_quote = $isi;
        $quote->penulis_quote = \Auth::user()->id;
        $quote->save();        

        return redirect()->route('quotes.index')
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
        $quote = Quote::find($id);
        $user = User::all();

        return view('quote.show', compact('quote', 'user'));
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
            'nama_quote'=>'required',
            'jabatan_quote'=>'required',
            'isi_quote'=>'required',
        ]);

        $quote = new Quote;
        $quote->penulis_quote=\Auth::user()->id;
        Quote::find($id)->update($request->all());

        return redirect()->route('quotes.index')
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
        Quote::find($id)
            ->delete();
            
        return redirect()->route('quotes.index')
            ->with('success', 'Pengumuman Berhasil di Hapus !');
    }
}