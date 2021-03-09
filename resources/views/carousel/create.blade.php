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
                            <h1 class="panel-title">Tambah Carousel</h1>
                        </div>  
                        <div class="panel-body">
                        <form action="/dashboard/carousel/create" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                            
                                {{csrf_field()}}

                                <div class="form-group">
                                    <label for="file"><strong>Choose File Image</strong></label>
                                    <input type="file" name="foto_car" class="form-control" onchange="previewFile(this)" required/>
                                    <img id="previewImg" alt="Image" style="max-width:130px;margin-top:20px;"/>
                                </div>

                                <div class="form-group">
                                    <label for="file"><strong>Judul</strong></label>
                                    <input type="text" name="judul_car" class="form-control" placeholder="Judul Carousel" required/>
                                </div>

                                <div class="form-group">
                                    <label for="file"><strong>Isi</strong></label>
                                    <input type="text" name="isi_car" class="form-control" placeholder="Isi Carousel" required/>
                                </div>


                            </div>
                            <div class="d-flex justify-content-between mt-3 mb-3">
                                <a href="/dashboard/carousel/" class="btn btn-warning float-right">
                                Kembali </a>
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