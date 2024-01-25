<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function getlogin()
    {
        return view('backend.user.login');
    }

    public function postlogin(Request $request)
    {
        $username = $request->username;
        $data = array('password' => $request->password);
        if (filter_var($username, FILTER_VALIDATE_EMAIL)){
            $data['email'] = $username;
        }
        else{
            $data['username'] = $username;
        }
      //  var_dump($data);
        if (Auth::attempt($data)) {
           return redirect()->route('dashboard.index');
        //  echo "Thành công";
        }
        else{
            //echo "Đăng nhập thất bại";
          return view('backend.user.login', ['message' => 'Tài khoản không chính xác']);
       //  return view('backend.user.login', ['message' => bcrypt('123456')]);
        }

    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('admin.getlogin');
    } 
}
