<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use \Firebase\JWT\JWT;
use App\User;

class LoginController extends Controller
{
    function login(Request $request){

        $key = "21A hocsinhngoannhatnha j@1711";
        $username = $request->input('username');
		$password = $request->input('password');
        if (Auth::attempt(["username" => $username, "password" => $password])) {
            $user = Auth::user();
            $token = JWT::encode($user->id, $key);
            return response()->json($token, 200);
		} else {
            $data = array("data" => null);
			return response()->json($data, 400);
		}
    }

    function createUser(Request $request){
        $name = $request->input('name');
        $gender = $request->input('gender');
        $birthday = $request->input('birthday');
        $username = $request->input('username');
        $password = $request->input('password');

        $user = User::all()->where('username',$username);
        if($user->count() < 1){
            $userNew = new User;
            $userNew->name = $name;
            $userNew->gender = $gender;
            $userNew->birthday = $birthday;
            $userNew->image = "https://gamek.mediacdn.vn/133514250583805952/2020/1/16/1-15791579653801179133828.png";
            $userNew->username = $username;
            $userNew->password = Hash::make($password);
            $userNew->route = "User";
            $userNew->save();

            $key = "21A hocsinhngoannhatnha j@1711";
            $user = User::firstWhere('username','=',$username);
            $token = JWT::encode($user->id, $key);
            return response()->json($token, 200);
        }else{
            $data = array("data" => null);
			return response()->json($data, 400);
        }
    }

    function detail(){
        $token = request()->header("Authorization");
		$key = "21A hocsinhngoannhatnha j@1711";
		$data = JWT::decode($token, $key, array('HS256'));

		$users = User::all();
		$user = $users->find($data);
		return response()->json($user, 200);
    }


}
