@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Konten</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel mb-5">
					    <div class="panel-heading">
                            <h1 class="panel-title">Konten</h1>
                        </div>                        
                        <div class="d-flex justify-content-between mt-3 mb-3">
                            <a href="/dashboard/konten/create-konten" class="btn btn-primary float-right">
                                Tambah Konten
                            </a>
                            <form action="/dashboard/konten" method="GET" role="search">
                                {{csrf_field()}}
                                <div class="input-group">
                                    <input type="text" class="form-control" name="search" placeholder="Cari Judul" value="{{ request()->query('search') }}">
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary float-right" type="submit">Search</button>
                                    </span>
                                    <a href="/dashboard/konten">
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
                                        <th width="20px">No.</th>
                                        <th>Judul Konten</th>
                                        <th>Kelompok Konten</th>
                                        <th>Isi Konten</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($konten as $konten1)
                                    <tr>
                                        <td>{{$count++}}</td>
                                        <td>{{ Str::limit($konten1->judul_konten,40) }}</td>
                                        <td>{{$konten1->kelkonten->nama_kelompok_konten}}</td>
                                        <td>{!! Str::limit($konten1->isi_konten,50) !!}</td>

                                        <td>
                                            <a href="/dashboard/konten/{{$konten1->id_konten}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/konten/{{$konten1->id_konten}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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
                            {{ $konten ->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection