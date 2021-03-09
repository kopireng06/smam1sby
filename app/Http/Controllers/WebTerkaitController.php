<?php

namespace App\Http\Controllers;

use App\Models\WebTerkait;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WebTerkaitController extends Controller
{
    public function index(Request $request)
    {
        $search = request()->query('search');

        if($search){
            $web_terkait = WebTerkait::where('nama_web', 'LIKE', "%{$search}%")->orderBy('created_at', 'DESC')->simplePaginate(5);

        }else{            
            $web_terkait = WebTerkait::orderBy('created_at', 'DESC')->simplePaginate(5);

        }

        $count = $web_terkait->firstItem();

        return view ('WebTerkait.index',compact('web_terkait', 'count'));
    }

    public function createWebTerkait()
    {
        return view ('WebTerkait.create');
    }

    public function create(Request $request)
    {
        WebTerkait::create($request->all());
        
        return redirect('/dashboard/web-terkait')
            ->with('success', 'Website Terkait Berhasil Ditambahkan !');
    }

    public function edit($id_web)
    {
        $web = WebTerkait::find($id_web);
        return view ('WebTerkait.edit',['web_terkait'=>$web]);
    }

    public function update(Request $request, $id_web)
    {
        $web = WebTerkait::find($id_web);
        $web->update($request->all());
        return redirect('/dashboard/web-terkait')
        ->with('success', 'Website Terkait Berhasil Diubah !');
    }

    public function delete($id_web)
    {
        $web = WebTerkait::find($id_web);
        $web->delete();
        return redirect('/dashboard/web-terkait')
        ->with('success', 'Website Terkait Berhasil Dihapus !');
    }
}
