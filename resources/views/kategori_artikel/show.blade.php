@extends('layouts.dashboardtemplate')
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Edit Kategori Artikel</h1>
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
                        <form action="{{ route('kategori-artikel.update', $kategori->id_kategoriartikel) }}" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">                    
                                {{csrf_field()}} {{ method_field('PUT') }}                
                                <div class="form-group">
                                    <label for="nama_kategoriartikel"><strong>Kategori Artikel</strong></label>
                                    <input type="text" name="nama_kategoriartikel" class="form-control @error('nama_kategoriartikel') is-invalid @enderror" value="{{ $kategori->nama_kategoriartikel }}" required/>
                                    @error('nama_kategoriartikel')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                </div>
                            </div>
                            <div class="d-flex justify-content-between mt-3 mb-3">
                                <a href="{{ route('kategori-artikel.index') }}" class="btn btn-warning float-right">
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