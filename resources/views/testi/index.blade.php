@extends('layouts.dashboardtemplate')
@section('title')
    <title>Dashboard</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Data Artikel</h1>
                        </div>
                        <div class="d-flex flex-row">
                            <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                + Tambah Testimoni
                            </button>                            
                            <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#myModal">
                                + Import Testimoni
                            </button>
                        </div>                        
                        <br>
                        <div class="panel-body">
                        @if ($message = Session::get('success'))
                            <div class="alert alert-success">
                                <p>{{ $message }}</p>
                            </div>
                        @endif
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th width="80px">No.</th>
                                        <th>Nama</th>
                                        <th width="300px">Isi Testimoni</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($testi as $key=>$testi)
                                    <tr>
                                        <td>{{++$key}}</td>
                                        <td>{{ Str::limit($testi->nama_testi, 40) }}</td>
                                        <td>{{ Str::limit($testi->isi_testi, 55) }}</td>
                                        <td>                                       
                                        <form action="{{ route('testi.destroy',$testi->id_testi) }}" method="POST">
                                            <a class="btn btn-warning" href="{{ route('testi.show',$testi->id_testi) }}" >Preview</a>
                        
                                            @csrf
                                            @method('DELETE')
                            
                                            <button type="submit" class="btn btn-danger" onclick="return confirm('Yakin mau dihapus?')">Delete</button>
                                        </form>
                                        </td>
                                    </tr>
                                    @endforeach
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Import Data Testimoni</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/dashboard/testi/import" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                
                    {{csrf_field()}}
      
                    <div class="form-group">
                        <label for="file">Data Testimoni</label>
                        <input type="file" name="file" class="form-control"/>
                    </div>
                    <a href="https://drive.google.com/file/d/1AzWCoz1mwNtQ06GZg6YKPbSuR4B3Ll8f/view?usp=sharing" download>Download Format</a>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Import</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection