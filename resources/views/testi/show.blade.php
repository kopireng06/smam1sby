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
    <div class="container">
        <div class="row">
            <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                <div class="page-wrapper">
                    <div class="blog-title-area text-center">
                        <h3>{{ $testi->nama_testi }}</h3>

                        <div class="blog-meta big-meta">
                            <small><a>{{ $testi->created_at->todatestring() }}</a></small>
                            <small><a>by : {{ $testi->user->name }}</a></small>
                        </div><!-- end meta -->

                    </div><!-- end title -->

                    <div class="single-post-media">
                        <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Nahdlatul_Ulama.jpg/1200px-Flag_of_Nahdlatul_Ulama.jpg" alt="Card image cap" width="600px" height="400px">
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
                </div><!-- end page-wrapper -->
            </div><!-- end col -->
        </div><!-- end row -->
    </div><!-- end container -->
</section>

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