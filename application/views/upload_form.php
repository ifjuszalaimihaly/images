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
            $.ajax({
                url: 'http://localhost/images/index.php/upload/do_upload',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: 'post',
                success: function () {
                    alert('success');
                },
                error: function () {
                    alert('error');
                }
            });
        }
    );
</script>

</body>
</html>