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
                    <div class="col-md-12 mb-5">
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
                        <div class="card mb-3" style="width: 56rem;">
                            <img class="card-img-top" src="{{ asset('images/artikel') }}/{{ $artikel->foto_artikel }}" alt="Card image cap" style="max-width:550px;max-height:400px;margin-top:20px;margin-bottom:10px;margin-left:auto;margin-right:auto;">
                            <div class="card-body">
                                <h3 class="card-title" >{{ $artikel->judul_artikel }}</h3>
                                <a class="card-text"><small class="text-muted">{{ $artikel->created_at->diffForHumans() }}</small></a>
                                <b class="card-text"><small class="text-muted">{{ $artikel->user->name }}</small></b>
                                <b class="card-text"><small class="text-muted">{{ $artikel->kategori->nama_kategoriartikel }}</small></b>
                                <br>
                                <p class="card-text">{!! $artikel->isi_artikel !!}</p>
                                <div class="flex-container">
                                    <form action="{{ route('artikel.destroy',$artikel->id_artikel) }}" method="POST">
                                        <button type="button" class="btn btn-warning float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            Edit Artikel
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
                <h5 class="modal-title" id="staticBackdropLabel">Edit Artikel</h5>
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
            <form action="{{ route('artikel.update', $artikel->id_artikel) }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}} {{ method_field('PUT') }}
      
                    <div class="form-group">                        
                        <label for="judul_artikel">Judul Artikel</label>
                        <input type="text" name="judul_artikel" class="form-control @error('judul_artikel') is-invalid @enderror" value= "{{ $artikel->judul_artikel }}" placeholder="Judul Artikel" required/>
                        @error('judul_artikel')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="dropdown">
                        <label for="id_kategoriartikel">Kategori Artikel</label>
                        <select class="form-control" name="id_kategoriartikel" id="id_kategoriartikel">
                            @foreach ($kategori as $kategori)
                            <option value="{{$kategori->id_kategoriartikel}}">{{$kategori->nama_kategoriartikel}}</option> 
                            @endforeach                                                   
                        </select>
                    </div>

                    <div class="form-group mb-3">
                        <label for="foto_artikel">Foto Sampul</label>
                        <input type="file" name="foto_artikel" class="form-control @error('foto_artikel') is-invalid @enderror" onchange="previewFile(this)">
                        @error('foto_artikel')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        <img id="previewImg" alt="foto_artikel" src="{{ asset('images/artikel') }}/{{ $artikel->foto_artikel }}" style="max-width:150px;margin-top:20px;">
                    </div> 

                    <div class="form-group">
                        <label for="isi_artikel">Isi Artikel</label>
                        <textarea name="isi_artikel" class="ckeditor form-control" name="wysiwyg-editor">{{ $artikel->isi_artikel }}</textarea>
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

<script>
    function previewFile(input){
        var file = $("input[type=file]").get(0).files[0];
        if (file){
            var reader = new FileReader();
            reader.onload = function(){
                $('#previewImg').attr("src",reader.result);
            }
            reader.readAsDataURL(file);
        }
    }


</script>
@endsection