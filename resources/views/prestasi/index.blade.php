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
<<<<<<< HEAD

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Import Data Prestasi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/dashboard/prestasi/import" method="POST" enctype="multipart/form-data">
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

=======
>>>>>>> f0a2bc0c2465d038a687b0cfcdf1a3016a107832
@endsection
