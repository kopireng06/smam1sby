<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pengumuman;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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

        $timpa = DB::table('pengumumen')->count();
        
        if ($timpa > 30){
            $hapus = DB::table('pengumumen')->select('id_pengumuman')->orderBy('created_at','ASC')->limit(1)->delete();
        }

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
        return view ('pengumuman.create');
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
            ],
            [   
                'judul_pengumuman.required'    => 'Harap isi judul pengumumuman !.',
                'isi_pengumuman.required'      => 'Harap isi pengumuman di tulis !',
            ]
        );
        
        //Pengumuman::create($request->all());

        $pengumuman = new Pengumuman;
        $pengumuman->judul_pengumuman = $request->judul_pengumuman;
        $pengumuman->isi_pengumuman = $request->isi_pengumuman;
        $pengumuman->penulis_pengumuman=\Auth::user()->id;
        $pengumuman->save();        

        return redirect()->route('pengumuman.index')
            ->with('success', 'Pengumuman Berhasil Ditambahkan !');        
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
            ],
            [   
                'judul_pengumuman.required'     => 'Harap isi judul pengumumuman !.',
                'isi_pengumuman.required'       => 'Harap isi pengumuman di tulis !',
            ]
        );

        $pengumuman = Pengumuman::find($id);
        $pengumuman->judul_pengumuman = $request->judul_pengumuman;
        $pengumuman->isi_pengumuman = $request->isi_pengumuman;
        $pengumuman->penulis_pengumuman=\Auth::user()->id;
        $pengumuman->save();

        return redirect()->route('pengumuman.index')
        ->with('success', 'Pengumuman Berhasil Diubah !');  
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
        $data = $pengumuman->isi_pengumuman;
        
        if(preg_match_all('/img src="[^"]*/', $data, $matches)) {
            foreach ($matches as $key => $value) {
                $matches[$key]=str_replace('img src="http://127.0.0.1:8000/',"",$matches[$key]);
            }
            
        }
        for ($i = 0; $i < count($matches[0]); $i++)
        {
            unlink(public_path('/').$matches[0][$i]);
        } 
        $pengumuman->delete();

        return redirect()->route('pengumuman.index')
            ->with('success', 'Pengumuman Berhasil Dihapus !');
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
