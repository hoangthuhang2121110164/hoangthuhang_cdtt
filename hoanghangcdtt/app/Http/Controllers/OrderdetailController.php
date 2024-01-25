<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Orderdetail;
use Illuminate\Http\Request;

class OrderdetailController extends Controller
{
    function index()
    {
        $orderdetails = Orderdetail::where('status', '!=', 0)
            ->orderdetaildetailBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Orderdetail::count();
        $result = [
            'status' => true,
            'orderdetails' => $orderdetails,
            'message' => 'tai du lieu thamh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    public function show( $id)
    {
        $orderdetail = Orderdetail::find($id);
        if($orderdetail==null)
        {
            $result = [
                    'status' => false,
                    'orderdetail' => null,
                    'message' => 'khong tim thay du lieu',
            ];
     return response()->json($result, 404);
        }
            $result=[
                'status' => true,
                'orderdetail' => $orderdetail,
                'message' => 'tai du lieu thanh cong',
            ];
    return response()->json($result, 200);
}
    function store(Request $request)
 { 
    $orderdetail = new Orderdetail(); //Đối tượng mới
    $orderdetail->name = $request->name;
    $orderdetail->slug = Str::of($request->name)->slug('-');
    $orderdetail->sort_orderdetaildetail = $request->sort_orderdetaildetail;
    $orderdetail->description = $request->description;
    $orderdetail->created_at = date('Y-m-d H:i:s'); //Ngày tạo
    $orderdetail->created_by = Auth::id() ?? 1; //Đăng nhập
    $orderdetail->updated_by = 1;
    $orderdetail->status = $request->status;
 
    if($orderdetail->save())
    {
        $result=[
            'status' => true,
            'orderdetail' => $orderdetail,
            'message' => 'them du lieu thanh cong',
        ];
    return response()->json($result, 200);
}
$result=[
    'status' => false,
    'orderdetail' => null,
    'message' => 'khong the them du lieu ',
];
return response()->json($result, 200);
}

function update(Request $request,$id)
{
    $orderdetail = Orderdetail::find($id);
    if($orderdetail==null){
    $result = [
        'status' => false,
        'orderdetail' => null,
        'message' => 'khong tim thay du lieu',
];
return response()->json($result, 404);
}
        $orderdetail->name = $request->name;
        $orderdetail->slug = Str::of($request->name)->slug('-');
        $orderdetail->sort_orderdetaildetail = $request->sort_orderdetaildetail;
        $orderdetail->description = $request->description;
        $orderdetail->created_at = date('Y-m-d H:i:s'); //Ngày tạo
        $orderdetail->created_by = 1; //Đăng nhập
        $orderdetail->updated_by = Auth::id() ?? 1;
        $orderdetail->status = $request->status;
      
        if($orderdetail->save())
    {
        $result=[
            'status' => true,
            'orderdetail' => $orderdetail,
            'message' => 'cap naht du lieu thanh cong',
        ];
    return response()->json($result, 200);
}
$result=[
    'status' => false,
    'orderdetail' => null,
    'message' => 'khong the them du lieu ',
];
return response()->json($result, 200);
}

public function destroy($id)
{
    $orderdetail =Orderdetail::find($id);
    if($orderdetail == null)
    {
        $result =[
            'status' => false,
            'orderdetail' => null,
            'message' => 'khong tim thay du lieu',
        ];
        return response()->json($result, 404);
    }
    if($orderdetail->delete())
    {
        $result=[
            'status' => true,
            'orderdetail' => $orderdetail,
            'message' => 'cap naht du lieu thanh cong',
        ];
    return response()->json($result, 200);
    }
    $result=[
        'status' => false,
        'orderdetail' => null,
        'message' => 'khong the them du lieu',
    ];
return response()->json($result, 200);
}
}


