<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;

class FacebookController extends Controller
{
    function index(){
        DB::table('users')->truncate();
        echo "dfdklfuhjidfy";
    }
}
