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
                            <h1 class="panel-title">Data Kelompok Konten</h1>
                        </div>
                        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Tambah Data Kelompok Konten
                        </button>
                            
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
                                            <a href="/kelompok-konten/{{$kelkonten->id_kelompok_konten}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/kelompok-konten/{{$kelkonten->id_kelompok_konten}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Import Data Alumni</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/kelompok-konten/create" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group">
                        <label for="file">Nama Kelompok Konten</label>
                        <input type="text" name="nama_kelompok_konten" class="form-control" placeholder="Nama Kelompok Konten" required/>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Input</button>
                </div>
            </form> 
        </div>
    </div>
</div>


@endsection