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
                            <h1 class="panel-title">Prestasi</h1>
                        </div>
                        <a href="/dashboard/prestasi/import-prestasi" class="btn btn-primary float-right" >
                            Import Prestasi
                        </a>
                            
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Juara</th>
                                        <th>Tingkat</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($prestasi as $prestasi)
                                    <tr id="sid{{$prestasi->id_prestasi}}">
                                        <td>{{$prestasi->nama_prestasi}}</td>
                                        <td>{{$prestasi->juara_prestasi}}</td>
                                        <td>{{$prestasi->tingkat_prestasi}}</td>

                                        <td>
                                            <a href="/dashboard/prestasi/{{$prestasi->id_prestasi}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/prestasi/{{$prestasi->id_prestasi}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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
