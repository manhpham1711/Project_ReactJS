<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class FacebookController extends Controller
{
    function index(){
        $user = User::all();
        // var_dump(response()->json($user, 200));
        return response()->json($user, 200);
        // return $user;
    }
}
