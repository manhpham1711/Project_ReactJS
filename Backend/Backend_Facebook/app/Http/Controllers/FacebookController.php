<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class FacebookController extends Controller
{
    function index(){
        $user = User::all();

        echo json_encode($user);
    }
}
