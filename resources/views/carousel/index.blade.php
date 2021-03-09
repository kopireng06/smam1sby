@extends('layouts.dashboardtemplate')
@section('title')
    <title>Data Carousel</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel mb-4">
					    <div class="panel-heading">
                            <h1 class="panel-title">Carousel</h1>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mb-3">
                            <a href="/dashboard/carousel/create-carousel" class="btn btn-primary float-right">
                                Tambah Carousel
                            </a>
                            <form action="/dashboard/carousel" method="GET" role="search">
                                {{csrf_field()}}
                                <div class="input-group">
                                    <input type="text" class="form-control" name="search" placeholder="Cari Judul" value="{{ request()->query('search') }}">
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary float-right" type="submit">Search</button>
                                    </span>
                                    <a href="/dashboard/carousel">
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-danger px-3"><i class="fas fa-users" aria-hidden="true"></i>Refresh</button>
                                        </span>
                                    </a>
                                </div>
                            </form>                        
                        </div>
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
                        <div class="panel-body">                        
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Foto</th>
                                        <th>Judul</th>
                                        <th>Isi</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>

                                <tbody>
                                @forelse($carousel as $carousel1)
                                    <tr>
                                        <td>{{$count++}}</td>
                                        <td>{{$carousel1->foto_car}}</td>
                                        <td>{{$carousel1->judul_car}}</td>
                                        <td>{{$carousel1->isi_car}}</td>

                                        <td>
                                            <a href="/dashboard/carousel/{{$carousel1->id_car}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/carousel/{{$carousel1->id_car}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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
                            {{ $carousel->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection