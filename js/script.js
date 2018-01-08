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
            loadImageList('last');
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

var fileInput = document.getElementById('file-input');
fileInput.addEventListener('change',function (ev) {
    var files = fileInput.files;
    console.log(files);
    for (var i = 0, f; f = files[i]; i++) {
        console.log(f);
        upload(f);
    }
},false);


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
        showImages(array, type);
    });
}

function showImage(parent, image) {
    var src = window.location.origin + '/images/uploads/' + image;
    var galleryRow = $('<div class="col-md-2 col-sm-4 col-xs-6">' +
        '<div class="thumbnail" >' +
        '<a href="' + src + '" target="_blank">' +
        '<img src="' + src + '" style="width:150px; height: 150px">'
        + '</a>'
        + '</div>'
        + '</div>');
    galleryRow.show();
    parent.append(galleryRow);
}

function showImages(imageList, type) {
    var gallery = $('.gallery');
    if (type === 'all') {
        for (var i = 0; i < imageList.length; i++) {
            showImage(gallery, imageList[i]);
        }
    }
    if (type === 'last') {
        showImage(gallery, imageList[imageList.length - 1]);
    }
}