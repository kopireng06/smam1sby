<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $artikel = Artikel::with('user', 'kategori')->get();
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
            'foto_artikel'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);        
        //Kategori_artikel::create($request->all());
        
        $judul = $request->judul_artikel;
        $isi = $request->isi_artikel;
        $kat = $request->id_kategoriartikel;
        $foto = $request->file('foto_artikel');
        $nama_foto = time().'.'.$foto->extension();
        $foto->move(public_path('images\artikel'), $nama_foto);

        $artikel = new Artikel;
        $artikel->judul_artikel = $judul;        
        $artikel->isi_artikel = $isi;
        $artikel->id_kategoriartikel = $kat;
        $artikel->penulis_artikel=\Auth::user()->id;
        $artikel->foto_artikel = $nama_foto;
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
        $artikel = Artikel::with('user', 'kategori')->find($id);
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
            'foto_artikel'=>'image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);

        if($request->file('foto_artikel')==""){            

            $artikel = new Artikel;
            $artikel->penulis_artikel=\Auth::user()->id;
            Artikel::find($id)->update($request->all());

        }else{ 

            $foto = $request->file('foto_artikel');
            $nama_foto = time().'.'.$foto->extension();
            $foto->move(public_path('images/artikel'), $nama_foto);

            $artikel = Artikel::find($id);
            unlink(public_path('images/artikel').'/'.$artikel->foto_artikel);
                        
            $artikel->judul_artikel = $request->judul_artikel;        
            $artikel->isi_artikel = $request->isi_artikel;
            $artikel->id_kategoriartikel = $request->id_kategoriartikel;
            $artikel->penulis_artikel=\Auth::user()->id;
            $artikel->foto_artikel = $nama_foto;
            $artikel->save(); 
        }

        return back()->with('success', 'Artikel Berhasil di Update !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {        
        $artikel = Artikel::find($id);
        unlink(public_path('images/artikel').'/'.$artikel->foto_artikel); 
        $artikel->delete();
        
        
        return redirect()->route('artikel.index')
            ->with('success', 'Artikel Berhasil di Hapus !');
    }

    public function uploadImage(Request $request)
    {
        if ($request->hasFile('upload')) {
            $img_title = Str::random(100);
            $img = Image::make($request->upload);
            $img->resize(null, 600, function ($constraint) {
                $constraint->aspectRatio();
            })->encode('jpg', 50);
            $img->stream(); // <-- Key point
            Storage::disk('public')->put("article/" . $img_title . '.jpg', $img, 'public');
        }

        $response = [
            'uploaded' => true,
            "url" => url("") . "/storage/article/" . $img_title . ".jpg"
        ];

        return response()->json($response);
    }

    public function deleteImage(Request $request)
    {
        $url = explode('/', $request->url);
        $file = end($url);
        Storage::disk('public')->delete("article/" . $file);
        $response = [
            'deleted' => true,
            "url" => url("") . "/app/article/" . $file . ".jpg"
        ];
        return response()->json($response);
    }

}
