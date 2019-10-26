<?php

class Upload extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
    }

    public function index()
    {
        $this->load->helper('url');
        $this->load->view('upload_form');
    }

    /**
     * Method for image upload
     */
    public function do_upload()
    {
        $config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|jpeg|png|mp3';
        // To handle big images
        $config['max_size']             = 100000000;
        $config['max_width']            = 10000;
        $config['max_height']           = 10000;
        //It's more easy to get last updated file, if filename is the timestamp
        $config['file_name']            = time();

        $this->load->library('upload', $config);
        $this->upload->do_upload('file');
    }

    /**
     * Method for list files of uploads directory
     */
    public function list_uploads(){
        $this->load->helper('directory');
        $files = directory_map('./uploads/',1);
        //To can get last updated files
        sort($files);
        //Format to JSON array
        echo (json_encode(new ArrayObject($files), JSON_PRETTY_PRINT));

    }
}
?>
