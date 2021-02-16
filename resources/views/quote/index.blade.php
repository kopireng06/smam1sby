@extends('layouts.dashboardtemplate')
@section('title')
    <title>Dashboard</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 mb-3">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Data Quotes</h1>
                        </div>
                        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            + Tambah Quotes
                        </button>
                        <br>
                        <div class="panel-body">
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
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th width="80px">No.</th>
                                        <th>Nama Tokoh</th>
                                        <th width="300px">Isi Quote</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($quote as $key=>$quote)
                                    <tr>
                                        <td>{{++$key}}</td>
                                        <td>{{ Str::limit($quote->nama_quote, 40) }}</td>
                                        <td>{!! Str::limit($quote->isi_quote, 55) !!}</td>
                                        <td>                                       
                                        <form action="{{ route('quotes.destroy',$quote->id_quote) }}" method="POST">
                                            <a class="btn btn-warning" href="{{ route('quotes.show',$quote->id_quote) }}" >Preview</a>
                        
                                            @csrf
                                            @method('DELETE')
                            
                                            <button type="submit" class="btn btn-danger" onclick="return confirm('Yakin mau dihapus?')">Delete</button>
                                        </form>
                                        </td>
                                    </tr>
                                    @endforeach
                                   
                                </tbody>
                            </table>
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
                <h5 class="modal-title" id="staticBackdropLabel">Tambah Quote</h5>
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
            <form action="{{ route('quotes.store') }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group">
                        <label for="nama_quote">Nama Tokoh</label>
                        <input type="text" name="nama_quote" class="form-control @error('nama_quote') is-invalid @enderror" placeholder="Nama Tokoh" required/>
                        @error('nama_quote')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group">
                        <label for="jabatan_quote">Jabatan Tokoh</label>
                        <input type="text" name="jabatan_quote" class="form-control @error('jabatan_quote') is-invalid @enderror" placeholder="Jabatan Tokoh" required/>
                        @error('jabatan_quote')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group">
                        <label for="foto_quote">Foto Sampul</label>
                        <input type="file" name="foto_quote" class="form-control @error('foto_quote') is-invalid @enderror" onchange="previewFile(this)">
                        @error('foto_quote')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        <img id="previewImg" alt="foto_quote" style="max-width:150px;margin-top:20px;">
                    </div> 

                    <div class="form-group">
                        <label for="isi_quote">Isi Quote</label>
                        <textarea name="isi_quote" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Tambah</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection