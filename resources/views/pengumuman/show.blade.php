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
                    <div class="col-md-12">
                        <div class="card mb-3" style="width: 56rem;">
                            <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Nahdlatul_Ulama.jpg/1200px-Flag_of_Nahdlatul_Ulama.jpg" alt="Card image cap" width="500px" height="500px">
                            <div class="card-body">
                                <h3 class="card-title" >{{ $pengumuman->judul_pengumuman }}</h3>
                                <a class="card-text"><small class="text-muted">{{ $pengumuman->created_at }}</small></a>
                                <b class="card-text"><small class="text-muted">{{ $pengumuman->tanggal_pengumuman }}</small></b>
                                <br>
                                <p class="card-text">{{ $pengumuman->isi_pengumuman }}</p>
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
    <div class="modal-dialog">
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
      
                    <div class="form-group">                        
                        <label for="judul_pengumuman">Judul Pengumuman</label>
                        <input type="text" name="judul_pengumuman" class="form-control @error('judul_pengumuman') is-invalid @enderror" value= "{{ $pengumuman->judul_pengumuman }}" placeholder="Judul Pengumuman" required/>
                        @error('judul_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group">
                        <label for="tanggal_pengumuman">Tanggal Pengumuman</label>                    
                        <input type="date" name="tanggal_pengumuman" class="form-control @error('tanggal_pengumuman') is-invalid @enderror" value ="{{ $pengumuman->tanggal_pengumuman }}" id="tanggal_pengumuman" aria-describedby="tanggal_pengumuman" requiredd>
                        @error('tanggal_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror                
                    </div>

                    <div class="form-group">
                        <label for="isi_pengumuman">Isi Pengumuman</label>
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