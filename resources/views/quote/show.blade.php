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
                                <h3 class="card-title" >{{ $quote->nama_quote }}</h3>
                                <a class="card-text"><small class="text-muted">{{ $quote->created_at }}</small></a>
                                <br>
                                <p class="card-text">{{ $quote->isi_quote }}</p>
                                <div class="flex-container">
                                    <form action="{{ route('quotes.destroy',$quote->id_quote) }}" method="POST">
                                        <button type="button" class="btn btn-warning float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            Edit Quote
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
                <h5 class="modal-title" id="staticBackdropLabel">Edit Quote</h5>
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
            <form action="{{ route('quotes.update', $quote->id_quote) }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}} {{ method_field('PUT') }}
      
                    <div class="form-group">                        
                        <label for="nama_quote">Nama Tokoh</label>
                        <input type="text" name="nama_quote" class="form-control @error('nama_quote') is-invalid @enderror" value= "{{ $quote->nama_quote }}" required/>
                        @error('nama_quote')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group">
                        <label for="jabatan_quote">Jabatan Tokoh</label>
                        <input type="text" name="jabatan_quote" class="form-control @error('jabatan_quote') is-invalid @enderror" value= "{{ $quote->jabatan_quote }}" placeholder="Jabatan Tokoh" required/>
                        @error('jabatan_quote')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group">
                        <label for="isi_quote">Isi Quote</label>
                        <textarea name="isi_quote" class="ckeditor form-control" name="wysiwyg-editor">{{ $quote->isi_quote }}</textarea>
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