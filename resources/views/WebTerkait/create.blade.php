@extends('layouts.dashboardtemplate')
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Web Terkait</h1>
                        </div>  
                        <div class="panel-body">
                        <form action="/dashboard/web-terkait/create" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                            
                                {{csrf_field()}}
                
                                <div class="form-group mb-2">
                                    <label for="file"><strong>Nama Website</strong></label>
                                    <input type="text" name="nama_web" class="form-control" placeholder="Nama Website" required/>
                                </div>

                                <div class="form-group mb-2">
                                    <label for="file"><strong>Link Website</strong></label>
                                    <input type="text" name="link_web" class="form-control" placeholder="Link Website" required/>
                                </div>

                            </div>
                            <div class="d-flex justify-content-between mt-3 mb-3">
                                <a href="/dashboard/web-terkait" class="btn btn-warning float-right">
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