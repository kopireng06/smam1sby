@extends('layouts.dashboardtemplate')
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Tambah Pengumuman</h1>
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
                                    <label for="isi_pengumuman"><strong>Isi Pengumuman</strong></label>
                                    <textarea name="isi_pengumuman" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
                                </div>
                                    <div class="d-flex justify-content-between mt-3 mb-3">
                                        <a href="{{ route('pengumuman.index') }}" class="btn btn-warning float-right">
                                        Kembali </a>
                                        <button type="submit" class="btn btn-primary">Tambah</button>
                                    </div>
                                </div>
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