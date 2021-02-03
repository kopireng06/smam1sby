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
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Edit Data Alumni</h1>
                        </div>
                            
                        <div class="panel-body">
                            
                            <form action="/alumni/{{$alumni->id_alumni}}/update" method="POST" enctype="multipart/form-data">
                                <div class="modal-body">
                                
                                    {{csrf_field()}}
                    
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Nama</label>
                                        <input name="nama_alumni" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$alumni->nama_alumni}}">
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Universitas</label>
                                        <input name="univ_alumni" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$alumni->univ_alumni}}">
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Jurusan</label>
                                        <input name="jurusan_alumni" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$alumni->jurusan_alumni}}">
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