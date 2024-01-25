<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    function index()
    {
        $orders = Order::where('status', '!=', 0)
            ->orderdetailBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Order::count();
        $result = [
            'status' => true,
            'orders' => $orders,
            'message' => 'tai du lieu thamh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    public function show($id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'order' => $order,
            'message' => 'tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }
    function store(Request $request)
    {
        $order = new Order(); //Đối tượng mới

        $order->user_id = $request->user_id;
        $order->exportdate = $request->exportdate;
        $order->deliveryaddress = $request->deliveryaddress;
        $order->deliveryname = $request->deliveryname;
        $order->deliveryphone = $request->deliveryphone;
        $order->deliveryemail = $request->deliveryemail;
        $order->created_at = date('Y-m-d H:i:s'); //Ngày tạo
        $order->created_by = Auth::id() ?? 1; //Đăng nhập
        $order->updated_by = 1;
        $order->status = $request->status;
        //Upload file
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis') . '.' . $extension;
                $order->image = $filename;
                $image->move(public_path('images/order'), $filename);
            }
        }
        //end upload file
        if ($order->save()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'khong the them du lieu ',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $order->user_id = $request->user_id;
        $order->exportdate = $request->exportdate;
        $order->deliveryaddress = $request->deliveryaddress;
        $order->deliveryname = $request->deliveryname;
        $order->deliveryphone = $request->deliveryphone;
        $order->deliveryemail = $request->deliveryemail;
        $order->created_at = date('Y-m-d H:i:s'); //Ngày tạo
        $order->created_by = 1; //Đăng nhập
        $order->updated_by = Auth::id() ?? 1;
        $order->status = $request->status;
        //Upload file
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis') . '.' . $extension;
                $order->image = $filename;
                $image->move(public_path('images/order'), $filename);
            }
        }
        //end upload file
        if ($order->save()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'cap naht du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'khong the them du lieu ',
        ];
        return response()->json($result, 200);
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        if ($order->delete()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'cap naht du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'khong the them du lieu',
        ];
        return response()->json($result, 200);
    }
}
