@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Kelompok Konten</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Kelompok Konten</h1>
                        </div>
                        <a href="/dashboard/kelompok-konten/create-kelompok-konten" class="btn btn-primary float-right">
                            Tambah Kelompok Konten
                        </a>
                            
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nama Kelompok Konten</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($kelompok_konten as $kelkonten)
                                    <tr>
                                        <td>{{$kelkonten->nama_kelompok_konten}}</td>


                                        <td>
                                            <a href="/dashboard/kelompok-konten/{{$kelkonten->id_kelompok_konten}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/kelompok-konten/{{$kelkonten->id_kelompok_konten}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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