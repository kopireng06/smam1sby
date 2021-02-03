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
                            
                        <div class="panel-body">
                            <form action="/prestasi/{{$prestasi->id_prestasi}}/update" method="POST" enctype="multipart/form-data">
                                <div class="modal-body">
                                
                                    {{csrf_field()}}
                    
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Nama</label>
                                        <input name="nama_prestasi" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$prestasi->nama_prestasi}}">
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Juara</label>
                                        <input name="juara_prestasi" type="integer" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$prestasi->juara_prestasi}}">
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Tingkat</label>
                                        <input name="tingkat_prestasi" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$prestasi->tingkat_prestasi}}">
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-warning">Save</button>
                                </div>
                            </form>                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection