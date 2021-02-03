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
                            <form action="/web-terkait/{{$web_terkait->id_web}}/update" method="POST" enctype="multipart/form-data">
                                <div class="modal-body">
                                
                                    {{csrf_field()}}
                    
                                    <div class="form-group">
                                        <label for="file">Nama Website</label>
                                        <input type="text" name="nama_web" class="form-control" placeholder="Nama Website" value="{{$web_terkait->nama_web}}"/>
                                    </div>

                                    <div class="form-group">
                                        <label for="file">Link Website</label>
                                        <input type="text" name="link_web" class="form-control" placeholder="Link Website" value="{{$web_terkait->link_web}}"/>
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
