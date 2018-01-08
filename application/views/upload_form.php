<html>
<head>
    <title>Upload Form</title>
    <link rel="stylesheet" href="http://<?php echo(base_url())?>css/styles.min.css">
</head>
<body>
<div class="container">
    <div class="example row">
        <div id="dropzone">Húzza ide a fájlokat
            <input class="" type="file" id="file-input" text="Select files" name="files[]">
        </div>
    </div>
    <div style="display: none" class="progress row">
        <div class="progress-bar progress-bar-striped active" role="progressbar"
             aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%; display: none">
        </div>
    </div>
    <div class="row gallery-row"></div>
</div>
<script src="http://<?php echo(base_url())?>js/jquery-3.2.1.min.js"></script>
<script src="http://<?php echo(base_url())?>js/script.min.js"></script>

</body>
</html>