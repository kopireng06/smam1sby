@extends('layouts.preview')
@section('title')
    <title>Data Konten</title>
@endsection
@section('konten')
<section class="section single-wrapper">
<style>
.section
{
    width: 900px;
    margin-left: 150px;
    margin-right: 0px;
    margin-top : 0px;
}

p 
{
  text-align: justify;
  text-justify: inter-word;
}
</style>
    <div class="container mb-5">
        <div class="row">            
            <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                <div class="page-wrapper">
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
                    <div class="blog-title-area text-center">
                        <h3>{{ $testi->nama_testi }}</h3>

                        <div class="blog-meta big-meta">
                            <small><a>{{ $testi->created_at->diffForHumans() }}</a></small>
                            <small><a>by : {{ $testi->user->name }}</a></small>
                        </div><!-- end meta -->

                    </div><!-- end title -->

                    <div class="single-post-media">
                        <img class="card-img-top" src="{{ asset('images/testimoni') }}/{{ $testi->foto_testi }}" alt="Card image cap" style="max-width:550px;max-height:400px;margin-top:20px;margin-bottom:10px;margin-left:auto;margin-right:auto;">
                    </div><!-- end media -->

                    <div class="blog-content">
                        <div class="pp">
                            <p> {!! $testi->isi_testi !!}</p>
                    </div><!-- end content -->

                    <div class="blog-title-area">
                        <div class="tag-cloud-single">
                            <span>Tags</span>
                            <small><a href="#" title="">Testimoni</a></small>
                        </div><!-- end meta -->                                
                    </div><!-- end title -->
                    <br>
                    <form action="{{ route('testimoni.destroy',$testi->id_testi) }}" method="POST">
                        <button type="button" class="btn btn-warning float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Edit Testimoni
                        </button>
                        @csrf
                        @method('DELETE')

                        <button type="submit" class="btn btn-danger" onclick="return confirm('Yakin mau dihapus?')">Delete</button>
                    </form>
                </div><!-- end page-wrapper -->
            </div><!-- end col -->
        </div><!-- end row -->
    </div><!-- end container -->
</section>

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
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
            <form action="{{ route('testimoni.update', $testi->id_testi) }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}} {{ method_field('PUT') }}

                    <div class="form-group mb-2">
                        <label for="nama_testi"><strong>Nama</strong></label>
                        <input type="text" name="nama_testi" class="form-control @error('nama_testi') is-invalid @enderror" value="{{ $testi->nama_testi}}" required/>
                        @error('nama_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group mb-2">
                        <label for="jurusan_testi"><strong>Jurusan</strong></label>
                        <input type="text" name="jurusan_testi" class="form-control @error('jurusan_testi') is-invalid @enderror" value="{{ $testi->jurusan_testi}}" required/>
                        @error('jurusan_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group mb-2">
                        <label for="universitas_testi"><strong>Universitas</strong></label>
                        <input type="text" name="universitas_testi" class="form-control @error('universitas_testi') is-invalid @enderror" value="{{ $testi->universitas_testi}}" required/>
                        @error('universitas_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="form-group mb-2">
                        <label for="pekerjaan_testi"><strong>Pekerjaan</strong></label>
                        <input type="text" name="pekerjaan_testi" class="form-control @error('pekerjaan_testi') is-invalid @enderror" value="{{ $testi->pekerjaan_testi}}"/>
                        @error('pekerjaan_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>
                    
                    <div class="form-group mb-2">
                        <label for="foto_testi"><strong>Foto Sampul</strong></label>
                        <input type="file" name="foto_testi" class="form-control @error('foto_testi') is-invalid @enderror" onchange="previewFile(this)">
                        @error('foto_testi')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        <img id="previewImg" alt="foto_testi" src="{{ asset('images/testimoni') }}/{{ $testi->foto_testi }}" style="max-width:150px;margin-top:20px;">
                    </div>

                    <div class="form-group mb-2">
                        <label for="isi_testi"><strong>Isi Testimoni</strong></label>
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