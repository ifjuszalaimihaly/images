//Declare global to can access from more methods
var progressContainer = $('.progress');
var progressbar = $('.progress-bar');
var fileInput = document.getElementById('file-input');
var dropZone = document.getElementById('dropzone');
//Load images when loaded the page
loadImageList('all');

//upload file to server
function upload(file) {
    var formData = new FormData();
    formData.append('file', file);
    //Denied upload when one another is in progress
    $('.upload-file').hide()
    $.ajax({
        url: window.location.href + 'index.php/upload/do_upload',
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
            //Show progressbar, and refresh upload progress
            progressContainer.show();
            progressbar.show();
            xhr.upload.addEventListener("progress", countProgress, false);
            return xhr;
        }
    }).done(function () {
        setTimeout(function () {
            //Reset and hide progressbar, after 2500 millis
            showProgress(0);
            progressContainer.hide();
            progressbar.hide();
            //Enable the file upload again
            $('.upload-file').show();
            //Load the last updated image to the page
            loadImageList('last');
        }, 2500);
    }).fail(function () {
        //Show an error message on fail
        showError('A kép feltöltése nem sikerült');
        //Enable the file upload again
        $('.upload-file').show();
    });
}
//Count the upload progress
function countProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round((evt.loaded * 100) / evt.total);
        showProgress(percentComplete);
    }
}

//Show the current upload progress
function showProgress(percent) {
    progressbar.attr('aria-valuenow', percent);
    progressbar.css('width', percent + '%');
    progressbar.text(percent + '%')
}

//Handle file selected of dropzone
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    checkFiles(files);
}

//Hadle DragOver event of dropzone
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

//Handle the change event of file input
function handlefileInputChange(evt) {
    var files = fileInput.files;
    checkFiles(files);
}

//Check count and extensions of file
function checkFiles(files) {
    //Denied more file upload
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

//Show error message, and hide it after 2500 millis
function showError(message) {
    var errormessage = $('#error-message');
    errormessage.text(message);
    errormessage.show();
    setTimeout(function () {
        errormessage.hide()
    },2500);
}

//Check wether a the uploaded file is an image
function validateFileExtension(file) {
    var filename = file.name.toLowerCase();
    console.log(filename);
    if (filename.endsWith('.gif') || filename.endsWith('.jpg')
        || filename.endsWith('.jpeg') || filename.endsWith('.png')) {
        return true;
    }
    return false;
}

//Setup the listeners of dropzone
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

//Setup the listner of fileinput
fileInput.addEventListener('change', handlefileInputChange, false);


//Load the image list from the server
function loadImageList(type) {
    $.ajax({
        url: window.location.href + 'index.php/upload/list_uploads',
        data: {},
        cache: false,
        contentType: false,
        processData: false
    }).done(function (result) {
        var imageList = JSON.parse(result);
        //Convert JSON to an array
        var array = $.map(imageList, function (value, index) {
            return [value];
        });

        showImages(array, type);
    }).fail(function () {
        showError('A kép(ek) betöltése nem sikerült');
    });
}

//Append an image to gallery, and show it.
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
    //Load all images from server, (when page is loaded)
    if (type === 'all') {
        for (var i = 0; i < imageList.length; i++) {
            showImage(gallery, imageList[i]);
        }
    }
    //Load the last uploaded image
    if (type === 'last') {
        showImage(gallery, imageList[imageList.length - 1]);
    }
}