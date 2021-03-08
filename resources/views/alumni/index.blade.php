@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Alumni</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Alumni</h1>
                        </div>
                        <a href="/dashboard/alumni/import-alumni" class="btn btn-primary float-right">
                            Import Alumni
                        </a>
                            
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Universitas</th>
                                        <th>Jurusan</th>
                                        <th>Angkatan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($data_alumni as $alumni)
                                    <tr>
                                        <td>{{$alumni->nama_alumni}}</td>
                                        <td>{{$alumni->univ_alumni}}</td>
                                        <td>{{$alumni->jurusan_alumni}}</td>
                                        <td>{{$alumni->angkatan}}</td>

                                        <td>
                                            <a href="/dashboard/alumni/{{$alumni->id_alumni}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/alumni/{{$alumni->id_alumni}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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