@extends('layouts.dashboardtemplate')
@section('title')
    <title>contohadmin</title>
@endsection
@section('konten')
<div class="main">
    <div class="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Edit Data Carousel</h1>
                        </div>
                            
                        <div class="panel-body">
                            
                            <form action="/carousel/{{$carousel->id_car}}/update" method="POST" enctype="multipart/form-data">
                                <div class="modal-body">
                                
                                    {{csrf_field()}}
                    
                                    <div class="form-group">
                                        <label for="file">Choose File Image</label>
                                        <input type="file" name="foto_car" class="form-control" onchange="previewFile(this)" value="{{$carousel->foto_car}}"/>
                                        <img id="previewImg" alt="Image" src="{{$carousel->foto_car}}"style="max-width:130px;margin-top:20px;"/>
                                    </div>

                                    <div class="form-group">
                                        <label for="file">Judul</label>
                                        <input type="text" name="judul_car" class="form-control" value="{{$carousel->judul_car}}" required/>
                                    </div>

                                    <div class="form-group">
                                        <label for="file">Isi</label>
                                        <input type="text" name="isi_car" class="form-control" value="{{$carousel->isi_car}}" required/>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-warning">Save</button>
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