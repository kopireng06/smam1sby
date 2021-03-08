@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Prestasi</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Website Terkait</h1>
                        </div>
                        <a href="/dashboard/web-terkait/create-web-terkait" class="btn btn-primary float-right">
                            Tambah Website Terkait
                        </a>
                            
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nama Website</th>
                                        <th>Link Website</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($web_terkait as $web)
                                    <tr>
                                        <td>{{$web->nama_web}}</td>
                                        <td>{{$web->link_web}}</td>

                                        <td>
                                            <a href="/dashboard/web-terkait/{{$web->id_web}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/web-terkait/{{$web->id_web}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
