<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    function index()
    {
        $mang=[['status', '!=', 0],['roles', '!=', 'admin']];
        $customers = User::where($mang)
        ->orderBy('created_at', 'desc')
        ->get();
        $total = count($customers);
        $mang1 = User::where('status', '=', 1)->get();
        $status = count($mang1);
        $mang2 = User::where('status', '=', 0)->get();
        $trash = count($mang2);
        $result = [
            'status'=> true,
            'customers'=>$customers,
            'message'=>'Tai du lieu thanh cong',
            'total'=> $total,
            'status'=> $status,
            'trash'=> $trash,
        ];
        return response()->json($result,200);
    }

    public function show($id)
    {
        $customer = User::find($id);
        if($customer == null)
        {
            $result = [
                'status'=> false,
                'customer'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        }
        $result = [
            'status'=> true,
            'customer'=>$customer,
            'message'=>'Tai du lieu thanh cong',
        ];
        return response()->json($result,200);
    }

    public function store(Request $request)
    {
        $customer = new User();
        $customer->name = $request->name; //form
        $customer->username = $request->username; //form
        $customer->password = bcrypt($request->password); //form
        $customer->gender = $request->gender; //form
        $customer->phone = $request->phone; //form
        $customer->email = $request->email; //form
        $customer->address = $request->address; //form
        $customer->roles = $request->roles; //form
        //Upload file
        $image = $request->image;
        if($image != NULL){
           $extension = $image->getClientOriginalExtension();
           if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
             $filename =  date('YmdHis'). '.' . $extension;
             $image->move(public_path('images/user'), $filename);
             $customer->image = $filename;
           }
        }
     //end upload file
        $customer->created_at = date('Y-m-d H:i:s');
        $customer->created_by = 1;
        $customer->status = $request->status; //form
        if($customer->save())
        {
            $result = [
                'status'=> true,
                'customer'=>$customer,
                'message'=>'Them du lieu thanh cong',
            ];
            return response()->json($result,200);
        } //Luuu vao CSDL
        $result = [
            'status'=> false,
            'customer'=>null,
            'message'=>'Khong the them du lieu',
        ];
        return response()->json($result,200);
    }
public function update(Request $request, $id)
    {
        $customer = User::find($id);
        if($customer == null)
        {
            $result = [
                'status'=> false,
                'customer'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        } 
        $customer->name = $request->name; //form
        $customer->username = $request->username; //form
        $customer->password = bcrypt($request->password); //form
        $customer->gender = $request->gender; //form
        $customer->phone = $request->phone; //form
        $customer->email = $request->email; //form
        $customer->address = $request->address; //form
        $customer->roles = $request->roles; //form
        //Upload file
        $image = $request->image;
        if($image != NULL){
           $extension = $image->getClientOriginalExtension();
           if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
             $filename =  date('YmdHis'). '.' . $extension;
             $image->move(public_path('images/user'), $filename);
             $customer->image = $filename;
           }
        }
     //end upload file
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1;
        $customer->status = $request->status; //form
        if($customer->save())
        {
            $result = [
                'status'=> true,
                'customer'=>$customer,
                'message'=>'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result,200);
        } //Luuu vao CSDL
        $result = [
            'status'=> false,
            'customer'=>null,
            'message'=>'Khong the cap nhat du lieu',
        ];
        return response()->json($result,200);
    }

    public function destroy($id)
    {
        $customer = User::find($id);
        if($customer == null)
        {
            $result = [
                'status'=> false,
                'customer'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        } 
        if($customer->delete())
        {
            $result = [
                'status'=> true,
                'customer'=> $customer,
                'message'=>'Xoa du lieu thanh cong',
            ];
            return response()->json($result,200);
        } 
        
    }

    public function status($id)
    {
        $customer = User::find($id);
        if($customer == null)
        {
            $result = [
                'status'=> false,
                'customer'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        }
        $customer->status = ($customer->status == 1) ? 2 : 1;
        if($customer->save())
        {
            $result = [
                'status'=> true,
'customer'=>$customer,
                'message'=>'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result,200);
        } //Luuu vao CSDL
        $result = [
            'status'=> false,
            'customer'=>null,
            'message'=>'Khong the cap nhat du lieu',
        ];
        return response()->json($result,200);    
    }

    public function trash()
    {
        $mang=[['status', '=', 0]];
        $customers = User::where($mang)
        ->orderBy('created_at', 'desc')
        ->get();
        $result = [
            'status'=> true,
            'customers'=>$customers,
            'message'=>'Tai du lieu thanh cong',
        ];
        return response()->json($result,200);

    }

    public function delete($id)
    {
        $customer = User::find($id);
        if($customer == null)
        {
            $result = [
                'status'=> false,
                'customer'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        }
       $customer->status= 0;//0 rác
       $customer->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
       $customer->updated_by= 1;//giá trị loi
       if($customer->save())
       {
           $result = [
               'status'=> true,
               'customer'=>$customer,
               'message'=>'Xóa mẫu tin vào thùng rác thành công',
           ];
           return response()->json($result,200);
       } //Luuu vao CSDL
    }

    public function restore($id)
    {
        $customer = User::find($id);
        if($customer == null)
        {
            $result = [
                'status'=> false,
                'customer'=> null,
                'message'=>'Khong tim thay du lieu',
            ];
            return response()->json($result,404);
        }
       $customer->status= 2;//0 rác
       $customer->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
       $customer->updated_by= 1;//giá trị loi
       if($customer->save())
       {
           $result = [
               'status'=> true,
               'customer'=>$customer,
               'message'=>'khôi phục mẫu tin thành công',
           ];
           return response()->json($result,200);
       } //Luuu vao CSDL       
    }

}