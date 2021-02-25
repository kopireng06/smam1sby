<?php

namespace App\Http\Controllers;

use App\Models\Kategori_artikel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KategoriartikelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        // $search = request()->query('search');

        // if($search){
        //     $kategori = Kategori_artikel::where('nama_kategoriartikel', 'LIKE', "%{$search}%")->orderBy('created_at', 'DESC')->simplePaginate(5);

        // }else{            
        //     $kategori = Kategori_artikel::orderBy('created_at', 'DESC')->simplePaginate(5);

        // }

        $kat=DB::table('kategori_artikel')->whereNotNull('id_kategoriartikel')
        ->get();

        return view ('kategori_artikel.index', compact('kat'));

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
            'nama_kategoriartikel'=>'required',
        ]);

        Kategori_artikel::create($request->all());
        return redirect()->route('kategori-artikel.index')
            ->with('success', 'Kategori Artikel Berhasil di Tambahkan !');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $kategori = Kategori_artikel::find($id);
        return view('kategori_artikel.show', compact('kategori'));
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
            'nama_kategoriartikel' => 'required',
        ]);

        Kategori_artikel::find($id)->update($request->all());

        return redirect()->route('kategori-artikel.index')
            ->with('success', 'Kategori Artikel Berhasil di Update !');
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Kategori_artikel::find($id)
            ->delete();
            
        return redirect()->route('kategori-artikel.index')
            ->with('success', 'Kategori Artikel Berhasil di Hapus !');
    }
}
