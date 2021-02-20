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
                            <h1 class="panel-title">Data Carousel</h1>
                        </div>
                        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Tambah Data Carousel
                        </button>
                            
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
                                            <a href="/carousel/{{$carousel->id_carousel}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/carousel/{{$carousel->id_carousel}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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
                <h5 class="modal-title" id="staticBackdropLabel">Input Data Czarousel</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/carousel/create" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}

                    <div class="form-group">
                        <label for="file">Choose File Image</label>
                        <input type="file" name="foto_car" class="form-control" onchange="previewFile(this)" required/>
                        <img id="previewImg" alt="Image" style="max-width:130px;margin-top:20px;"/>
                    </div>

                    <div class="form-group">
                        <label for="file">Judul</label>
                        <input type="text" name="judul_car" class="form-control" placeholder="Kelompok Konten" required/>
                    </div>

                    <div class="form-group">
                        <label for="file">Foto</label>
                        <input type="text" name="isi_car" class="form-control" placeholder="Kelompok Konten" required/>
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection