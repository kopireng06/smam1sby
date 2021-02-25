@extends('layouts.dashboardtemplate')
@section('title')
    <title>Dashboard</title>
@endsection
@section('konten')
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
<div class="main">
    <div class="main-content">
        <div class="container-fluid mb-3 mt-3">
            <div class="row">
                <div class="col-md-12 mb-3">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Data Testimoni Alumni</h1>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mb-3">
                            <div class="d-flex justify-content-start">
                                <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    + Tambah Testimoni
                                </button>                            
                                <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#myModal">
                                    + Import Testimoni
                                </button>
                            </div>
                            <div class="d-flex justify-content-end">
                                <form action="{{ route('testimoni.index') }}" method="GET" role="search">
                                    {{csrf_field()}}
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="search" placeholder="Cari Nama" value="{{ request()->query('search') }}">
                                        <span class="input-group-btn">
                                            <button class="btn btn-primary float-right" type="submit">Search</button>
                                        </span>
                                        <a href="{{ route('testimoni.index') }}">
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-danger px-3"><i class="fas fa-users" aria-hidden="true"></i>Refresh</button>
                                            </span>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>                        
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
                                        <th>Nama</th>
                                        <th width="350px">Isi Testimoni</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($testi as $testi1)
                                        <tr>
                                            <td>{{ $count++ }}</td>
                                            <td>{{ Str::limit($testi1->nama_testi, 40) }}</td>
                                            <td>{!! Str::limit($testi1->isi_testi, 55) !!}</td>
                                            <td>                                       
                                            <form action="{{ route('testimoni.destroy',$testi1->id_testi) }}" method="POST">
                                                <a class="btn btn-warning" href="{{ route('testimoni.show',$testi1->id_testi) }}" >Preview</a>
                            
                                                {{csrf_field()}}
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
                            {{ $testi->links() }}
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
                <h5 class="modal-title" id="staticBackdropLabel">Tambah Data Testimoni</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('testimoni.store') }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group mb-2">
                        <label for="nama_testi"><strong>Nama</strong></label>
                        <input type="text" name="nama_testi" class="form-control @error('nama_testi') is-invalid @enderror" placeholder="Nama" required/>
                        @error('nama_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group mb-2">
                        <label for="jurusan_testi"><strong>Jurusan</strong></label>
                        <input type="text" name="jurusan_testi" class="form-control @error('jurusan_testi') is-invalid @enderror" placeholder="Jurusan" required/>
                        @error('jurusan_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group mb-2">
                        <label for="universitas_testi"><strong>Universitas</strong></label>
                        <input type="text" name="universitas_testi" class="form-control @error('universitas_testi') is-invalid @enderror" placeholder="Universitas" required/>
                        @error('universitas_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group mb-2">
                        <label for="pekerjaan_testi"><strong>Pekerjaan</strong></label>
                        <input type="text" name="pekerjaan_testi" class="form-control @error('pekerjaan_testi') is-invalid @enderror" placeholder="Pekerjaan"/>
                        @error('pekerjaan_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group mb-2">
                        <label for="foto_testi"><strong>Foto Sampul</strong></label>
                        <input type="file" name="foto_testi" class="form-control @error('foto_testi') is-invalid @enderror" onchange="previewFile(this)">
                        @error('foto_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        <img id="previewImg" alt="foto_testi" style="max-width:150px;margin-top:20px;">
                    </div>
                    
                    <div class="form-group mb-2">
                        <label for="isi_testi"><strong>Isi Testimoni</strong></label>
                        <textarea name="isi_testi" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
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

<div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Import Data Testimoni</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/dashboard/testi/import" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group mb-2">
                        <label for="file"><strong>Data Testimoni</strong></label>
                        <input type="file" name="file" class="form-control"/>
                    </div>
                    <a href="https://docs.google.com/uc?export=download&id=15-R54u7hl0N2GJEbbsKiDuARKjzZGaLn" download>Download Format</a>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Import</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
@endsection