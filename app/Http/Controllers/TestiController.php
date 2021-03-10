<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Testi;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\TestiImport;
use Carbon\Carbon;

class TestiController extends Controller
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
            $testi = Testi::where('nama_testi', 'LIKE', "%{$search}%")->with('user')->orderBy('created_at', 'DESC')->simplePaginate(5);

        }else{            
            $testi = Testi::with('user')->orderBy('created_at', 'DESC')->simplePaginate(5);

        }

        $count = $testi->firstItem();

        Testi::where('created_at', '<', Carbon::now()->subYears(7))->delete(); //Auto delete untuk durasi 7 tahun

        return view('testimoni.index', compact('testi', 'count'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view ('testimoni.create');
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
            'jurusan_testi'=>'required|string',
            'universitas_testi'=>'required',
            'pekerjaan_testi'=>'nullable|string',
            'foto_testi'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);
        
        $nama = $request->nama_testi;
        $isi = $request->isi_testi;
        $jurusan = $request->jurusan_testi;
        $universitas = $request->universitas_testi;
        $pekerjaan = $request->pekerjaan_testi;
        $foto = $request->file('foto_testi');
        $nama_foto = time().'.'.$foto->extension();
        $foto->move(public_path('images\testimoni'), $nama_foto);

        $testi = new Testi;
        $testi->nama_testi = $nama;        
        $testi->isi_testi = $isi;
        $testi->jurusan_testi = $jurusan;
        $testi->universitas_testi = $universitas;
        $testi->pekerjaan_testi = $pekerjaan;
        $testi->penulis_testi = \Auth::user()->id;
        $testi->foto_testi = $nama_foto;
        $testi->save();        

        return redirect()->route('testimoni.index')
            ->with('success', 'Testimoni Berhasil Ditambahkan !');
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

        return view('testimoni.show', compact('testi', 'user'));
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
            'jurusan_testi'=>'required|string',
            'universitas_testi'=>'required',
            'pekerjaan_testi'=>'nullable|string',
            'foto_testi'=>'image|mimes:jpg,png,jpeg,gif,svg|max:4500',
        ]);

        $testi = Testi::find($id);

        if($request->file('foto_testi')==""){
        
            $testi->nama_testi = $request->nama_testi;
            $testi->isi_testi = $request->isi_testi;
            $testi->jurusan_testi = $request->jurusan_testi;
            $testi->universitas_testi = $request->universitas_testi;
            $testi->pekerjaan_testi = $request->pekerjaan_testi;
            $testi->penulis_testi=\Auth::user()->id;
            $testi->save();

        }else{

            $foto = $request->file('foto_testi');
            $nama_foto = time().'.'.$foto->extension();
            $foto->move(public_path('images/testimoni'), $nama_foto);

            if ($testi->foto_testi == ""){        
                
                $testi->nama_testi = $request->nama_testi;
                $testi->isi_testi = $request->isi_testi;
                $testi->jurusan_testi = $request->jurusan_testi;
                $testi->universitas_testi = $request->universitas_testi;
                $testi->pekerjaan_testi = $request->pekerjaan_testi;
                $testi->penulis_testi=\Auth::user()->id;
                $testi->foto_testi = $nama_foto;
                $testi->save();              

            }else{

                unlink(public_path('images/testimoni').'/'.$testi->foto_testi);
                $testi->nama_testi = $request->nama_testi;
                $testi->isi_testi = $request->isi_testi;
                $testi->jurusan_testi = $request->jurusan_testi;
                $testi->universitas_testi = $request->universitas_testi;
                $testi->pekerjaan_testi = $request->pekerjaan_testi;
                $testi->penulis_testi=\Auth::user()->id;
                $testi->foto_testi = $nama_foto;
                $testi->save();

            }            

        }

        return redirect()->route('testimoni.index')
            ->with('success', 'Testimoni Berhasil Diubah !');
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
        $data = $testi->isi_testi;
        
        if(preg_match_all('/img src="[^"]*/', $data, $matches)) {
            foreach ($matches as $key => $value) {
                $matches[$key]=str_replace('img src="http://127.0.0.1:8000/',"",$matches[$key]);
            }
            
        }
        for ($i = 0; $i < count($matches[0]); $i++)
        {
            unlink(public_path('/').$matches[0][$i]);
        }
        // \File::delete('public/images/testimoni'.$testi->foto_testi);
        $testi->delete();
            
        return redirect()->route('testimoni.index')
            ->with('success', 'Testimoni Berhasil Dihapus !');
    }

    public function import(Request $request)
    {
        $this->validate($request, [
            'file' => 'required'
        ]);

        $file = $request->file('file');

        Excel::import(new TestiImport, $file);

        return redirect()->route('testimoni.index')
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
