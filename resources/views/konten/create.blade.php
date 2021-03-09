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

                                <div class="dropdown">
                                    <label for="file">Kelompok Konten</label>
                                    <select name="kelompok_konten" class="form-control" id="exampleFormControlSelect1" required>
                                        <option selected disabled>Choose One</option>
                                        <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                        <option value="Email">Email</option>
                                        <option value="Fasilitas">Fasilitas</option>
                                        <option value="Lokasi">Lokasi</option>
                                        <option value="Profil">Profil</option>
                                        <option value="Profil Footer">Profil Footer</option>
                                        <option value="Program Unggulan">Program Unggulan</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                        <option value="Youtube">Youtube</option>
                                    </select>
                                </div>
                
                                <div class="form-group">
                                    <label for="file"><strong>Judul Konten</strong></label>
                                    <input type="text" name="judul_konten" class="form-control" placeholder="Judul Konten" required/>
                                </div>

                                <div class="form-group">
                                    <label for="file">Isi Konten</label>
                                    <textarea name="isi_konten" class="ckeditor form-control" name="wysiwyg-editor"></textarea>
                                </div>

                            </div>
                            <div class="d-flex justify-content-between mt-3 mb-3">
                                <a href="/dashboard/konten" class="btn btn-warning float-right">
                                Kembali </a>
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