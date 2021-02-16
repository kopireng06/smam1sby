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
        $pengumuman = Pengumuman::with('user')->get();
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
            'foto_pengumuman'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);
        
        //Pengumuman::create($request->all());

        $judul = $request->judul_pengumuman;
        $isi = $request->isi_pengumuman;
        $tanggal = $request->tanggal_pengumuman;
        $foto = $request->file('foto_pengumuman');
        $nama_foto = time().'.'.$foto->extension();
        $foto->move(public_path('images/pengumuman'), $nama_foto);

        $pengumuman = new Pengumuman;
        $pengumuman->judul_pengumuman = $judul;        
        $pengumuman->isi_pengumuman = $isi;
        $pengumuman->tanggal_pengumuman = $tanggal;
        $pengumuman->penulis_pengumuman = \Auth::user()->id;        
        $pengumuman->foto_pengumuman = $nama_foto;
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
        $pengumuman = Pengumuman::with('user')->find($id);
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
            'foto_pengumuman'=>'image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);

        if($request->file('foto_pengumuman')==""){

            $pengumuman = new Pengumuman;
            $pengumuman->penulis_pengumuman=\Auth::user()->id;
            Pengumuman::find($id)->update($request->all());
        }else{

            $foto = $request->file('foto_pengumuman');
            $nama_foto = time().'.'.$foto->extension();
            $foto->move(public_path('images/pengumuman'), $nama_foto);

            $pengumuman = Pengumuman::find($id);
            unlink(public_path('images/pengumuman').'/'.$pengumuman->foto_pengumuman); //Delete this syntax if you'd like to keep the image file of $this artikel

            $pengumuman->judul_pengumuman = $request->judul_pengumuman;
            $pengumuman->isi_pengumuman = $request->isi_pengumuman;
            $pengumuman->tanggal_pengumuman = $request->tanggal_pengumuman;
            $pengumuman->penulis_pengumuman=\Auth::user()->id;
            $pengumuman->foto_pengumuman = $nama_foto;
            $pengumuman->save();
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
        $pengumuman = Pengumuman::find($id);
        unlink(public_path('images/pengumuman').'/'.$pengumuman->foto_pengumuman);
        $pengumuman->delete();
            
        return redirect()->route('pengumuman.index')
            ->with('success', 'Pengumuman Berhasil di Hapus !');
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
            Storage::disk('public')->put("pengumuman/" . $img_title . '.jpg', $img, 'public');
        }

        $response = [
            'uploaded' => true,
            "url" => url("") . "/storage/pengumuman/" . $img_title . ".jpg"
        ];

        return response()->json($response);
    }

    public function deleteImage(Request $request)
    {
        $url = explode('/', $request->url);
        $file = end($url);
        Storage::disk('public')->delete("pengumuman/" . $file);
        $response = [
            'deleted' => true,
            "url" => url("") . "/app/pengumuman/" . $file . ".jpg"
        ];
        return response()->json($response);
    }

}
