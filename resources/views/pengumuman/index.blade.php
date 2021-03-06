@extends('layouts.dashboardtemplate')
@section('title')
    <title>Dashboard</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid mb-3">
            <div class="row">
                <div class="col-md-12 mb-3">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Pengumuman</h1>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mb-3">
                            <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                + Tambah Pengumuman
                            </button>
                            <form action="{{ route('pengumuman.index') }}" method="GET" role="search">
                                {{csrf_field()}}
                                <div class="input-group">
                                    <input type="text" class="form-control" name="search" placeholder="Cari Judul" value="{{ request()->query('search') }}">
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary float-right" type="submit">Search</button>
                                    </span>
                                    <a href="{{ route('pengumuman.index') }}">
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-danger px-3"><i class="fas fa-users" aria-hidden="true"></i>Refresh</button>
                                        </span>
                                    </a>
                                </div>
                            </form>                        
                        </div>                                                 
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
                                    @forelse($pengumuman as $pengumuman1)
                                    <tr>
                                        <td>{{$count++}}</td>
                                        <td>{{ Str::limit($pengumuman1->judul_pengumuman, 40) }}</td>
                                        <td>{!! Str::limit($pengumuman1->isi_pengumuman, 55) !!}</td>
                                        <td>                                       
                                        <form action="{{ route('pengumuman.destroy',$pengumuman1->id_pengumuman) }}" method="POST">
                                            <a class="btn btn-warning" href="{{ route('pengumuman.show',$pengumuman1->id_pengumuman) }}" >Preview</a>
                        
                                            @csrf
                                            @method('DELETE')
                            
                                            <button type="submit" class="btn btn-danger" onclick="return confirm('Yakin mau dihapus?')">Delete</button>
                                        </form>
                                        </td>
                                    </tr>
                                        @empty
                                            <h4 class="text-center">
                                                Tidak ada hasil untuk : <strong>{{ request()->query('search') }}</strong>
                                            </h4>
                                    @endforelse                                   
                                </tbody>
                            </table>
                        </div>
                        <div class="div text-center">
                            {{ $pengumuman ->links() }}
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
                <h5 class="modal-title" id="staticBackdropLabel">Tambah Pengumuman</h5>
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
      
                    <div class="form-group mb-2">
                        <label for="judul_pengumuman"><strong>Judul Pengumuman</strong></label>
                        <input type="text" name="judul_pengumuman" class="form-control @error('judul_pengumuman') is-invalid @enderror" placeholder="Judul Pengumuman" required/>
                        @error('judul_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>
                    
                    <div class="form-group mb-2">
                        <label for="tanggal_pengumuman"><strong>Tanggal Pengumuman</strong></label>                    
                        <input type="date" name="tanggal_pengumuman" class="form-control" id="tanggal_pengumuman" aria-describedby="tanggal_pengumuman" >                
                    </div>

                    <div class="form-group mb-2">
                        <label for="foto_pengumuman"><strong>Foto Sampul</strong></label>
                        <input type="file" name="foto_pengumuman" class="form-control @error('foto_pengumuman') is-invalid @enderror" onchange="previewFile(this)">
                        @error('foto_pengumuman')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        <img id="previewImg" alt="foto_pengumuman" style="max-width:150px;margin-top:20px;">
                    </div> 

                    <div class="form-group mb-2">
                        <label for="isi_pengumuman"><strong>Isi Pengumuman</strong></label>
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