<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Post;
use App\Models\Topic;

use Illuminate\Support\Str;

class MenuController extends Controller
{
    function index()
    {
        // $mang=[['status', '!=', 0]];
        // $menus = Menu::where($mang)
        // ->orderBy('created_at', 'desc')
        // // ->select('id', 'name','slug', 'status', 'image')
        // ->get();
        $list_category = Category::where('status', '!=', 0)->orderBy('created_at', 'desc')->select('id', 'name')->get();
        $list_brand = Brand::where('status', '!=', 0)->orderBy('created_at', 'desc')->select('id', 'name')->get();
        $list_topic = Topic::where('status', '!=', 0)->orderBy('created_at', 'desc')->select('id', 'name')->get();
        $list_page = Post::where([['status', '!=', 0],['type','=', 'page']])->orderBy('created_at', 'desc')->select('id', 'title', 'type')->get();
        $list_menu = Menu::where('status', '!=', 0)->orderBy('created_at', 'desc')->get();
        $total = Menu::count();
        $mang1 = Menu::where('status', '=', 1)->get();
        $status = count($mang1);
        $mang2 = Menu::where('status', '=', 0)->get();
        $trash = count($mang2);
        $result = [
            'status'=> true,
            'list_category'=>$list_category,
            'list_brand'=>$list_brand,
            'list_topic'=>$list_topic,
            'list_page'=>$list_page,
            'menus'=>$list_menu,
            'message'=>'Tai du lieu thanh cong',
            'total'=> $total,
            'status'=> $status,
            'trash'=> $trash,
        ];
        return response()->json($result,200);
    }

