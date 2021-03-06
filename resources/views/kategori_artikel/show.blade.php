@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Konten</title>
@endsection
@section('konten')

<style>
    p { 
    text-align:justify;
    margin-left: auto;
    margin-right: auto;
    }
</style>
<div class="main-content">
    <div class="container">
        <div class="row">
            <div class="col-md-12 mb-5">
                <div class="card">
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
                    <div class="card-header">
                        Kata Alumni
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                        <p>{{ $kategori->nama_kategoriartikel }}</p>
                        </blockquote>
                    </div>                        
                </div>
                <div class="d-flex justify-content-end mt-3">
                    <form action="{{ route('kategori-artikel.destroy',$kategori->id_kategoriartikel) }}" method="POST">
                        <button type="button" class="btn btn-warning float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Edit
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

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Edit Kategori Artikel</h5>
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
            <form action="{{ route('kategori-artikel.update', $kategori->id_kategoriartikel) }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                    
                    {{csrf_field()}} {{ method_field('PUT') }}
    
                    <div class="form-group">
                        <label for="nama_kategoriartikel">Kategori Artikel</label>                        
                        <input type="text" name="nama_kategoriartikel" class="form-control @error('nama_kategoriartikel') is-invalid @enderror" value="{{ $kategori->nama_kategoriartikel }}" required/>
                        @error('nama_kategoriartikel')<div class="invalid-feedback">{{ $message }}</div>@enderror
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