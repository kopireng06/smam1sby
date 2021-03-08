@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Alumni</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Konten</h1>
                        </div>  
                        <div class="panel-body">
                        <form action="/dashboard/konten/create" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                            
                                {{csrf_field()}}
                
                                <div class="form-group">
                                    <label for="file"><strong>Judul Konten</strong></label>
                                    <input type="text" name="judul_konten" class="form-control" placeholder="Judul Konten" required/>
                                </div>
                                
                                <div class="dropdown">
                                    <label for="file">Kelompok Konten</label>
                                    <select name="kelompok_konten" class="form-control" id="exampleFormControlSelect1" required>
                                        <option selected disabled>Choose One</option>
                                        @foreach ($kelkonten as $kelkonten)
                                            <option value="{{$kelkonten->nama_kelompok_konten}}">{{$kelkonten->nama_kelompok_konten}}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="file">Isi Konten</label>
                                    <textarea name="isi_konten" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Tambah</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        
@endsection