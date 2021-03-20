@extends('layouts.dashboardtemplate')
@section('title')
    <title>contohadmin</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel mb-5">
					    <div class="panel-heading">
                            <h1 class="panel-title">Edit Alumni</h1>
                        </div>
                            
                        <div class="panel-body">
                            
                            <form action="/dashboard/alumni/{{$alumni->id_alumni}}/update" method="POST" enctype="multipart/form-data">
                                <div class="modal-body">
                                
                                    {{csrf_field()}}
                    
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><strong>Nama</strong></label>
                                        <input name="nama_alumni" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$alumni->nama_alumni}}">
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><strong>Universitas</strong></label>
                                        <input name="univ_alumni" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$alumni->univ_alumni}}">
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><strong>Jurusan</strong></label>
                                        <input name="jurusan_alumni" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$alumni->jurusan_alumni}}">
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><strong>Angkatan</strong></label>
                                        <input name="angkatan" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$alumni->angkatan}}">
                                    </div>

                                </div>
                                <div class="d-flex justify-content-between mt-3 mb-3">
                                    <a href="/dashboard/alumni" class="btn btn-warning float-right">
                                    Kembali </a>
                                    <button type="submit" class="btn btn-primary">Simpan</button>
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