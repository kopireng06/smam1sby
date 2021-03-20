@extends('layouts.dashboardtemplate')
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Edit Prestasi</h1>
                        </div>
                        
                        <div class="panel-body">
                            <form action="/dashboard/prestasi/{{$prestasi->id_prestasi}}/update" method="POST" enctype="multipart/form-data">
                                <div class="modal-body">
                                
                                    {{csrf_field()}}
                    
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><strong>Nama</strong></label>
                                        <input name="nama_prestasi" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$prestasi->nama_prestasi}}">
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><strong>Juara</strong></label>
                                        <input name="juara_prestasi" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$prestasi->juara_prestasi}}">
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><strong>Tingkat</strong></label>
                                        <input name="tingkat_prestasi" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="{{$prestasi->tingkat_prestasi}}">
                                    </div>

                                </div>
                                <div class="d-flex justify-content-between mt-3 mb-3">
                                    <a href="/dashboard/prestasi" class="btn btn-warning float-right">
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