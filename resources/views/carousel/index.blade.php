@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Carousel</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Carousel</h1>
                        </div>
                        <a href="/dashboard/carousel/create-carousel" class="btn btn-primary float-right">
                            Tambah Carousel
                        </a>
                            
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Judul</th>
                                        <th>Isi</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>

                                <tbody>
                                @foreach($carousel as $carousel)
                                    <tr>
                                        <td>{{$carousel->foto_car}}</td>
                                        <td>{{$carousel->judul_car}}</td>
                                        <td>{{$carousel->isi_car}}</td>

                                        <td>
                                            <a href="/dashboard/carousel/{{$carousel->id_car}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/carousel/{{$carousel->id_car}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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