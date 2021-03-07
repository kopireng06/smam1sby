@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Konten</title>
@endsection
    @section('konten')
    <style>
        h3 {text-align: center;}
        a {text-align: left;}
        b {text-align: right;}
    </style>
    <div class="main">
        <div class="main-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 mb-5">
                        @if ($message = Session::get('success'))
                            <div class="alert alert-success">
                                <p>{{ $message }}</p>
                            </div>
                        @endif
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
                        <div class="card mb-3" style="width: 56rem;">
                            <img class="card-img-top" src="{{ asset('images/pengumuman') }}/{{ $pengumuman->foto_pengumuman }}" alt="Card image cap" style="max-width:550px;max-height:400px;margin-top:20px;margin-bottom:10px;margin-left:auto;margin-right:auto;">
                            <div class="card-body">
                                <h3 class="card-title" >{{ $pengumuman->judul_pengumuman }}</h3>
                                <a class="card-text"><small class="text-muted">{{ $pengumuman->created_at->diffForHumans() }}</small></a>
                                <b class="card-text"><small class="text-muted">{{ $pengumuman->tanggal_pengumuman }}</small></b>
                                <br>
                                <p class="card-text">{!! $pengumuman->isi_pengumuman !!}</p>
                                <div class="flex-container">
                                    <form action="{{ route('pengumuman.destroy',$pengumuman->id_pengumuman) }}" method="POST">
                                        <button type="button" class="btn btn-warning float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            Edit Pengumuman
                                        </button>
                                        @csrf
                                        @method('DELETE')
                        
                                        <button type="submit" class="btn btn-danger" onclick="return confirm('Yakin mau dihapus?')">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Edit Pengumuman</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
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
            <form action="{{ route('pengumuman.update', $pengumuman->id_pengumuman) }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}} {{ method_field('PUT') }}
      
                    <div class="form-group mb-2">                        
                        <label for="judul_pengumuman"><strong>Judul Pengumuman</strong></label>
                        <input type="text" name="judul_pengumuman" class="form-control @error('judul_pengumuman') is-invalid @enderror" value= "{{ $pengumuman->judul_pengumuman }}" placeholder="Judul Pengumuman" required/>
                        @error('judul_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group mb-2">
                        <label for="tanggal_pengumuman"><strong>Tanggal Pengumuman</strong></label>                    
                        <input type="date" name="tanggal_pengumuman" class="form-control @error('tanggal_pengumuman') is-invalid @enderror" value ="{{ $pengumuman->tanggal_pengumuman }}" id="tanggal_pengumuman" aria-describedby="tanggal_pengumuman" requiredd>
                        @error('tanggal_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror                
                    </div>

                    <div class="form-group mb-2">
                        <label for="foto_pengumuman"><strong>Foto Sampul</strong></label>
                        <input type="file" name="foto_pengumuman" class="form-control @error('foto_pengumuman') is-invalid @enderror" onchange="previewFile(this)">
                        @error('foto_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        <img id="previewImg" alt="foto_pengumuman" src="{{ asset('images/pengumuman') }}/{{ $pengumuman->foto_pengumuman }}" style="max-width:150px;margin-top:20px;">
                    </div> 

                    <div class="form-group mb-2">
                        <label for="link_file"><strong>Link Downloadable File</strong></label>
                        <input type="text" name="link_file" class="form-control @error('link_file') is-invalid @enderror" value="{{ $pengumuman->link_file }}"/>
                        @error('link_file')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div> 

                    <div class="form-group mb-2">
                        <label for="isi_pengumuman"><strong>Isi Pengumuman</strong></label>
                        <textarea name="isi_pengumuman" class="ckeditor form-control" name="wysiwyg-editor">{{ $pengumuman->isi_pengumuman }}</textarea>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Edit</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection