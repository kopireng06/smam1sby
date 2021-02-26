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
                            <h1 class="panel-title">Data Konten</h1>
                        </div>
                        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Tambah Konten
                        </button>
                            
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
                                        <td>{{$konten->isi_konten}}</td>

                                        <td>
                                            <a href="/konten/{{$konten->id_konten}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/konten/{{$konten->id_konten}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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
            <form action="/konten/create" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group">
                        <label for="file">Judul Konten</label>
                        <input type="text" name="judul_konten" class="form-control" placeholder="Judul Konten" required/>
                    </div>
                    
                    <div class="dropdown">
                        <label for="file">Kelompok Konten</label>
                        <select name="kelompok_konten" class="form-control" id="exampleFormControlSelect1">
                            <option>Choose One</option>
                            @foreach ($kelkonten as $kelkonten)
                                <option value="{{$kelkonten->nama_kelompok_konten}}">{{$kelkonten->nama_kelompok_konten}}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="file">Isi Konten</label>
                        <textarea name="isi_konten" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Import</button>
                </div>
            </form>
        </div>
    </div>
</div>


@endsection