<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Status;
use \Firebase\JWT\JWT;
use App\Http\Controllers\UpLoadImageController;

class StatusController extends Controller
{
    function index(){
        $data = DB::table('statuses')
        ->join('users', 'statuses.user_id', '=', 'users.id')
        ->select('statuses.id', 'statuses.image', 'statuses.content', 'statuses.created_at', 'statuses.updated_at','users.name', 'users.avatar' )
        ->orderBy('statuses.created_at', 'desc')
        ->get();
        return response()->json($data, 200);
    }

    function createStatus(Request $request){
        $id = $request->input('id');
		$key = "21A hocsinhngoannhatnha j@1711";
		$user_id = JWT::decode($id, $key, array('HS256'));
        $image = $request->input('image');
        if(!is_null($image)){
            $image = UpLoadImageController::uploadFile($image);
        }else{
            $image = "";
        }
        $content = $request->input('content');
        $status = new Status();
        $status->user_id = $user_id;
        $status->image = $image;
        $status->content = $content;
        $status->save();
        $data = array("data" => null);
        return response()->json($data, 200);
    }


}
