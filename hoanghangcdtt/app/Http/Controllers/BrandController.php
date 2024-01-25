<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    function index()
    {
        $brands = Brand::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Brand::count();
        $result = [
            'status' => true,
            'brands' => $brands,
            'message' => 'tai du lieu thamh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    public function show($id)
    {
        
            if(is_numeric($id))
        {
            $brand = Brand::find($id);
        }
        else{
            $brand = Brand::where('slug',$id)->first();
        }

        $result = [
            'status' => true,
            'brand' => $brand,
            'message' => 'tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    public function status($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $brand->status = ($brand->status === 1) ? 2 : 1;
        $brand->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
        $brand->updated_by = 1; //Đăng nhập
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'tai du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'khong tim thay du lieu',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $brand = new Brand(); //Đối tượng mới
        $brand->name = $request->name;
        $brand->slug = Str::of($request->name)->slug('-');
        $brand->sort_order = $request->sort_order;
        $brand->description = $request->description;
        $brand->created_at = date('Y-m-d H:i:s'); //Ngày tạo
        $brand->created_by = Auth::id() ?? 1; //Đăng nhập
        $brand->updated_by = 1;
        $brand->status = $request->status;
        //Upload file
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis') . '.' . $extension;
                $brand->image = $filename;
                $image->move(public_path('images/brand'), $filename);
            }
        }
        //end upload file
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'khong the them du lieu ',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $brand->name = $request->name;
        $brand->slug = Str::of($request->name)->slug('-');
        $brand->sort_order = $request->sort_order;
        $brand->description = $request->description;
        $brand->created_at = date('Y-m-d H:i:s'); //Ngày tạo
        $brand->created_by = 1; //Đăng nhập
        $brand->updated_by = Auth::id() ?? 1;
        $brand->status = $request->status;
        //Upload file
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis') . '.' . $extension;
                $brand->image = $filename;
                $image->move(public_path('images/brand'), $filename);
            }
        }
        //end upload file
        $brand->sort_order = $request->sort_order;
        $brand->description = $request->description;
        $brand->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
        $brand->updated_by = 1; //Đăng nhập
        $brand->status = $request->status;
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'cap naht du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'khong the them du lieu ',
        ];
        return response()->json($result, 200);
    }

    public function destroy($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        if ($brand->delete()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'cap naht du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'khong the them du lieu',
        ];
        return response()->json($result, 200);
    }
}
