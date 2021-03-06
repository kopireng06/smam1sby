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
                            
                        <div class="panel-body">
                            <form action="/dashboard/kelompok-konten/{{$kelompok_konten->id_kelompok_konten}}/update" method="POST" enctype="multipart/form-data">
                                <div class="modal-body">
                                
                                    {{csrf_field()}}
                    
                                    <div class="form-group">
                                        <label for="file">Nama Kelompok Konten</label>
                                        <input type="text" name="nama_kelompok_konten" class="form-control" placeholder="Nama Kelompok Konten" value="{{$kelompok_konten->nama_kelompok_konten}}"/>
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