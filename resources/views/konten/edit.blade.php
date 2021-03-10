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
                        
                                        <div class="dropdown">
                                            <label for="file"><strong>Kelompok Konten</strong></label>
                                            <select name="kelompok_konten" class="form-control" id="exampleFormControlSelect1" required>
                                            @if($konten->kelompok_konten == 'Ekstrakurikuler')
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Email">Email</option>
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Profil">Profil</option>
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Youtube">Youtube</option>
                                            @elseif($konten->kelompok_konten == 'Email')
                                                <option value="Email">Email</option>
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Profil">Profil</option>
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Youtube">Youtube</option>
                                            @elseif($konten->kelompok_konten == 'Fasilitas')
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Email">Email</option>
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Profil">Profil</option>
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Youtube">Youtube</option>
                                            @elseif($konten->kelompok_konten == 'Lokasi')
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Email">Email</option>
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Profil">Profil</option>
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Youtube">Youtube</option>
                                            @elseif($konten->kelompok_konten == 'Pop Up')
                                                <option value="Profil">Profil</option>
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Email">Email</option>
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Profil">Profil</option>
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Youtube">Youtube</option>
                                            @elseif($konten->kelompok_konten == 'Profil')
                                                <option value="Profil">Profil</option>
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Email">Email</option>
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Youtube">Youtube</option>
                                            @elseif($konten->kelompok_konten == 'Profil Footer')
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Email">Email</option>
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Profil">Profil</option>
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Youtube">Youtube</option>
                                            @elseif($konten->kelompok_konten == 'Program Unggulan')
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Email">Email</option>
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Profil">Profil</option>
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Youtube">Youtube</option>
                                            @elseif($konten->kelompok_konten == 'WhatsApp')
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Email">Email</option>
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Profil">Profil</option>
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="Youtube">Youtube</option>
                                            @elseif($konten->kelompok_konten == 'Youtube')
                                                <option value="Youtube">Youtube</option>
                                                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                                <option value="Email">Email</option>
                                                <option value="Fasilitas">Fasilitas</option>
                                                <option value="Lokasi">Lokasi</option>
                                                <option value="Profil">Profil</option>
                                                <option value="Profil Footer">Profil Footer</option>
                                                <option value="Program Unggulan">Program Unggulan</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                            @endif
                                            </select>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="file"><strong>Judul Konten</strong></label>
                                            <input type="text" name="judul_konten" class="form-control" value="{{$konten->judul_konten}}"/>
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