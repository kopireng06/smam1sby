@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Konten</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Konten</h1>
                        </div>
                        <a href="/dashboard/konten/create-konten" class="btn btn-primary float-right">
                            Tambah Konten
                        </a>
                            
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Judul Konten</th>
                                        <th>Kelompok Konten</th>
                                        <th>Isi Konten</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($konten as $konten)
                                    <tr>
                                        <td>{{$konten->judul_konten}}</td>
                                        <td>{{$konten->kelompok_konten}}</td>
                                        <td>{!! $konten->isi_konten !!}</td>

                                        <td>
                                            <a href="/dashboard/konten/{{$konten->id_konten}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/konten/{{$konten->id_konten}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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