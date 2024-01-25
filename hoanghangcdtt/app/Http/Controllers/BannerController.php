<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use App\Models\Banner;

class BannerController extends Controller
{
    function index()
    {
        $banners = Banner::where('status', '!=', 0)
        ->orderBy('created_at','desc')
        ->select('id', 'name', 'position', 'status','image','link')
        ->get();
        $total = Banner::count();
        $mang1 =Banner :: where ('status','=',1)->get();
        $status =count($mang1);
        $mang2 =Banner :: where ('status','=',0)->get();
        $trash =count($mang2);
        $result=[
            'status' => true,
            'banners' => $banners,
            'message' => 'tai du lieu thanh cong',
            'total' => $total,
            'status'=>$status,
            'trash'=>$trash,
        ];
        return response ()->json($result, 200);
    }

    function show($id)
    {
        $banner = Banner::find($id);
        if ($banner == null)
        {
            $result=[
                'status' => false,
                'banner' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response ()->json($result, 404);
        }
        
        $result=[
            'status' => true,
            'banner' => $banner,
            'message' => 'tai du lieu thanh cong',
        ];
        return response ()->json($result, 200);
    }
    public function status($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $banner->status = ($banner->status === 1) ? 2 : 1;
        $banner->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
        $banner->updated_by = 1; //Đăng nhập
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'tai du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'khong tim thay du lieu',
        ];
        return response()->json($result, 200);
    }
    function store(Request $request)
    {
        $banner = new Banner();
        $banner->name = $request->name;
       
        //upload file
           $image = $request->image;
           if($image != null){
              $extension = $image->getClientOriginalExtension();
              if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis'). '.' . $extension;
                $image->move(public_path('images/banner'), $filename);
                $banner->image = $filename;
              }
           }
        //end upload file
        $banner->link = $request->link;
        $banner->position = $request->position;
        $banner->description = $request->description;
        $banner->created_at = date('Y-m-d H:i:s');
        $banner->created_by = 1;
        $banner->status = $request->status;
        if($banner->save())
        {
            $result =[
                'status' => true,
                'banner' => $banner,
                'message' => 'Them du lieu thanh cong',    
            ];
            return response ()->json($result, 200);
        }
        $result =[
            'status' => false,
            'banner' => null,
            'message' => 'khong tim thay du lieu',    
        ];
        return response ()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $banner = Banner::find($id);
        if ($banner == null)
        {
            $result=[
                'status' => false,
                'banner' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response ()->json($result, 404);
        }
        $banner->name = $request->name;
        //upload file
           $image = $request->image;
           if($image != null){
              $extension = $image->getClientOriginalExtension();
              if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis'). '.' . $extension;
                $image->move(public_path('images/banner'), $filename);
                $banner->image = $filename;
              }
           }   
        //end upload file
        $banner->link = $request->link;
        $banner->position = $request->position;
        $banner->description = $request->description;
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1;
        $banner->status = $request->status;
        if($banner->save())
        {
            $result =[
                'status' => true,
                'banner' => $banner,
                'message' => 'Cap nhat du lieu thanh cong',    
            ];
            return response ()->json($result, 200);
        }
        $result =[
            'status' => false,
            'banner' => null,
            'message' => 'khong the them du lieu',    
        ];
        return response ()->json($result, 200);
    }
    function destroy($id)
    {
        $banner = Banner::find($id);
        if ($banner == null){
            $result = [
                'status' => false,
                'banner' => $banner,
                'message' => 'khong tim thay du lieu',    
            ];
            return response ()->json($result, 404);
        }
        if($banner->delete())
        {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Xoa du lieu thanh cong',    
            ];
            return response ()->json($result, 200);
        }
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'khong the them du lieu',    
        ];
        return response ()->json($result, 200);
    }
    function banner_list($position, $status = 1)
    {
        $args = [
            ['position', '=', $position],
            ['status', '=', 1]
        ];
        $banners = Banner::where($args)
            ->orderBy('created_at', 'ASC')
            ->get();
       
            $result = [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'banners' => $banners
            ];
            return response()->json($result, 200);
           
    }

}

