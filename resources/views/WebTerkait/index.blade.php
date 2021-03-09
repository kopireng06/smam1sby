@extends('layouts.dashboardtemplate')
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel mb-5">
					    <div class="panel-heading">
                            <h1 class="panel-title">Website Terkait</h1>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mb-3">
                            <a href="/dashboard/web-terkait/create-web-terkait" class="btn btn-primary float-right">
                                Tambah Website Terkait
                            </a>
                            <form action="/dashboard/web-terkait" method="GET" role="search">
                                {{csrf_field()}}
                                <div class="input-group">
                                    <input type="text" class="form-control" name="search" placeholder="Cari Nama Website" value="{{ request()->query('search') }}">
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary float-right" type="submit">Search</button>
                                    </span>
                                    <a href="/dashboard/web-terkait">
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
                                        <th>Nama Website</th>
                                        <th>Link Website</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @forelse($web_terkait as $web)
                                    <tr>
                                        <td>{{$count++}}</td>
                                        <td>{{$web->nama_web}}</td>
                                        <td>{{$web->link_web}}</td>

                                        <td>
                                            <a href="/dashboard/web-terkait/{{$web->id_web}}/edit" class="btn btn-warning btn-sm">Edit</a>
                                            <a href="/dashboard/web-terkait/{{$web->id_web}}/delete" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</a>
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
                        {{ $web_terkait ->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
