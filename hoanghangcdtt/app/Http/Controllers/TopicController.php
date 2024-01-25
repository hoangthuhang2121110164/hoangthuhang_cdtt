<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use App\Models\Topic;

class TopicController extends Controller
{
    function index()
    {
        $topics = Topic::where('status', '!=', 0)
        ->orderBy('created_at','desc')
        ->select('id', 'name', 'slug', 'status')
        ->get();
        $total = Topic::count();
        $result=[
            'status' => true,
            'topics' => $topics,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total,
        ];
        return response ()->json($result, 200);
    }

    function show($id)
    {
        $topic = Topic::find($id);
        if ($topic == null)
        {
            $result=[
                'status' => false,
                'topic' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response ()->json($result, 404);
        }
        
        $result=[
            'status' => true,
            'topic' => $topic,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response ()->json($result, 200);
    }
    public function status($id)
    {
        $topic = topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $topic->status = ($topic->status === 1) ? 2 : 1;
        $topic->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
        $topic->updated_by = 1; //Đăng nhập
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'tai du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'khong tim thay du lieu',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $topic = new Topic();
        $topic->name = $request->name;
        $topic->slug = Str::of($request->name)->slug('-');           
        $topic->sort_order = $request->sort_order;
        $topic->description = $request->description;
        $topic->created_at = date('Y-m-d H:i:s');
        $topic->created_by = 1;
        $topic->status = $request->status;
        if($topic->save())
        {
            $result =[
                'status' => true,
                'topic' => $topic,
                'message' => 'Thêm dữ liệu thành công',    
            ];
            return response ()->json($result, 200);
        }
        $result =[
            'status' => false,
            'topic' => null,
            'message' => 'Không tìm thấy dữ liệu',    
        ];
        return response ()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $topic = Topic::find($id);
        if ($topic == null)
        {
            $result=[
                'status' => false,
                'topic' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response ()->json($result, 404);
        }
        $topic->name = $request->name;
        $topic->slug = Str::of($request->name)->slug('-');           
        $topic->sort_order = $request->sort_order;
        $topic->description = $request->description;
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1;
        $topic->status = $request->status;
        if($topic->save())
        {
            $result =[
                'status' => true,
                'topic' => $topic,
                'message' => 'Cập nhật dữ liệu thành công',    
            ];
            return response ()->json($result, 200);
        }
        $result =[
            'status' => false,
            'topic' => null,
            'message' => 'Không thể thêm dữ liệu',    
        ];
        return response ()->json($result, 200);
    }
    function destroy($id)
    {
        $topic = Topic::find($id);
        if ($topic == null){
            $result = [
                'status' => false,
                'topic' => $topic,
                'message' => 'Không tìm thấy dữ liệu',    
            ];
            return response ()->json($result, 404);
        }
        if($topic->delete())
        {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Xóa dữ liệu thành công',    
            ];
            return response ()->json($result, 200);
        }
        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Không thể thêm dữ liệu',    
        ];
        return response ()->json($result, 200);
    }
}



