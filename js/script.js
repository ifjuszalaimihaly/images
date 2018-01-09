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
        }
    }).done(function () {
        setTimeout(function () {
            showProgress(0);
            progressContainer.hide();
            progressbar.hide();
            loadImageList('last');
        }, 2500);
    }).fail(function () {
        showError('A feltöltés nem sikerült!');
    });
};

function countProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round((evt.loaded * 100) / evt.total);
        showProgress(percentComplete);
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
    checkFiles(files);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function checkFiles(files) {
    if (files.length > 1) {
        showError('Csak egy fájl feltöltése lehetséges!');
        return;
    }
    if (validateFileExtension(files[0])) {
        upload(files[0]);
    } else {
        showError('Nem megfeleő kép formátum, csak kép feltöltése lehetséges!');
    }
}

function showError(message) {
    var errormessage = $('#error-message');
    errormessage.text(message);
    errormessage.show();
    setTimeout(function () {
        errormessage.hide()
    },2500);
}

function validateFileExtension(file) {
    if (file.name.endsWith('.gif') || file.name.endsWith('.jpg')
        || file.name.endsWith('.jpeg') || file.name.endsWith('.png')) {
        return true;
    }
    return false;
}

// Setup the dnd listeners.
var dropZone = document.getElementById('dropzone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

var fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', function (ev) {
    var files = fileInput.files;
    checkFiles(files);
}, false);


function loadImageList(type) {
    $.ajax({
        url: window.location.href + 'index.php/upload/list_uploads',
        data: {},
        cache: false,
        contentType: false,
        processData: false
    }).done(function (result) {
        var imageList = JSON.parse(result);
        var array = $.map(imageList, function (value, index) {
            return [value];
        });
        showImages(array, type);
    }).fail(function () {
        showError('A kép(ek) beöltése nem sikerült!');
    });
}

function showImage(parent, image) {
    var src = window.location.href + '/uploads/' + image;
    var galleryRow = $('<div class="col-md-2 col-sm-4 col-xs-6">' +
        '<div class="thumbnail" >' +
        '<a href="' + src + '" target="_blank">' +
        '<img class="img-compressed" src="' + src + '" style="width:150px; height: 150px">'
        + '</a>'
        + '</div>'
        + '</div>');
    galleryRow.show();
    parent.append(galleryRow);
}

function showImages(imageList, type) {
    var gallery = $('.gallery-row');
    if (type === 'all') {
        for (var i = 0; i < imageList.length; i++) {
            showImage(gallery, imageList[i]);
        }
    }
    if (type === 'last') {
        showImage(gallery, imageList[imageList.length - 1]);
    }
}