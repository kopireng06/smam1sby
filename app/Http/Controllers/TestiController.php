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
            'foto_testi'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);
        
        $nama = $request->nama_testi;
        $isi = $request->isi_testi;
        $pekerjaan = $request->pekerjaan_testi;
        $jurusan = $request->jurusan_testi;
        $fakultas = $request->fakultas_testi;
        $universitas = $request->universitas_testi;
        $foto = $request->file('foto_testi');
        $nama_foto = time().'.'.$foto->extension();
        $foto->move(public_path('images\testimoni'), $nama_foto);

        $testi = new Testi;
        $testi->nama_testi = $nama;        
        $testi->isi_testi = $isi;
        $testi->pekerjaan_testi = $pekerjaan;
        $testi->jurusan_testi = $jurusan;        
        $testi->fakultas_testi = $fakultas;
        $testi->universitas_testi = $universitas;
        $testi->penulis_testi = \Auth::user()->id;
        $testi->foto_testi = $nama_foto;
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
            'foto_testi'=>'image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);

        if($request->file('foto_testi')==""){

            $testi = new Testi;
            $testi->penulis_testi=\Auth::user()->id;
            Testi::find($id)->update($request->all());

        }else{

            $foto = $request->file('foto_testi');
            $nama_foto = time().'.'.$foto->extension();
            $foto->move(public_path('images\testimoni'), $nama_foto);

            $testi = Testi::find($id);
            
            $testi->nama_testi = $request->nama_testi;
            $testi->isi_testi = $request->isi_testi;
            $testi->pekerjaan_testi = $request->pekerjaan_testi;
            $testi->jurusan_testi = $request->jurusan_testi;
            $testi->fakultas_testi = $request->fakultas_testi;
            $testi->universitas_testi = $request->universitas_testi;
            $testi->penulis_testi=\Auth::user()->id;
            $testi->foto_testi = $nama_foto;
            $testi->save();

        }

        return back()->with('success', 'Testimoni Berhasil di Update !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $testi=Testi::find($id);
        unlink(public_path('images/testimoni').'/'.$testi->foto_testi); 
        // \File::delete('public/images/testimoni'.$testi->foto_testi);
        $testi->delete();
            
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

    public function uploadImage(Request $request)
    {
        if ($request->hasFile('upload')) {
            $img_title = Str::random(100);
            $img = Image::make($request->upload);
            $img->resize(null, 600, function ($constraint) {
                $constraint->aspectRatio();
            })->encode('jpg', 50);
            $img->stream(); // <-- Key point
            Storage::disk('public')->put("testimoni/" . $img_title . '.jpg', $img, 'public');
        }

        $response = [
            'uploaded' => true,
            "url" => url("") . "/storage/testimoni/" . $img_title . ".jpg"
        ];

        return response()->json($response);
    }

    public function deleteImage(Request $request)
    {
        $url = explode('/', $request->url);
        $file = end($url);
        Storage::disk('public')->delete("testimoni/" . $file);
        $response = [
            'deleted' => true,
            "url" => url("") . "/app/testimoni/" . $file . ".jpg"
        ];
        return response()->json($response);
    }
}
