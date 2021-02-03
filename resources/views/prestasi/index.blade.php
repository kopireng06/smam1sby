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
                            <h1 class="panel-title">Data Prestasi</h1>
                        </div>
                        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Import Data Prestasi
                        </button>
                        <a href="/prestasi/delete-selection" type="button" name="submit" class="btn btn-danger" id="deleteAllSelect">Delete All</a>
                            
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" id="checkAll"></th>
                                        <th>Nama</th>
                                        <th>Juara</th>
                                        <th>Tingkat</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($prestasi as $prestasi)
                                    <tr>
                                        <td>
                                            <input name='id[]' type="checkbox" value="{{$prestasi->id_prestasi}}" id="checkItem">
                                        </td>
                                        <td>{{$prestasi->nama_prestasi}}</td>
                                        <td>{{$prestasi->juara_prestasi}}</td>
                                        <td>{{$prestasi->tingkat_prestasi}}</td>

                                        <td>
                                            <a href="/prestasi/{{$prestasi->id_prestasi}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/prestasi/{{$prestasi->id_prestasi}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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
                <h5 class="modal-title" id="staticBackdropLabel">Import Data Prestasi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/prestasi/import" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group">
                        <label for="file">Choose File</label>
                        <input type="file" name="file" class="form-control"/>
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
