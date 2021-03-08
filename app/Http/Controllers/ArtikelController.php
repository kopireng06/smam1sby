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
use Carbon\Carbon;

class ArtikelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = request()->query('search');

        if($search){

            $artikel= Artikel::where('judul_artikel', 'LIKE', "%{$search}%")->with('user', 'kategori')->orderBy('created_at', 'DESC')->simplePaginate(5);
            
        }else{

            $artikel = Artikel::with('user', 'kategori')->orderBy('created_at', 'DESC')->simplePaginate(5);

        }
        
        $kategori = Kategori_artikel::all();
        $count = $artikel->firstItem();

        Artikel::where('created_at', '<', Carbon::now()->subYears(2))->delete(); //Auto delete untuk durasi 2 tahun

        return view('artikel.index', compact('artikel', 'count', 'kategori'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $kategori = Kategori_artikel::all();
        return view('artikel.create', compact('kategori'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate(
            $request, 
            [   
                'judul_artikel'     =>'required',
                'isi_artikel'       =>'required',
                'id_kategoriartikel'=>'required',
                'foto_artikel'      =>'required|image|mimes:jpg,png,jpeg,gif,svg|max:4500',
            ],
            [   
                'judul_artikel.required'     => 'Harap isi judul artikel !.',
                'isi_artikel.required'       => 'Harap isi artikel di tulis !',
                'id_kategoriartikel.required'=> 'Harap isi kategori artikel !',
                'foto_artikel.required'      => 'Harap sertakan foto cover untuk artikel !',
                'foto_artikel.image'         => 'Format foto yang diperbolehkan adalah JPG, JPEG, PNG.',
                'foto_artikel.mimes'         => 'Ukuran foto terlalu besar, max : 4,5 MB !',
            ]
        );

        $request->validate([
            
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

            $artikel = Artikel::find($id);                       
            $artikel->judul_artikel = $request->judul_artikel;        
            $artikel->isi_artikel = $request->isi_artikel;
            $artikel->id_kategoriartikel = $request->id_kategoriartikel;
            $artikel->penulis_artikel=\Auth::user()->id;
            $artikel->save(); 

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
        \Log::debug("aaa");
        $nama_foto = "";
        if ($request->hasFile('upload')) {
            $foto = $request->file('upload');
            $nama_foto = time().'.'.$foto->extension();
            $foto->move(public_path('images\artikel'), $nama_foto);
            // \Log::debug("bbb");
            // $img_title = Str::random(100);
            // $img = Image::make($request->upload);
            // $img->resize(null, 600, function ($constraint) {
            //     $constraint->aspectRatio();
            // })->encode('jpg', 50);
            // $img->stream(); // <-- Key pointx
            // Storage::disk('public_uploads')->put("images/artikel/" . $img_title . '.jpg', $request->file('upload'), 'public');
        }

        $response = [
            'uploaded' => true,
            "url" => url("") . "/images/artikel/" . $nama_foto 
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
