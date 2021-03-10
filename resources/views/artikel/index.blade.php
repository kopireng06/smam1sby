@extends('layouts.dashboardtemplate')
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid mb-3">
            <div class="row">
                <div class="col-md-12 mb-3">
                    <div class="panel mb-5">
					    <div class="panel-heading">
                            <h1 class="panel-title">Artikel</h1>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mb-3">
                            <a href="{{ route('artikel.create') }}" class="btn btn-primary float-right">
                                Tambah Artikel
                            </a>
                            <form action="{{ route('artikel.index') }}" method="GET" role="search">
                                {{csrf_field()}}
                                <div class="input-group">
                                    <input type="text" class="form-control" name="search" placeholder="Cari Judul" value="{{ request()->query('search') }}">
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary float-right" type="submit">Search</button>
                                    </span>
                                    <a href="{{ route('artikel.index') }}">
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
                                        <th>Judul Artikel</th>
                                        <th>Isi Artikel</th>                                        
                                        <th>Kategori</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($artikel as $artikel1)
                                        <tr>
                                            <td>{{ $count++ }}</td>
                                            <td>{{ Str::limit( $artikel1->judul_artikel, 20 ) }}</td>
                                            <td>{{Str::limit( $artikel1->isi_artikel, 30  )}}</td>
                                            <td>{{ $artikel1->kategori->nama_kategoriartikel }}</td>
                                            <td>
                                                <form action="{{ route('artikel.destroy',$artikel1->id_artikel) }}" method="POST">                                             
                                                    <a class="btn btn-warning" href="{{ route('artikel.show',$artikel1->id_artikel) }}" >Edit</a>
                                                    @csrf
                                                    @method('DELETE')
                                    
                                                    <button type="submit" class="btn btn-danger" onclick="return confirm('Yakin mau dihapus?')">Delete</button>
                                                </form>
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
                            {{ $artikel->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection