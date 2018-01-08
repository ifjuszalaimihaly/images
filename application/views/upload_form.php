<html>
<head>
    <title>Upload Form</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <style>
        .example {
            padding: 10px;
            border: 1px solid #ccc;
        }

        #dropzone {
            border: 2px dashed #bbb;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            padding: 25px;
            text-align: center;
            font: 20pt bold;
            color: #bbb;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="example row">
        <div id="dropzone">Drop files here</div>
    </div>
    <div style="display: none" class="progress row">
        <div class="progress-bar progress-bar-striped active" role="progressbar"
             aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%; display: none">
            40%
        </div>
    </div>
    <div class="row gallery"></div>
</div>
<script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script>
    var progressContainer = $('.progress');
    var progressbar = $('.progress-bar');
    loadImageList('all');

    function upload(file) {
        var formData = new FormData();
        formData.append('file', file);
        $.ajax({
            url: window.location.href + '/do_upload',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'post',
            xhr: function () {
                var xhr = null;
                if (window.ActiveXObject) {
                    xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
                }
                else {
                    xhr = new window.XMLHttpRequest();
                }
                progressContainer.show();
                progressbar.show();
                xhr.upload.addEventListener("progress", countProgress, false);
                return xhr;
            },
            success: function () {
                //alert('success');
            },
            error: function (result) {
                alert('error');
                console.log(result);
            }
        }).done(function () {
            console.log('done');
            setTimeout(function () {
                showProgress(0);
                progressContainer.hide();
                progressbar.hide();

            }, 2500);
        });
    };

    function countProgress(evt) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round((evt.loaded * 100) / evt.total);
            showProgress(percentComplete);
            console.log('Uploaded percent', percentComplete);
        }
    }

    function showProgress(percent) {
        progressbar.attr('aria-valuenow', percent);
        progressbar.css('width', percent + '%');
        progressbar.text(percent + '%')
    }

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.
        console.log(files.length);
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            console.log(f);
            upload(f);
        }
    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    // Setup the dnd listeners.
    var dropZone = document.getElementById('dropzone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    function loadImageList(type) {
        $.ajax({
            url: window.location.href + '/list_uploads',
            data: {},
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                console.log('success');
            }
        }).done(function (result) {
            var imageList = JSON.parse(result);
            var array = $.map(imageList, function (value, index) {
                return [value];
            });
            showImages(array,type);
        });
    }
    
    function showImage(parent,image) {
        var src = window.location.origin +'/images/uploads/'+ image;
        var galleryRow = $('<div class="col-md-4">'+
            '<div class="thumbnail" >'+
            '<a href="'+src+'" target="_blank">'+
            '<img src="'+src+'" style="width:100%">'
            +'</a>'
            +'</div>'
            +'</div>');
        galleryRow.show();
        parent.append(galleryRow);
    }

    function showImages(imageList,type) {
        var gallery = $('.gallery');
        if(type == 'all') {
            for (var i = 0; i < imageList.length; i++) {
                showImage(gallery, imageList[i]);
            }
        }
    }
</script>

</body>
</html>