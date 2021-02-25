@extends('layouts.dashboardtemplate')
@section('title')
    <title>Dashboard</title>
@endsection
@section('konten')

<div class="d-flex justify-content-start mt-3 mb-3">
    <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        + Tambah Kategori Artikel
    </button>
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

<table class="table table-bordered">
    <tr>
        <th>No. </th>
        <th>Kategori Artikel</th>
        <th >Aksi</th>
    </tr>
    @foreach ($kat as $kategori)
    <tr>
        <td class="text-center">{{ $loop->iteration }}</td>
        <td>{{ $kategori->nama_kategoriartikel }}</td>
        <td class="text-center">
            <form action="{{ route('kategori-artikel.destroy',$kategori->id_kategoriartikel) }}" method="POST"> 
                <button type="button" class="btn btn-warning float-right" data-bs-toggle="modal" data-bs-target="#myModal">
                    Edit
                </button>
                @csrf
                @method('DELETE')

                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Yakin mau dihapus?')">Delete</button>
            </form>
        </td>
    </tr>
    @endforeach
</table>

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Tambah Data Kategori Artikel</h5>
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
            <form action="{{ route('kategori-artikel.store') }}" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group">
                        <label for="nama_kategoriartikel">Kategori Artikel</label>                        
                        <input type="text" name="nama_kategoriartikel" class="form-control @error('nama_kategoriartikel') is-invalid @enderror" placeholder="Nama Kategori Artikel" required/>
                        @error('nama_kategoriartikel')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Tambah</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Edit Kategori Artikel</h5>
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
            <form action="{{ route('kategori-artikel.update', $kat->id_kategoriartikel) }} " method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}} {{ method_field('PUT') }}
      
                    <div class="form-group">
                        <label for="nama_kategoriartikel">Kategori Artikel</label>
                        <input type="text" name="nama_kategoriartikel" class="form-control" value="{{$kat->nama_kategoriartikel}}"/>
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