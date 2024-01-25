<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use App\Models\Contact;

class ContactController extends Controller
{
    function index()
    {
        $contacts = Contact::where('status', '!=', 0)
        ->orderBy('created_at','desc')
        ->select('id', 'name','user_id', 'status')
        ->get();
        $total = Contact::count();
        $result=[
            'status' => true,
            'contacts' => $contacts,
            'message' => 'tai du lieu thanh cong',
            'total' => $total,
        ];
        return response ()->json($result, 200);
    }

    function show($id)
    {
        $contact = Contact::find($id);
        if ($contact == null)
        {
            $result=[
                'status' => false,
                'contact' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response ()->json($result, 404);
        }
        
        $result=[
            'status' => true,
            'contact' => $contact,
            'message' => 'tai du lieu thanh cong',
        ];
        return response ()->json($result, 200);
    }
    
    public function store(Request $request)
    {
        $contact = new Contact();
        $contact->name = $request->name; //form
        $contact->email = $request->email; //form
        $contact->phone = $request->phone; //form
        $contact->title = $request->title; //form
        $contact->content = $request->content; //form
        $contact->created_at = date('Y-m-d H:i:s');
        $contact->created_by = 1;
        $contact->save(); //Luuu vao CSDL
        return response()->json(
            ['success' => true, 'message' => 'Thành công', 'contact' => $contact],
            201
        );
    }

    function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        if ($contact == null)
        {
            $result=[
                'status' => false,
                'contact' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response ()->json($result, 404);
        }
        $contact->name = $request->name;
        $contact->user_id = $request->user_id;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->content = $request->content;
        $contact->replay_id = $request->replay_id;
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = 1;
        $contact->status = $request->status;
        if($contact->save())
        {
            $result =[
                'status' => true,
                'contact' => $contact,
                'message' => 'Cap nhat du lieu thanh cong',    
            ];
            return response ()->json($result, 200);
        }
        $result =[
            'status' => false,
            'contact' => null,
            'message' => 'khong the them du lieu',    
        ];
        return response ()->json($result, 200);
    }
    function destroy($id)
    {
        $contact = Contact::find($id);
        if ($contact == null){
            $result = [
                'status' => false,
                'contact' => $contact,
                'message' => 'khong tim thay du lieu',    
            ];
            return response ()->json($result, 404);
        }
        if($contact->delete())
        {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Xoa du lieu thanh cong',    
            ];
            return response ()->json($result, 200);
        }
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'khong the them du lieu',    
        ];
        return response ()->json($result, 200);
    }
}

