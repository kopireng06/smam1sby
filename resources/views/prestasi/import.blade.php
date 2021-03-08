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
                    <div class="panel">
					    <div class="panel-heading">
                            <h1 class="panel-title">Prestasi</h1>
                        </div>  
                        <a href="{{asset('format')}}/Format Prestasi.xlsx">Download Format File Prestasi</a>
                        <div class="panel-body">
                        <form action="/dashboard/prestasi/import" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                            
                                {{csrf_field()}}
                
                                <div class="form-group">
                                    <label for="file"><strong>Choose File</strong></label>
                                    <input type="file" name="file" class="form-control"/>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Import</button>
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