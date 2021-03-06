<?php

namespace App\Http\Controllers;

use App\Models\WebTerkait;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WebTerkaitController extends Controller
{
    public function index()
    {
        $web = WebTerkait::all();
        return view ('WebTerkait.index',['web_terkait'=>$web]);
    }

    public function create(Request $request)
    {
        WebTerkait::create($request->all());
        return redirect('/dashboard/web-terkait');
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
        return redirect('/dashboard/web-terkait');
    }

    public function delete($id_web)
    {
        $web = WebTerkait::find($id_web);
        $web->delete();
        return redirect('/dashboard/web-terkait');
    }
}
