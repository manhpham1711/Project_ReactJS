<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use \Firebase\JWT\JWT;
use App\User;
use App\Http\Controllers\UpLoadImageController;

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

        $image = $request->input('image');
        if(is_null($image)){
            $image = "storage/public/53-10-20-6-8-2020.png";
        }else{
            $image = UpLoadImageController::uploadFile($image);
        }
        $username = $request->input('username');
        $password = $request->input('password');

        $user = User::all()->where('username',$username);
        if($user->count() < 1){
            $userNew = new User;
            $userNew->name = $name;
            $userNew->gender = $gender;
            $userNew->birthday = $birthday;
            $userNew->avatar = $image;
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

    function updateInfomation(Request $request){

		$key = "21A hocsinhngoannhatnha j@1711";
        $id = $request->input('id_user');

        $user_id = JWT::decode($id, $key, array('HS256'));

        $name = $request->input('name');
        $gender = $request->input('gender');
        $birthday = $request->input('birthday');

        $user = User::where('id', $user_id)->first();
        $image = $request->input('image');

        if(is_null($image)){
            $image = $user->avatar;
        }else{
            $image = UpLoadImageController::uploadFile($image);
        }

        $password = $request->input('password');

        if(is_null($password)){
            $password = $user->password;
        }else{
            $password = Hash::make($password);
        }

        $user->name =  $name;
        $user->gender = $gender;
        $user->birthday = $birthday;
        $user->avatar = $image;
        $user->password = $password;

        $user->save();
        $data = array("data" => null);
        return response()->json($data, 200);
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
