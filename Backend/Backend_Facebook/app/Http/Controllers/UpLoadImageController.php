<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UpLoadImageController extends Controller
{
    static function uploadFile( $base64_decode){

        $img1 = strstr($base64_decode, ',');
        
        $img = substr($img1,1, strlen($img1));
        $bin = base64_decode($img);
        //Load GD resource from binary data
        $im = imageCreateFromString($bin);
        // Make sure that the GD library was able to load the image
        // This is important, because you should not miss corrupted or unsupported images
        if (!$im) {
        die('Base64 value is not a valid image');
        }
        $date = getdate();
        $nameImage = $date['seconds']."-".$date['minutes']."-".$date['hours']."-".$date['mday']."-".$date['mon']."-".$date['year'];

        $img_file = 'storage/public/'.$nameImage.'.png';
        imagepng($im, $img_file, 0);

        return $img_file;
    }
}
