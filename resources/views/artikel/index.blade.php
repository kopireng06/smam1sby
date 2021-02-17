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
                            <h1 class="panel-title">Data Artikel</h1>
                        </div>
                        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            + Tambah Artikel
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
                                        <th>No.</th>
                                        <th>Judul Artikel</th>
                                        <th>Isi Artikel</th>                                        
                                        <th>Kategori<th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($artikel as $key=>$artikel1)
                                    <tr>
                                        <td>{{++$key}}</td>
                                        <td>{{ Str::limit( $artikel1->judul_artikel, 20 ) }}</td>
                                        <td>{!! Str::limit( $artikel1->isi_artikel, 30  ) !!}</td>
                                        <td>{{ $artikel1->kategori->nama_kategoriartikel }}</td>
                                        <td>                                       
                                        <form action="{{ route('artikel.destroy',$artikel1->id_artikel) }}" method="POST">
                                            <a class="btn btn-warning" href="{{ route('artikel.show',$artikel1->id_artikel) }}" >Preview</a>
                        
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
                <h5 class="modal-title" id="staticBackdropLabel">Tambah Data Kategori Artikel</h5>
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
            <form action="{{ route('artikel.store') }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group">
                        <label for="judul_artikel">Judul Artikel</label>
                        <input type="text" name="judul_artikel" class="form-control @error('judul_artikel') is-invalid @enderror" placeholder="Judul Artikel" required/>
                        @error('judul_artikel')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>
                    
                    <div class="dropdown">
                        <label for="id_kategoriartikel">Kategori Artikel</label>
                        <select class="form-control" name="id_kategoriartikel" id="id_kategoriartikel">
                            <option selected disabled>Pilih Kategori Artikel...</option>
                            @foreach ($kategori as $kategori)
                            <option value="{{$kategori->id_kategoriartikel}}">{{$kategori->nama_kategoriartikel}}</option> 
                            @endforeach                                                   
                        </select>
                    </div>

                    <div class="form-group mb-3">
                        <label for="foto_artikel">Foto Sampul</label>
                        <input type="file" name="foto_artikel" class="form-control @error('foto_artikel') is-invalid @enderror" onchange="previewFile(this)">
                        @error('foto_artikel')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        <img id="previewImg" alt="foto_artikel" style="max-width:150px;margin-top:20px;">
                    </div> 

                    <div class="form-group">
                        <label for="isi_artikel">Isi Artikel</label>
                        <textarea name="isi_artikel" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
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