    public function show($id)
    {
        $menu = Menu::find($id);
        if($menu == null)
        {
            $result = [
                'status'=> false,
                'menu'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        }
        $result = [
            'status'=> true,
            'menu'=>$menu,
            'message'=>'Tai du lieu thanh cong',
        ];
        return response()->json($result,200);
    }

    public function store(Request $request)
    {
        if (isset($request->ADDCATEGORY))
        {
            $list_id = $request->categoryid;
            foreach ($list_id as $id){
                $category =Category::find($id);
                $menu = new Menu();
                $menu->name= $category->name;
                $menu->link= "danh-muc/".$category->slug;
                $menu->table_id= $category->id;
                $menu->parent_id= 0;
                $menu->sort_order= 1;
                $menu->type= 'category';
                $menu->position= $request->position;
                $menu->status= 2;
                $menu->created_at= date('Y-m-d H:i:s');
                $menu->created_by = 1;
                $menu->save();
            }
            $result = [
                'status'=> true,
                'menu'=>$menu,
                'message'=>'Them du lieu thanh cong',
            ];
            return response()->json($result,200);
}
        if (isset($request->ADDBRAND))
        {
            $list_id = $request->brandid;
            foreach ($list_id as $id){
                $brand =Brand::find($id);
                $menu = new Menu();
                $menu->name= $brand->name;
                $menu->link="thuong-hieu/". $brand->slug;
                $menu->table_id= $brand->id;
                $menu->parent_id= 0;
                $menu->sort_order= 1;
                $menu->type= 'brand';
                $menu->position= $request->position;
                $menu->status= 2;
                $menu->created_at= date('Y-m-d H:i:s');
                $menu->created_by = 1;
                $menu->save();
            }
            $result = [
                'status'=> true,
                'menu'=>$menu,
                'message'=>'Them du lieu thanh cong',
            ];
            return response()->json($result,200);
    }
        if (isset($request->ADDTOPIC))
        {
            $list_id = $request->topicid;
            foreach ($list_id as $id){
                $topic =Topic::find($id);
                $menu = new Menu();
                $menu->name= $topic->name;
                $menu->link= "chu-de/" . $topic->slug;
                $menu->table_id= $topic->id;
                $menu->parent_id= 0;
                $menu->sort_order= 1;
                $menu->type= 'topic';
                $menu->position= $request->position;
                $menu->status= 2;
                $menu->created_at= date('Y-m-d H:i:s');
                $menu->created_by = 1;
                $menu->save();
            }
            $result = [
                'status'=> true,
                'menu'=>$menu,
                'message'=>'Them du lieu thanh cong',
            ];
            return response()->json($result,200);
    }
        if (isset($request->ADDPAGE))
        {
            $list_id = $request->pageid;
            foreach ($list_id as $id){
                $page =Post::find($id);
                $menu = new Menu();
                $menu->name= $page->title;
                $menu->link= "trang-don/".$page->slug;
                $menu->table_id= $page->id;
                $menu->parent_id= 0;
                $menu->sort_order= 1;
                $menu->type= 'page';
                $menu->position= $request->position;
                $menu->status= 2;
                $menu->created_at= date('Y-m-d H:i:s');
                $menu->created_by = 1;
                $menu->save();
            }
            $result = [
                'status'=> true,
                'menu'=>$menu,
                'message'=>'Them du lieu thanh cong',
            ];
            return response()->json($result,200);
    }
        if (isset($request->ADDCUSTOM))
        {
            $menu = new Menu();
            $menu->name= $request->name;
            $menu->link= $request->link;
            $menu->parent_id= 0;
            $menu->sort_order= 1;
            $menu->table_id= 0;
            $menu->type= 'custom';
            $menu->position= $request->position;
            $menu->status= 2;
            $menu->created_at= date('Y-m-d H:i:s');
            $menu->created_by = 1;
            if($menu->save())
            {
                $result = [
                    'status'=> true,
                    'menu'=>$menu,
                    'message'=>'Them du lieu thanh cong',
                ];
                return response()->json($result,200);
            } //Luuu vao CSDL
            $result = [
                'status'=> false,
                'menu'=>null,
                'message'=>'Khong the them du lieu',
            ];
            return response()->json($result,200);
        }

    }


    // public function store(Request $request)
    // {
    //     $menu = new Menu();
    //     $menu->name = $request->name; 
    //     $menu->link = $request->link; //form
    //     $menu->sort_order = $request->sort_order; //form
    //     $menu->parent_id = $request->parent_id; //form
    //     $menu->type = $request->type; //form
    //     $menu->table_id = $request->table_id; //form
    //     $menu->description = $request->description; //form
    //     $menu->created_at = date('Y-m-d H:i:s');
    //     $menu->created_by = 1;
    //     $menu->status = $request->status; //form
    //     if($menu->save())
    //     {
    //         $result = [
    //             'status'=> true,
    //             'menu'=>$menu,
    //             'message'=>'Them du lieu thanh cong',
    //         ];
    //         return response()->json($result,200);
    //     } //Luuu vao CSDL
    //     $result = [
    //         'status'=> false,
    //         'menu'=>null,
    //         'message'=>'Khong the them du lieu',
    //     ];
    //     return response()->json($result,200);
    // }

    public function update(Request $request, $id)
    {
        $menu = Menu::find($id);
        if($menu == null)
        {
            $result = [
                'status'=> false,
                'menu'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        } 
        $menu->name = $request->name; 
        $menu->link = $request->link; //form
        $menu->sort_order = $request->sort_order; //form
        $menu->parent_id = $request->parent_id; //form
        $menu->type = $request->type; //form
        $menu->table_id = 0; //form
        $menu->position = $request->position; //form
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1;
        $menu->status = $request->status; //form
        if($menu->save())
        {
            $result = [
                'status'=> true,
                'menu'=>$menu,
                'message'=>'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result,200);
        } //Luuu vao CSDL
        $result = [
            'status'=> false,
            'menu'=>null,
            'message'=>'Khong the cap nhat du lieu',
        ];
        return response()->json($result,200);
    }

    public function destroy($id)
    {
        $menu = Menu::find($id);
        if($menu == null)
        {
            $result = [
                'status'=> false,
                'menu'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        } 
        if($menu->delete())
        {
            $result = [
                'status'=> true,
                'menu'=> $menu,
                'message'=>'Xoa du lieu thanh cong',
            ];
            return response()->json($result,200);
        } 
        
    }

    public function status($id)
    {
        $menu = Menu::find($id);
        if($menu == null)
        {
            $result = [
                'status'=> false,
                'menu'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        }
        $menu->status = ($menu->status == 1) ? 2 : 1;
        if($menu->save())
        {
            $result = [
                'status'=> true,
                'menu'=>$menu,
                'message'=>'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result,200);
        } //Luuu vao CSDL
        $result = [
            'status'=> false,
            'menu'=>null,
            'message'=>'Khong the cap nhat du lieu',
        ];
        return response()->json($result,200);    
    }

    public function trash()
    {
        $mang=[['status', '=', 0]];
        $menus = Menu::where($mang)
        ->orderBy('created_at', 'desc')
        ->get();
        $result = [
            'status'=> true,
            'menus'=>$menus,
            'message'=>'Tai du lieu thanh cong',
        ];
        return response()->json($result,200);

    }

    public function delete($id)
    {
        $menu = Menu::find($id);
        if($menu == null)
        {
            $result = [
                'status'=> false,
                'menu'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        }
       $menu->status= 0;//0 rác
       $menu->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
       $menu->updated_by= 1;//giá trị loi
       if($menu->save())
       {
           $result = [
               'status'=> true,
               'menu'=>$menu,
               'message'=>'Xóa mẫu tin vào thùng rác thành công',
           ];
           return response()->json($result,200);
       } //Luuu vao CSDL
    }

    public function restore($id)
    {
        $menu = Menu::find($id);
        if($menu == null)
        {
            $result = [
                'status'=> false,
                'menu'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        }
       $menu->status= 2;//0 rác
       $menu->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
       $menu->updated_by= 1;//giá trị loi
       if($menu->save())
       {
           $result = [
               'status'=> true,
               'menu'=>$menu,
               'message'=>'khôi phục mẫu tin thành công',
           ];
           return response()->json($result,200);
       } //Luuu vao CSDL       
    }

    public function menu_list($position, $parent_id)
    {
        $args = [
            ['position', '=', $position],
            ['parent_id', '=', $parent_id],
            ['status', '=', 1]
        ];
        $menus = Menu::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        if(count($menus)>0)
        {            
            $result = [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'menus' => $menus
            ];
             return response()->json($result, 200);            
        }
        else
        {
            $result = [
                'success' => false,
                'message' => 'Không có dữ liệu',
                'products' => null
            ];
             return response()->json($result, 200);
        }
        $menu = Menu::where($args)->orderBy('sort_order','ASC')->get();
        return response()->json($menu,200);
    }
}


