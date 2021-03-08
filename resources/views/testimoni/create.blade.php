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
                            <h1 class="panel-title">Testimoni</h1>
                        </div>  
                        <div class="panel-body">
                        <form action="{{ route('testimoni.store') }}" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                            
                                {{csrf_field()}}
                
                                <div class="form-group mb-2">
                                    <label for="nama_testi"><strong>Nama</strong></label>
                                    <input type="text" name="nama_testi" class="form-control @error('nama_testi') is-invalid @enderror" placeholder="Nama" required/>
                                    @error('nama_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                </div>

                                <div class="form-group mb-2">
                                    <label for="jurusan_testi"><strong>Jurusan</strong></label>
                                    <input type="text" name="jurusan_testi" class="form-control @error('jurusan_testi') is-invalid @enderror" placeholder="Jurusan" required/>
                                    @error('jurusan_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                </div>

                                <div class="form-group mb-2">
                                    <label for="universitas_testi"><strong>Universitas</strong></label>
                                    <input type="text" name="universitas_testi" class="form-control @error('universitas_testi') is-invalid @enderror" placeholder="Universitas" required/>
                                    @error('universitas_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                </div>

                                <div class="form-group mb-2">
                                    <label for="pekerjaan_testi"><strong>Pekerjaan</strong></label>
                                    <input type="text" name="pekerjaan_testi" class="form-control @error('pekerjaan_testi') is-invalid @enderror" placeholder="Pekerjaan"/>
                                    @error('pekerjaan_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                </div>

                                <div class="form-group mb-2">
                                    <label for="foto_testi"><strong>Foto Sampul</strong></label>
                                    <input type="file" name="foto_testi" class="form-control @error('foto_testi') is-invalid @enderror" onchange="previewFile(this)">
                                    @error('foto_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                    <img id="previewImg" alt="foto_testi" style="max-width:150px;margin-top:20px;">
                                </div>
                                
                                <div class="form-group mb-2">
                                    <label for="isi_testi"><strong>Isi Testimoni</strong></label>
                                    <textarea name="isi_testi" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
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