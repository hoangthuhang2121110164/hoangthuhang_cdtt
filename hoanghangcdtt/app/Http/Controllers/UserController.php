<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function index()
    {
        $users = User::where('status', '!=', 0)
            ->userdetailBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = User::count();
        $result = [
            'status' => true,
            'users' => $users,
            'message' => 'tai du lieu thamh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    public function show( $id)
    {
        $user = User::find($id);
        if($user==null)
        {
            $result = [
                    'status' => false,
                    'user' => null,
                    'message' => 'khong tim thay du lieu',
            ];
     return response()->json($result, 404);
        }
            $result=[
                'status' => true,
                'user' => $user,
                'message' => 'tai du lieu thanh cong',
            ];
    return response()->json($result, 200);
}
    function store(Request $request)
 { 
    $user = new User(); //Đối tượng mới
    $user->name = $request->name;
    $user->username = $request->username;
    $user->password = bcrypt($request->password);
    $user->email = $request->email;
    $user->gender = $request->gender;
    $user->phone = $request->phone;
    $user->image = $request->image;
    $user->roles = $request->roles;

    $user->created_at = date('Y-m-d H:i:s'); //Ngày tạo
    $user->created_by = Auth::id() ?? 1; //Đăng nhập
    $user->updated_by = 1;
    $user->status = $request->status;
    //Upload file
       $image = $request->image;
       if($image != null){
          $extension = $image->getClientOriginalExtension();
          if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
            $filename = date('YmdHis') . '.' . $extension;
            $user->image = $filename;
            $image->move(public_path('images/user'), $filename);
          }
       }
    //end upload file
    if($user->save())
    {
        $result=[
            'status' => true,
            'user' => $user,
            'message' => 'them du lieu thanh cong',
        ];
    return response()->json($result, 200);
}
$result=[
    'status' => false,
    'user' => null,
    'message' => 'khong the them du lieu ',
];
return response()->json($result, 200);
}

function update(Request $request,$id)
{
    $user = User::find($id);
    if($user==null){
    $result = [
        'status' => false,
        'user' => null,
        'message' => 'khong tim thay du lieu',
];
return response()->json($result, 404);
}
$user->name = $request->name;
$user->username = $request->username;
$user->password = bcrypt($request->password);
$user->email = $request->email;
$user->gender = $request->gender;
$user->phone = $request->phone;
$user->image = $request->image;
$user->roles = $request->roles;

        $user->created_at = date('Y-m-d H:i:s'); //Ngày tạo
        $user->created_by = 1; //Đăng nhập
        $user->updated_by = Auth::id() ?? 1;
        $user->status = $request->status;
        //Upload file
        $image = $request->image;
        if($image != null){
           $extension = $image->getClientOriginalExtension();
           if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
             $filename = date('YmdHis') . '.' . $extension;
             $user->image = $filename;
             $image->move(public_path('images/user'), $filename);
           }
        }
        //end upload file
        if($user->save())
    {
        $result=[
            'status' => true,
            'user' => $user,
            'message' => 'cap naht du lieu thanh cong',
        ];
    return response()->json($result, 200);
}
$result=[
    'status' => false,
    'user' => null,
    'message' => 'khong the them du lieu ',
];
return response()->json($result, 200);
}

public function destroy($id)
{
    $user =User::find($id);
    if($user == null)
    {
        $result =[
            'status' => false,
            'user' => null,
            'message' => 'khong tim thay du lieu',
        ];
        return response()->json($result, 404);
    }
    if($user->delete())
    {
        $result=[
            'status' => true,
            'user' => $user,
            'message' => 'cap naht du lieu thanh cong',
        ];
    return response()->json($result, 200);
    }
    $result=[
        'status' => false,
        'user' => null,
        'message' => 'khong the them du lieu',
    ];
return response()->json($result, 200);
}
}


