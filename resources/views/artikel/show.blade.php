@extends('layouts.dashboardtemplate')
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel mb-4">
					    <div class="panel-heading">
                            <h1 class="panel-title">Edit Artikel</h1>
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
                        <form action="{{ route('artikel.update', $artikel->id_artikel) }}" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                            
                                {{csrf_field()}} {{ method_field('PUT') }}
                
                                <div class="form-group mb-2">
                                    <label for="judul_artikel"><strong>Judul Artikel</strong></label>
                                    <input type="text" name="judul_artikel" class="form-control @error('judul_artikel') is-invalid @enderror" value= "{{ $artikel->judul_artikel }}" placeholder="Judul Artikel" required/>
                                    @error('judul_artikel')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                </div>

                                <div class="dropdown mb-2">
                                    <label for="id_kategoriartikel"><strong>Kategori Artikel</strong></label>
                                    <select class="form-control" name="id_kategoriartikel" id="id_kategoriartikel">
                                        @foreach ($kategori as $kategori)
                                        <option value="{{$kategori->id_kategoriartikel}}">{{$kategori->nama_kategoriartikel}}</option> 
                                        @endforeach                                                   
                                    </select>
                                </div>

                                <div class="form-group mb-2">
                                    <label for="foto_artikel"><strong>Foto Sampul</strong></label>
                                    <input type="file" name="foto_artikel" class="form-control @error('foto_artikel') is-invalid @enderror" onchange="previewFile(this)">
                                    @error('foto_artikel')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                    <img id="previewImg" alt="foto_artikel" src="{{ asset('images/artikel') }}/{{ $artikel->foto_artikel }}" style="max-width:150px;margin-top:20px;">
                                </div> 

                                <div class="form-group mb-2">
                                    <label for="isi_artikel"><strong>Isi Artikel</strong></label>
                                    <textarea name="isi_artikel" class="ckeditor form-control" name="wysiwyg-editor">{{ $artikel->isi_artikel }}</textarea>
                                </div>

                            </div>
                            <div class="d-flex justify-content-between mt-3 mb-3">
                                <a href="{{ route('artikel.index') }}" class="btn btn-warning float-right">
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