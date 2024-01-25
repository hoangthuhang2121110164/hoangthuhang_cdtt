<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\Request;

class PostController extends Controller
{
    function index()
    {
        $posts = Post::where('status', '!=', 0)
            ->OrderBy('created_at', 'desc')
            ->select('id', 'title', 'slug', 'status', 'image')
            ->get();
            $list_topic = Topic::where('status', '!=', 0)->orderBy('created_at', 'desc')->select('id', 'name')->get();
        $total = Post::count();
        $result = [

            'status' => true,
            'posts' => $posts,
            'message' => 'tai du lieu thamh cong',
            'total' => $total,
            'list_topic'=> $list_topic,
        ];
        return response()->json($result, 200);
    }

    public function show($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'post' => $post,
            'message' => 'tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }
    public function status($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $post->status = ($post->status === 1) ? 2 : 1;
        $post->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
        $post->updated_by = 1; //Đăng nhập
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'tai du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'khong tim thay du lieu',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $post = new Post(); //Đối tượng mới
        $post->topic_id = $request->topic_id;
        $post->title = $request->title;
        $post->slug = Str::of($request->name)->slug('-');
        $post->detail = $request->detail;
        $post->type = $request->type;
        $post->description = $request->description;
        $post->created_at = date('Y-m-d H:i:s'); //Ngày tạo
        $post->created_by = Auth::id() ?? 1; //Đăng nhập
        $post->updated_by = 1;
        $post->status = $request->status;
        //Upload file
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis') . '.' . $extension;
                $post->image = $filename;
                $image->move(public_path('images/post'), $filename);
            }
        }
        //end upload file
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'khong the them du lieu ',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $post->topic_id = $request->topic_id;
        $post->title = $request->title;
        $post->slug = Str::of($request->name)->slug('-');
        $post->detail = $request->detail;
        $post->type = $request->type;
        $post->description = $request->description;
        $post->created_at = date('Y-m-d H:i:s'); //Ngày tạo
        $post->created_by = 1; //Đăng nhập
        $post->updated_by = Auth::id() ?? 1;
        $post->status = $request->status;
        //Upload file
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis') . '.' . $extension;
                $post->image = $filename;
                $image->move(public_path('images/post'), $filename);
            }
        }
        //end upload file
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'cap naht du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'khong the them du lieu ',
        ];
        return response()->json($result, 200);
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        if ($post->delete()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'cap naht du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'khong the them du lieu',
        ];
        return response()->json($result, 200);
    }
    public function post_list($type,$limit)
    {
        $args = [
            ['type', '=', $type],
            ['status', '=', 1]
        ];
        $posts = Post::where($args)
        ->orderBy('created_at', 'desc')
        ->select('id', 'title','slug', 'status', 'image', 'detail')
        ->limit($limit)
        ->get();
        $result = [
            'status'=> true,
            'posts'=>$posts,
            'message'=>'Tai du lieu thanh cong',
        ];
        return response()->json($result,200);
    }

    public function post_detail($slug)
    {
        $post = Post::where('slug', $slug)->first();    
        $topid = $post->topic_id;  
        $listid = array();
         array_push($listid, $topid);
         $args_top1 = [
             ['id', '=', $topid],
             ['status', '=', 1]
         ];
         $list_topic1 = Topic::where($args_top1)->get();
         if (count($list_topic1) > 0) {
             foreach ($list_topic1 as $row1) {
                 array_push($listid, $row1->id);
                 $args_top2 = [
                     ['id', '=', $row1->id],
                     ['status', '=', 1]
                 ];
                 $list_topic2 = Topic::where($args_top2)->get();
                 if (count($list_topic2) > 0) {
                     foreach ($list_topic2 as $row2) {
                         array_push($listid, $row2->id);
                     }
                 }
             }
         }
         $args = [
             ['id', '!=', $post->id],
             ['status', '=', 1]
         ];
         $post_orther = Post::where( $args)
         ->whereIn('topic_id', $listid)
         ->orderBy('created_at', 'DESC')
         ->select('id', 'title', 'status', 'image', 'slug','detail')
         ->limit(8)
         ->get();
     
         $result = [
            'status'=> true,
            'post'=>$post,
            'message'=>'Tai du lieu thanh cong',
            'post_orther'=>$post_orther,
        ];
        return response()->json($result,200);
        }

}
