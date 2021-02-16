@extends('layouts.dashboardtemplate')
@section('title')
    <title>Dashboard</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Data Pengumuman</h1>
                        </div>
                        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            + Tambah Pengumuman
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
                                        <th>Judul Pengumuman</th>
                                        <th width="300px">Isi Pengumuman</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($pengumuman as $key=>$pengumuman)
                                    <tr>
                                        <td>{{++$key}}</td>
                                        <td>{{ Str::limit($pengumuman->judul_pengumuman, 40) }}</td>
                                        <td>{!! Str::limit($pengumuman->isi_pengumuman, 55) !!}</td>
                                        <td>                                       
                                        <form action="{{ route('pengumuman.destroy',$pengumuman->id_pengumuman) }}" method="POST">
                                            <a class="btn btn-warning" href="{{ route('pengumuman.show',$pengumuman->id_pengumuman) }}" >Preview</a>
                        
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
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Tambah Data Pengumuman</h5>
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
            <form action="{{ route('pengumuman.store') }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group">
                        <label for="judul_pengumuman">Judul Pengumuman</label>
                        <input type="text" name="judul_pengumuman" class="form-control @error('judul_pengumuman') is-invalid @enderror" placeholder="Judul Pengumuman" required/>
                        @error('judul_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>
                    
                    <div class="form-group">
                        <label for="tanggal_pengumuman">Tanggal Pengumuman</label>                    
                        <input type="date" name="tanggal_pengumuman" class="form-control" id="tanggal_pengumuman" aria-describedby="tanggal_pengumuman" >                
                    </div>

                    <div class="form-group">
                        <label for="foto_pengumuman">Foto Sampul</label>
                        <input type="file" name="foto_pengumuman" class="form-control @error('foto_pengumuman') is-invalid @enderror" onchange="previewFile(this)">
                        @error('foto_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        <img id="previewImg" alt="foto_pengumuman" style="max-width:150px;margin-top:20px;">
                    </div> 

                    <div class="form-group">
                        <label for="isi_pengumuman">Isi Pengumuman</label>
                        <textarea name="isi_pengumuman" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
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