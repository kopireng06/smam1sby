@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Konten</title>
@endsection
    @section('konten')
    <style>
        h2 {text-align: center;}
        h5 {text-align: right;}
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
                                <h2 class="card-title" >{{ $testi->nama_testi }}</h2>
                                <h5 class="card-text" >Creator : {{ $testi->user->name }}</h5>                                
                                <br>
                                <p class="card-text">{{ $testi->isi_testi }}</p>
                                <div class="flex-container">
                                    <form action="{{ route('testi.destroy',$testi->id_testi) }}" method="POST">
                                        <button type="button" class="btn btn-warning float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            Edit Testimoni
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
                <h5 class="modal-title" id="staticBackdropLabel">Edit Testimoni</h5>
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
            <form action="{{ route('testi.update', $testi->id_testi) }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}} {{ method_field('PUT') }}

                    <div class="form-group">
                        <label for="nama_testi">Nama Tokoh</label>
                        <input type="text" name="nama_testi" class="form-control @error('nama_testi') is-invalid @enderror" value="{{ $testi->nama_testi}}" required/>
                        @error('nama_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group">
                        <label for="isi_testi">Isi Testimoni</label>
                        <textarea name="isi_testi" class="ckeditor form-control" name="wysiwyg-editor">{{ $testi->isi_testi}}</textarea>
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