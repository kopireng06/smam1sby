<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{asset('css/admin.css')}}">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        @yield('title')
    </head>
    <body class="w-100" style="overflow-x-hidden">
        <div class="d-flex flex-nowrap flex-row">
            <div class="spacer-sidebar"></div>
            <div class="flex-grow-1">
                <div class="w-100">
                    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow">
                        <div class="container-fluid d-flex justify-content-between">
                        <a class="navbar-brand" href="#">
                            <img src="{{asset('image/logo-sma.png')}}" style="width:125px;">
                        </a>
                        <button class="navbar-toggler" type="button">
                            <span class="navbar-toggler-icon is-closed"></span>
                        </button> 
                        </div>
                    </nav>
                </div>
                <div class="w-90 shadow-sm p-4 rounded mx-auto mt-5">
                    @yield('konten')
                </div>
            </div>
        </div>
        <div class="sidebar px-3 vh-100">
            <div class="w-100 d-flex flex-column" style="margin-top:30px;" >
                <a href="/dashboard" class="menu arialrounded-mt-bold my-2 d-block">
                    DASHBOARD
                </a>
                <a href="/alumni" class="menu arialrounded-mt-bold my-1 d-block">
                    Alumni
                </a>
                <a href="/konten" class="menu arialrounded-mt-bold my-1 d-block">
                    Konten
                </a>
                <a href="/kelompok-konten" class="menu arialrounded-mt-bold my-1 d-block">
                    Kelompok Konten
                </a>
                <a href="/prestasi" class="menu arialrounded-mt-bold my-1 d-block">
                    Prestasi
                </a>
                <a href="/carousel" class="menu arialrounded-mt-bold my-1 d-block">
                    Caraousel
                </a>
                <a href="/web-terkait" class="menu arialrounded-mt-bold my-1 d-block">
                    Web Terkait
                </a>
                <a href="/dashboard/artikel" class="menu arialrounded-mt-bold my-1 d-block">
                    Artikel
                </a>
                <a href="/dashboard/kategori_artikel" class="menu arialrounded-mt-bold my-1 d-block">
                    Kategori Artikel
                </a>
                <a href="/dashboard/pengumuman" class="menu arialrounded-mt-bold my-1 d-block">
                    Pengumuman
                </a>
                <a href="/dashboard/quotes" class="menu arialrounded-mt-bold my-1 d-block">
                    Quote
                </a>
                <a href="/dashboard/testi" class="menu arialrounded-mt-bold my-1 d-block">
                    Testimoni
                </a>
            </div>
        </div>
        <div class="footer py-2">
            Copyright SMA Muhammadiyah 1 Surabaya,2020.
        </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script>
        $( document ).ready(function() {
            $('.navbar-toggler').click(function(){
                    $(".sidebar").toggleClass("sidebar-x");
                    $(".spacer-sidebar").toggleClass("w-250px");
            });
        });
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script language="javascript">
        $("#checkAll").click(function () {
            $('input:checkbox').not(this).prop('checked', this.checked);
        });
    </script>
    <script src="{{ asset('js/vendors.js') }}"></script>
    <script type="text/javascript">
    $(document).ready(function () {

        let img_array = [];

        ClassicEditor
                    .create(document.querySelector('.ckeditor'), {
                        // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
                        simpleUpload: {
                            uploadUrl: {
                                url: "{{ route('artikel-upload-image', ['_token' => csrf_token()]) }}"
                            }
                        }
                    })
                    .then(editor => {
                        let editorModel = editor.model;
                        let editorDocument = editorModel.document;

                        editorDocument.on('change:data', (event) => {
                            let root = editorDocument.getRoot();
                            let children = root.getChildren();

                            let img_temp = [];

                            for (let child of children) {
                                if (child.is('image')) {
                                    let img = child._attrs.get('src');
                                    if (img) {
                                        console.log(img);
                                        img_temp.push(img);
                                    }
                                }
                            }

                            img_array.forEach(value => {
                                if (img_temp.indexOf(value) !== -1) {
                                    //Exist
                                } else {
                                    //Doesnt Exist
                                    $.post("{{ route('artikel-delete-image') }}", {
                                        url: value,
                                        _token: "{{ csrf_token() }}"
                                    });
                                    console.log("DELETE " + value);
                                }
                            });

                            img_array = img_temp;

                            var articleText = editor.getData();
                        });

                        window.editor = editor;

                    })
                    .catch(err => {
                        console.error(err.stack);
                    });
    });
    </script>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <script>
        function previewFile(input){
            var file = $("input[type=file]").get(0).files[0];
            if (file){
                var reader = new FileReader();
                reader.onload = function(){
                    $('#previewImg').attr("src",reader.result);
                }
                reader.readAsDataURL(file);
            }
        }


    </script>


    <script type="text/javascript">
    // CKEDITOR.replace('wysiwyg-editor', {
    //     filebrowserUploadUrl: "{{route('ckeditor.image-upload', ['_token' => csrf_token() ])}}",
    //     filebrowserUploadMethod: 'form'
    // });
    </script>
</html>