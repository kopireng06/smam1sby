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
                            <h1 class="panel-title">Pengumuman</h1>
                        </div>  
                        <div class="panel-body">
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <strong>Oops!</strong> Inputan Anda Salah !.<br><br>
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        <form action="{{ route('pengumuman.store') }}" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                            
                                {{csrf_field()}}
                
                                <div class="form-group mb-2">
                                    <label for="judul_pengumuman"><strong>Judul Pengumuman</strong></label>
                                    <input type="text" name="judul_pengumuman" class="form-control @error('judul_pengumuman') is-invalid @enderror" placeholder="Judul Pengumuman" required/>
                                    @error('judul_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                </div>
                                
                                <div class="form-group mb-2">
                                    <label for="tanggal_pengumuman"><strong>Tanggal Pengumuman</strong></label>                    
                                    <input type="date" name="tanggal_pengumuman" class="form-control" id="tanggal_pengumuman" aria-describedby="tanggal_pengumuman" >                
                                </div>

                                <div class="form-group mb-2">
                                    <label for="foto_pengumuman"><strong>Foto Sampul</strong></label>
                                    <input type="file" name="foto_pengumuman" class="form-control @error('foto_pengumuman') is-invalid @enderror" onchange="previewFile(this)">
                                    @error('foto_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                    <img id="previewImg" alt="foto_pengumuman" style="max-width:150px;margin-top:20px;">
                                </div> 

                                <div class="form-group mb-2">
                                    <label for="isi_pengumuman"><strong>Isi Pengumuman</strong></label>
                                    <textarea name="isi_pengumuman" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
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