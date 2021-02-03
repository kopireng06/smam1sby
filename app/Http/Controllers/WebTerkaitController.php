<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WebTerkaitController extends Controller
{
    public function index()
    {
        $web = \App\Models\WebTerkait::all();
        return view ('WebTerkait.index',['web_terkait'=>$web]);
    }

    public function create(Request $request)
    {
        \App\Models\WebTerkait::create($request->all());
        return redirect('/web-terkait');
    }

    public function edit($id_web)
    {
        $web = \App\Models\WebTerkait::find($id_web);
        return view ('WebTerkait.edit',['web_terkait'=>$web]);
    }

    public function update(Request $request, $id_web)
    {
        $web = \App\Models\WebTerkait::find($id_web);
        $web->update($request->all());
        return redirect('/web-terkait');
    }

    public function delete($id_web)
    {
        $web = \App\Models\WebTerkait::find($id_web);
        $web->delete();
        return redirect('/web-terkait');
    }
}
