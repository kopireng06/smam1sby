@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Alumni</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Kelompok Konten</h1>
                        </div>  
                        <div class="panel-body">
                        <form action="/dashboard/kelompok-konten/create" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                            
                                {{csrf_field()}}
                
                                <div class="form-group">
                                    <label for="file"><strong>Nama Kelompok Konten</strong></label>
                                    <input type="text" name="nama_kelompok_konten" class="form-control" placeholder="Nama Kelompok Konten" required/>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Tambah</button>
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