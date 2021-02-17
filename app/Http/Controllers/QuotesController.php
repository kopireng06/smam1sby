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
        $search = request()->query('search');

        if($search){
            $quote = Quote::where('nama_quote', 'LIKE', "%{$search}%")->with('user')->simplePaginate(5);

        }else{            
            $quote = Quote::with('user')->simplePaginate(5);

        }

        $count = $quote->firstItem();

        return view('quote.index', compact('quote', 'count'));
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
            'foto_quote'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);
        
        //Pengumuman::create($request->all());

        $nama = $request->nama_quote;
        $jabatan = $request->jabatan_quote;
        $isi = $request->isi_quote;
        $foto = $request->file('foto_quote');
        $nama_foto = time().'.'.$foto->extension();
        $foto->move(public_path('images/quotes'), $nama_foto);

        $quote = new Quote;
        $quote->nama_quote = $nama;        
        $quote->jabatan_quote = $jabatan;
        $quote->isi_quote = $isi;
        $quote->penulis_quote = \Auth::user()->id;
        $quote->foto_quote = $nama_foto;
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
        $quote = Quote::with('user')->find($id);
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
            'foto_quote'=>'image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);

        if($request->file('foto_quote')==""){

            $quote = new Quote;
            $quote->penulis_quote=\Auth::user()->id;
            Quote::find($id)->update($request->all());

        }else{

            $foto = $request->file('foto_quote');
            $nama_foto = time().'.'.$foto->extension();
            $foto->move(public_path('images/quotes'), $nama_foto);

            $quote = Quote::find($id);
            unlink(public_path('images/quotes').'/'.$quote->foto_quote); //Delete this syntax if you'd like to keep the image file of $this quote
            
            $quote->nama_quote = $request->nama_quote;        
            $quote->jabatan_quote = $request->jabatan_quote;
            $quote->isi_quote = $request->isi_quote;
            $quote->penulis_quote=\Auth::user()->id;
            $quote->foto_quote = $nama_foto;
            $quote->save(); 

        }        

        return back()->with('success', 'Pengumuman Berhasil di Update !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $quote = Quote::find($id);
        unlink(public_path('images/quotes').'/'.$quote->foto_quote);
        $quote->delete();
            
        return redirect()->route('quotes.index')
            ->with('success', 'Pengumuman Berhasil di Hapus !');
    }
}
