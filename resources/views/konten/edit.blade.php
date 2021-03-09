@extends('layouts.dashboardtemplate')
    @section('konten')
    <div class="main">
        <div class="main-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="panel">
                            <div class="panel-heading">
                                <h1 class="panel-title">Edit Konten</h1>
                            </div>
                                
                            <div class="panel-body">
                                <form action="/dashboard/konten/{{$konten->id_konten}}/update " method="POST" enctype="multipart/form-data">
                                    <div class="modal-body">
                                    
                                        {{csrf_field()}}
                        
                                        <div class="form-group">
                                            <label for="file"><strong>Judul Konten</strong></label>
                                            <input type="text" name="judul_konten" class="form-control" value="{{$konten->judul_konten}}"/>
                                        </div>
                                        
                                        <div class="dropdown">
                                            <label for="file"><strong>Kelompok Konten</strong></label>
                                            <select name="kelompok_konten" class="form-control" id="exampleFormControlSelect1" required>
                                                <option selected disabled>Choose One</option>
                                                <option value="ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="fasilitas">Fasilitas</option>
                                                <option value="profil">Profil</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="file"><strong>Isi Konten</strong></label>
                                            <textarea name="isi_konten" class="ckeditor form-control" name="wysiwyg-editor">{{$konten->isi_konten}}</textarea>
                                        </div>

                                    </div>
                                    <div class="d-flex justify-content-between mt-3 mb-3">
                                        <a href="/dashboard/konten" class="btn btn-warning float-right">
                                        Kembali </a>
                                        <button type="submit" class="btn btn-primary">Simpan</button>
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