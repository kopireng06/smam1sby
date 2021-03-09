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
                    <div class="panel mb-5">
					    <div class="panel-heading">
                            <h1 class="panel-title">Alumni</h1>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mb-3">                            
                            <a href="/dashboard/alumni/import-alumni" class="btn btn-primary float-right">
                                Import Alumni
                            </a>
                            <form action="{{ route('pengumuman.index') }}" method="GET" role="search">
                                {{csrf_field()}}
                                <div class="input-group">
                                    <input type="text" class="form-control" name="search" placeholder="Cari Nama" value="{{ request()->query('search') }}">
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary float-right" type="submit">Search</button>
                                    </span>
                                    <a href="{{ route('pengumuman.index') }}">
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
                                        <th>No.</th>
                                        <th>Nama</th>
                                        <th>Universitas</th>
                                        <th>Jurusan</th>
                                        <th>Angkatan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @forelse($data_alumni as $alumni)
                                    <tr>
                                        <td>{{$count++}}</td>
                                        <td>{{$alumni->nama_alumni}}</td>
                                        <td>{{$alumni->univ_alumni}}</td>
                                        <td>{{$alumni->jurusan_alumni}}</td>
                                        <td>{{$alumni->angkatan}}</td>

                                        <td>
                                            <a href="/dashboard/alumni/{{$alumni->id_alumni}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/alumni/{{$alumni->id_alumni}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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
                            {{ $data_alumni ->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection