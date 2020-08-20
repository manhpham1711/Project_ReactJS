<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Firebase\JWT\JWT;
use App\Comment;

class CommentController extends Controller
{
    function index($id){
        $data = DB::table('comments')   ->where('status_id',$id)
                                        ->join('users', 'comments.user_id', '=', 'users.id')
                                        ->select('users.name', 'users.avatar', 'comments.content', 'comments.id')
                                        ->orderBy('comments.created_at', 'desc')
                                        ->get();
        return response()->json($data, 200);
    }

    function commentStatus(Request $request){
        $id = $request->input('user_id');
		$key = "21A hocsinhngoannhatnha j@1711";
        $user_id = JWT::decode($id, $key, array('HS256'));
        $status_id = $request->input('status_id');
        $content = $request->input('content');

        $newComment = new Comment();
        $newComment->user_id = $user_id;
        $newComment->status_id = $status_id;
        $newComment->content = $content;
        $newComment->save();

        return  $this->index($status_id);
    }
}

