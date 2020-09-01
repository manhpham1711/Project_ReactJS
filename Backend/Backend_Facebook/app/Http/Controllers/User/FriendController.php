<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    function getUser($id_user){
        $friends = DB::table('friends')
        ->where([
            ['user_id',$id_user],
            ['status', 1]
        ])
        ->orWhere([
            ['friend_id',$id_user],
            ['status', 1]
        ])

        ->orderByDesc('created_at')
        ->get();
        return $friends;
    }

    function index(){
        $token = request()->header("Authorization");
		$key = "21A hocsinhngoannhatnha j@1711";
		$id_user = JWT::decode($token, $key, array('HS256'));
        $listFriend = $this->getUser($id_user);
        $id = [];
        foreach($listFriend as $user){
            if($user->user_id == $id_user){
                array_push($id, $user->friend_id);
            }else{
                array_push($id, $user->user_id);
            }
        }
        $user = DB::table('users')->whereIn('id',$id)->select('name','avatar','id')->get();
        return response()->json($user, 200);
    }
}
