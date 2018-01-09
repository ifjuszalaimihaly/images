<html>
<head>
    <title>Upload Form</title>
    <link rel="stylesheet" href="http://<?php echo(base_url()) ?>css/styles.min.css">
</head>
<body>
<div class="container">
    <div class="example row">
        <div id="dropzone">Húzza ide a fájt
            <input class="" type="file" id="file-input">
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-md-offset-3 col-sm-4 col-sm-offset-4 col-xs-2 col-xs-offset-5 bg-danger align-center"
             id="error-message" style="display: none">
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-md-offset-3 col-sm-4 col-sm-offset-4 col-xs-2 col-xs-offset-5">
            <div style="display: none" class="progress">
                <div class="progress-bar progress-bar-striped active" role="progressbar"
                     aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%; display: none">
                </div>
            </div>
        </div>
    </div>
    <div class="row gallery-row"></div>
</div>
</div>
<script src="http://<?php echo(base_url()) ?>js/jquery-3.2.1.min.js"></script>
<script src="http://<?php echo(base_url()) ?>js/script.min.js"></script>

</body>
</html>