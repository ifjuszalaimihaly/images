<html>
<head>
    <title>Upload Form</title>
</head>
<body>

<form enctype="multipart/form-data" method="post" accept-charset="utf-8">

    <input type="file" name="userfile" id="userfile" size="20"/>

    <br/><br/>

    <input type="button" value="upload" id="upload"/>

</form>

<script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>
<script>
    $('#upload').on('click',
        function () {
            var fileData = $('#userfile').prop('files')[0];
            var formData = new FormData();
            formData.append('userfile', fileData);
            var ajax = $.ajax({
                url: 'do_upload',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: 'post',
                xhr: function () {
                    var xhr = null;
                    if ( window.ActiveXObject )
                    {
                        xhr = new window.ActiveXObject( "Microsoft.XMLHTTP" );
                    }
                    else
                    {
                        xhr = new window.XMLHttpRequest();
                    }
                    xhr.upload.addEventListener( "progress", function ( evt )
                    {
                        if ( evt.lengthComputable )
                        {
                            var percentComplete = Math.round( (evt.loaded * 100) / evt.total );
                            //Do something with upload progress
                            console.log( 'Uploaded percent', percentComplete );
                        }
                    }, false );
                    return xhr;
                },
                success: function () {
                    alert('success');
                },
                error: function () {
                    alert('error');
                }
            });
            console.log(ajax);
        }
    );
</script>

</body>
</html>