<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    
        function index()
        {
            $categorys = Category::where('status', '!=', 0)
                ->orderBy('created_at', 'desc')
                ->select('id', 'name', 'slug', 'status', 'image')
                ->get();
            $total = category::count();
            $result = [
                'status' => true,
                'categorys' => $categorys,
                'message' => 'tai du lieu thamh cong',
                'total' => $total
            ];
            return response()->json($result, 200);
        }
    
        public function show( $id)
        {
            if(is_numeric($id))
        {
            $category = Category::find($id);
        }
        else{
            $category = Category::where('slug',$id)->first();
        }
        $result = [
            'status'=> true,
            'category'=>$category,
            'message'=>'Tai du lieu thanh cong',
        ];
        return response()->json($result,200);
    }
    public function category_list($parent_id = 0)
    {
        $args = [
            ['parent_id', '=', $parent_id],
            ['status', '=', 1]
        ];
        $categorys = Category::where($args)
        ->orderBy('created_at', 'desc')
        ->select('id', 'name','slug', 'status', 'image', 'parent_id')
        ->get();
        $result = [
            'status'=> true,
            'categorys'=>$categorys,
            'message'=>'Tai du lieu thanh cong',
        ];
        return response()->json($result,200);
    }




    public function status($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $category->status = ($category->status === 1) ? 2 : 1;
        $category->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
        $category->updated_by = 1; //Đăng nhập
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'tai du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'khong tim thay du lieu',
        ];
        return response()->json($result, 200);
    }

        function store(Request $request)
     { 
        $category = new category(); //Đối tượng mới
        $category->name = $request->name;
        $category->slug = Str::of($request->name)->slug('-');
        $category->sort_order = $request->sort_order;
        $category->parent_id = $request->parent_id;
        $category->description = $request->description;
        $category->created_at = date('Y-m-d H:i:s'); //Ngày tạo
        $category->created_by = Auth::id() ?? 1; //Đăng nhập
        $category->updated_by = 1;
        $category->status = $request->status;
        //Upload file
           $image = $request->image;
           if($image != null){
              $extension = $image->getClientOriginalExtension();
              if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis') . '.' . $extension;
                $category->image = $filename;
                $image->move(public_path('images/category'), $filename);
              }
           }
        //end upload file
        if($category->save())
        {
            $result=[
                'status' => true,
                'category' => $category,
                'message' => 'them du lieu thanh cong',
            ];
        return response()->json($result, 200);
    }
    $result=[
        'status' => false,
        'category' => null,
        'message' => 'khong the them du lieu ',
    ];
    return response()->json($result, 200);
    }
    
    function update(Request $request,$id)
    {
        $category = category::find($id);
        if($category==null){
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'khong tim thay du lieu',
    ];
    return response()->json($result, 404);
    }
            $category->name = $request->name;
            $category->slug = Str::of($request->name)->slug('-');
            $category->sort_order = $request->sort_order;
            $category->parent_id = $request->parent_id;
            $category->description = $request->description;
            $category->created_at = date('Y-m-d H:i:s'); //Ngày tạo
            $category->created_by = 1; //Đăng nhập
            $category->updated_by = Auth::id() ?? 1;
            $category->status = $request->status;
            //Upload file
            $image = $request->image;
            if($image != null){
               $extension = $image->getClientOriginalExtension();
               if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                 $filename = date('YmdHis') . '.' . $extension;
                 $category->image = $filename;
                 $image->move(public_path('images/category'), $filename);
               }
            }
            //end upload file
            $category->sort_order = $request->sort_order;
            $category->description = $request->description;
            $category->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
            $category->updated_by = 1; //Đăng nhập
            $category->status = $request->status;
            if($category->save())
        {
            $result=[
                'status' => true,
                'category' => $category,
                'message' => 'cap naht du lieu thanh cong',
            ];
        return response()->json($result, 200);
    }
    $result=[
        'status' => false,
        'category' => null,
        'message' => 'khong the them du lieu ',
    ];
    return response()->json($result, 200);
    }
    
    public function destroy($id)
    {
        $category =category::find($id);
        if($category == null)
        {
            $result =[
                'status' => false,
                'category' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        if($category->delete())
        {
            $result=[
                'status' => true,
                'category' => $category,
                'message' => 'cap naht du lieu thanh cong',
            ];
        return response()->json($result, 200);
        }
        $result=[
            'status' => false,
            'category' => null,
            'message' => 'khong the them du lieu',
        ];
    return response()->json($result, 200);
    }
}
