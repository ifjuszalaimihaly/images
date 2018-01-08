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
        #file-input{
            margin: auto;
        }
    </style>
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
    <div class="row gallery"></div>
</div>
<script src="<?= base_url() ?>/js/jquery-3.2.1.min.js"></script>
<script src="<?= base_url() ?>/js/script.min.js"></script>

</body>
</html>