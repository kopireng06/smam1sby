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
                            <h1 class="panel-title">Data Website Terkait</h1>
                        </div>
                        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Tambah Data Website Terkait
                        </button>
                            
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
                                            <a href="/web-terkait/{{$web->id_web}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/web-terkait/{{$web->id_web}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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
                <h5 class="modal-title" id="staticBackdropLabel">Tambah Data Website Terkait</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/web-terkait/create" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group">
                        <label for="file">Nama Website</label>
                        <input type="text" name="nama_web" class="form-control" placeholder="Nama Website" required/>
                    </div>

                    <div class="form-group">
                        <label for="file">Link Website</label>
                        <input type="text" name="link_web" class="form-control" placeholder="Link Website" required/>
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
