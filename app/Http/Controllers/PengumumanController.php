<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pengumuman;
use Carbon\Carbon;

class PengumumanController extends Controller
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
            $pengumuman = Pengumuman::where('judul_pengumuman', 'LIKE', "%{$search}%")->with('user')->orderBy('created_at', 'DESC')->simplePaginate(5);

        }else{            
            $pengumuman = Pengumuman::with('user')->orderBy('created_at', 'DESC')->simplePaginate(5);

        }

        $count = $pengumuman->firstItem();

        Pengumuman::where('created_at', '<', Carbon::now()->subYears(3))->delete(); //Auto delete untuk durasi 3 tahun

        return view('pengumuman.index', compact('pengumuman', 'count'));
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
        $this->validate(
            $request, 
            [   
                'judul_pengumuman'=>'required',
                'isi_pengumuman'=>'required',
                'tanggal_pengumuman'=>'required',
                'foto_pengumuman'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:4500',
            ],
            [   
                'judul_pengumuman.required'    => 'Harap isi judul pengumumuman !.',
                'isi_pengumuman.required'      => 'Harap isi pengumuman di tulis !',
                'tanggal_pengumuman.required' => 'Harap sertakan tanggal pengumuman !',
                'foto_pengumuman.required'      => 'Harap sertakan foto cover untuk pengumuman !',
                'foto_pengumuman.image'      => 'Format foto yang diperbolehkan adalah JPG, JPEG, PNG.',
            ]
        );
        
        //Pengumuman::create($request->all());

        $judul = $request->judul_pengumuman;
        $isi = $request->isi_pengumuman;
        $tanggal = $request->tanggal_pengumuman;
        $link = $request->link_file;
        $foto = $request->file('foto_pengumuman');
        $nama_foto = time().'.'.$foto->extension();
        $foto->move(public_path('images/pengumuman'), $nama_foto);

        $pengumuman = new Pengumuman;
        $pengumuman->judul_pengumuman = $judul;        
        $pengumuman->isi_pengumuman = $isi;
        $pengumuman->tanggal_pengumuman = $tanggal;
        $pengumuman->penulis_pengumuman = \Auth::user()->id;        
        $pengumuman->foto_pengumuman = $nama_foto;
        $pengumuman->link_file = $link;
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
        $this->validate(
            $request, 
            [   
                'judul_pengumuman'  =>'required',
                'isi_pengumuman'    =>'required',
                'tanggal_pengumuman'=>'required',
                'foto_pengumuman'   =>'required|image|mimes:jpg,png,jpeg,gif,svg|max:4500',
            ],
            [   
                'judul_pengumuman.required'     => 'Harap isi judul pengumumuman !.',
                'isi_pengumuman.required'       => 'Harap isi pengumuman di tulis !',
                'tanggal_pengumuman.required'   => 'Harap sertakan tanggal pengumuman !',
                'foto_pengumuman.required'      => 'Harap sertakan foto cover untuk pengumuman !',
                'foto_pengumuman.image'         => 'Format foto yang diperbolehkan adalah JPG, JPEG, PNG.',
                'foto_pengumuman.mimes'         => 'Ukuran foto terlalu besar, max : 4,5 MB !',
            ]
        );

        if($request->file('foto_pengumuman')==""){

            $pengumuman = Pengumuman::find($id);
            $pengumuman->judul_pengumuman = $request->judul_pengumuman;
            $pengumuman->isi_pengumuman = $request->isi_pengumuman;
            $pengumuman->tanggal_pengumuman = $request->tanggal_pengumuman;
            $pengumuman->link_file = $request->link_file;
            $pengumuman->penulis_pengumuman=\Auth::user()->id;
            $pengumuman->save();
        }else{

            $foto = $request->file('foto_pengumuman');
            $nama_foto = time().'.'.$foto->extension();
            $foto->move(public_path('images/pengumuman'), $nama_foto);

            $pengumuman = Pengumuman::find($id);
            unlink(public_path('images/pengumuman').'/'.$pengumuman->foto_pengumuman); //Delete this syntax if you'd like to keep the image file of $this pengumuman

            $pengumuman->judul_pengumuman = $request->judul_pengumuman;
            $pengumuman->isi_pengumuman = $request->isi_pengumuman;
            $pengumuman->tanggal_pengumuman = $request->tanggal_pengumuman;
            $pengumuman->link_file = $request->link_file;
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
