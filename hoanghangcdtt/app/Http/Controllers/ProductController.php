<?php

namespace App\Http\Controllers;


use App\Models\Category;
use App\Models\Orderdetail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use App\Models\Product;
use App\Models\ProductSale;
use App\Models\ProductStore;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    function index()
    {
        $mang=[['status', '!=', 0]];
        $products = Product::where($mang)
        ->orderBy('created_at', 'desc')
        ->select('id', 'name','slug', 'status', 'image', 'category_id', 'brand_id')
        ->get();
        $list_category = Category::where('status', '!=', 0)->orderBy('created_at', 'desc')->select('id', 'name')->get();
        $list_brand = product::where('status', '!=', 0)->orderBy('created_at', 'desc')->select('id', 'name')->get();
        $total = Product::count();
        $result = [
            'status'=> true,
            'products'=>$products,
            'list_category'=>$list_category,
            'list_brand'=>$list_brand,
            'message'=>'Tai du lieu thanh cong',
            'total'=> $total
        ];
        return response()->json($result,200);
    }
    function show($id)
    {
        $product = Product::find($id);
        if ($product == null)
        {
            $result=[
                'status' => false,
                'product' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response ()->json($result, 404);
        }
        
        $result=[
            'status' => true,
            'product' => $product,
            'message' => 'tai du lieu thanh cong',
        ];
        return response ()->json($result, 200);
    }
    public function status($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $product->status = ($product->status === 1) ? 2 : 1;
        $product->updated_at = date('Y-m-d H:i:s'); //Ngày tạo
        $product->updated_by = 1; //Đăng nhập
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'tai du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'khong tim thay du lieu',
        ];
        return response()->json($result, 200);
    }
    function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->slug = Str::of($request->name)->slug('-');
        //upload file
           $image = $request->image;
           if($image != null){
              $extension = $image->getClientOriginalExtension();
              if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis'). '.' . $extension;
                $image->move(public_path('images/product'), $filename);
                $product->image = $filename;
              }
           }
        //end upload file
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->detail = $request->detail;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->created_at = date('Y-m-d H:i:s');
        $product->created_by = 1;
        $product->status = $request->status;
        if($product->save())
        {
            $result =[
                'status' => true,
                'product' => $product,
                'message' => 'Them du lieu thanh cong',    
            ];
            return response ()->json($result, 200);
        }
        $result =[
            'status' => false,
            'product' => null,
            'message' => 'khong tim thay du lieu',    
        ];
        return response ()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product == null)
        {
            $result=[
                'status' => false,
                'product' => null,
                'message' => 'khong tim thay du lieu',
            ];
            return response ()->json($result, 404);
        }
        $product->name = $request->name;
        $product->slug = Str::of($request->name)->slug('-');
        //upload file
           $image = $request->image;
           if($image != null){
              $extension = $image->getClientOriginalExtension();
              if(in_array($extension, ['jpg', 'png', 'gif', 'web', 'jpeg'])) {
                $filename = date('YmdHis'). '.' . $extension;
                $image->move(public_path('images/product'), $filename);
                $product->image = $filename;
              }
           }   
        //end upload file
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->detail = $request->detail;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1;
        $product->status = $request->status;
        if($product->save())
        {
            $result =[
                'status' => true,
                'product' => $product,
                'message' => 'Cap nhat du lieu thanh cong',    
            ];
            return response ()->json($result, 200);
        }
        $result =[
            'status' => false,
            'product' => null,
            'message' => 'khong the them du lieu',    
        ];
        return response ()->json($result, 200);
    }
    function destroy($id)
    {
        $product = Product::find($id);
        if ($product == null){
            $result = [
                'status' => false,
                'product' => $product,
                'message' => 'khong tim thay du lieu',    
            ];
            return response ()->json($result, 404);
        }
        if($product->delete())
        {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Xoa du lieu thanh cong',    
            ];
            return response ()->json($result, 200);
        }
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'khong the them du lieu',    
        ];
        return response ()->json($result, 200);
    }
    public function sale()
    {
        $products = Product::where('product.status', '!=', 0)
        ->join('productsale', 'productsale.product_id', '=', 'product.id')
        ->select('product.name','product.image', 'productsale.pricesale', 'product.price', 'productsale.date_begin', 'productsale.date_end')
        ->get();
        $result =[
            'status' => true,
            'products' => $products,
            'message' => 'Cap nhat du lieu thanh cong',    
        ];
        return response ()->json($result, 200);
    }
    public function storesale(Request $request)
    {
        $productsale = new ProductSale();
        $productsale->product_id = $request->product_id;
        $productsale->qty =500;
        $productsale->pricesale  = $request->pricesale;
        $productsale->date_begin = $request->date_begin;
        $productsale->date_end = $request->date_end;
        $productsale->created_at = date('Y-m-d H:i:s');
        $productsale->created_by = 1;
        if ($productsale->save()){
            $result =[
                'status' => true,
                'productsale' => $productsale,
                'message' => 'Thêm dữ liệu vào bảng khuyến mãi thành công',    
            ];
            return response ()->json($result, 200);
        }
        $result =[
            'status' => false,
            'productsale' => null,
            'message' => 'Lỗi',    
        ];
        return response ()->json($result, 200);
    }
    public function import()

    {
        $productstore=ProductStore::select('product_id', DB::raw('SUM(qty)as sum_qty'),DB::raw('AVG(price)as avg_price'))
        ->groupBy('product_id');
        $products = Product::where('product.status', '!=', 0)
        ->join('category', 'category.id', '=', 'product.category_id')
        ->join('brand', 'brand.id', '=', 'product.brand_id')
        ->leftJoinSub($productstore,"productstore",function($join){
            $join->on('product.id','=','productstore.product_id');
        })
        ->select ('product.id', 'product.slug','product.image', 'product.created_at', 'product.status',
    'product.name', 'category.name as categoryname', 'brand.name as brandname',
    'productstore.sum_qty', 'productstore.avg_price')
    ->orderBy('created_at','desc')->get();
    $result =[
        'status' => true,
        'products' => $products,
        'message' => 'tai du lieu thanh cong',    
    ];
    return response ()->json($result, 200);
    }
public function storeimport(Request $request)
{
    $productstore = new ProductStore();
    $productstore->product_id = $request->id;
    $productstore->qty = $request->qty;
    $productstore->price  = $request->price;


    $productstore->created_at = date('Y-m-d H:i:s');
    $productstore->created_by = Auth::id()?? 1;
    if ($productstore->save()){
        $result =[
            'status' => true,
            'productsale' => $productstore,
            'message' => 'tai thành công',    
        ];
        return response ()->json($result, 200);
    }
    $result =[
        'status' => false,
        'productsale' => null,
        'message' => 'Lỗi',    
    ];
    return response ()->json($result, 200);
}

    ////////////////fonend
    public function productnew($limit)
    {
                $productstore =ProductStore::select ('product_id',DB::raw('SUM(qty)as sum_qty'))
                ->groupBy('product_id');
                $products =Product::where('product.status','=',1)
                ->joinSub($productstore,'productstore',function ($join){
                $join->on('productstore.product_id','=','product.id');
                })
                ->orderBy('product.created_at','desc')
                ->select("product.id","product.name","product.image","product.price","product.slug")
                ->limit($limit)
                ->get();
                $result =[
                    'status' => false,
                    'products' => $products,
                    'message' => 'tai du lieu thanh cong',    
                ];
return response ()->json($result, 200);
    }

    ////////
    public function producthotbuy($limit)
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as sum_qty'))
        ->groupBy('product_id');
        $orderdetail = Orderdetail::select('product_id', DB::raw('SUM(qty) as order_qty'))
        ->groupBy('product_id');
        $products= Product::where("product.status", "=", 1)
        ->joinSub($productstore, 'productstore', function ($join) {
           $join->on('productstore.product_id', '=', 'product.id');
        })
        ->joinSub($orderdetail, 'orderdetail', function ($join) {
            $join->on('orderdetail.product_id', '=', 'product.id');
         }) 
         ->orderBy('orderdetail.order_qty', 'desc')
         ->select('product.id','product.name', 'product.image', 'product.price', 'product.slug')
         ->limit($limit)
         ->get();
         $result = [
            'status'=> true,
            'products'=>$products,
            'message'=>'Tai du lieu thanh cong',
        ];
        return response()->json($result,200);

     }
///////
public function productsale($limit)
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as sum_qty'))
        ->groupBy('product_id');
        $products= Product::where("product.status", "=", 1)
        ->where('productsale.date_begin', '<=', Carbon::now())
        ->where('productsale.date_end', '>=', Carbon::now())
        ->joinSub($productstore, 'productstore', function ($join) {
           $join->on('productstore.product_id', '=', 'product.id');
        })
        ->leftJoin('productsale', 'productsale.product_id', '=', 'product.id')
         ->orderBy('product.created_at', 'desc')
         ->select('product.id','product.name', 'product.image', 'product.price', 'product.slug')
         ->limit($limit)
         ->get();
         $result = [
            'status'=> true,
            'products'=>$products,
            'message'=>'Tai du lieu thanh cong',
        ];
        return response()->json($result,200);

     }

     public function product_detail($slug)
     {
         $product = Product::where('slug', $slug)->first();    
         $catid = $product->category_id;  
         $listid = array();
          array_push($listid, $catid);
          $args_cat1 = [
              ['parent_id', '=', $catid],
              ['status', '=', 1]
          ];
          $list_category1 = Category::where($args_cat1)->get();
          if (count($list_category1) > 0) {
              foreach ($list_category1 as $row1) {
                  array_push($listid, $row1->id);
                  $args_cat2 = [
                      ['parent_id', '=', $row1->id],
                      ['status', '=', 1]
                  ];
                  $list_category2 = Category::where($args_cat2)->get();
                  if (count($list_category2) > 0) {
                      foreach ($list_category2 as $row2) {
                          array_push($listid, $row2->id);
                      }
                  }
              }
          }
          $args = [
              ['id', '!=', $product->id],
              ['status', '=', 1]
          ];
          $product_orther = Product::where( $args)
          ->whereIn('category_id', $listid)
          ->orderBy('created_at', 'DESC')
          ->select('id', 'name', 'price', 'category_id', 'brand_id','status', 'image', 'product.slug')
          ->limit(8)
          ->get();
      
          $result = [
             'status'=> true,
             'product'=>$product,
             'message'=>'Tai du lieu thanh cong',
             'product_orther'=>$product_orther,
         ];
         return response()->json($result,200);
         }


  public function product_category($limit,$category_id)
         {
            $listid = array();
              array_push($listid, $category_id  + 0);
              $args_cat1 = [
                  ['parent_id', '=', $category_id + 0],
                  ['status', '=', 1]
              ];
              $list_category1 = Category::where($args_cat1)->get();
              if (count($list_category1) > 0) {
                  foreach ($list_category1 as $row1) {
                      array_push($listid, $row1->id);
                      $args_cat2 = [
                          ['parent_id', '=', $row1->id],
                          ['status', '=', 1]
                      ];
                      $list_category2 = Category::where($args_cat2)->get();
                      if (count($list_category2) > 0) {
                          foreach ($list_category2 as $row2) {
                              array_push($listid, $row2->id);
                          }
                      }
                  }
              }
              $products= Product::where( 'status',1)
              ->whereIn('category_id', $listid)
              ->orderBy('created_at', 'DESC')
              ->select('id', 'name', 'price', 'category_id', 'brand_id','status', 'image', 'product.slug')
              ->limit($limit)
              ->get();
          
              $result = [
                 'status'=> true,
                 'products'=>$products,
                 'message'=>'Tai du lieu thanh cong',
            
             ];
             return response()->json($result,200);
             }
public function product_all($limit)
{
    $products = Product::where('product.status', '=', 1)
            ->join('category', 'category.id', '=', 'product.category_id')
            ->join('brand', 'brand.id', '=', 'product.brand_id')
            ->orderBy('product.created_at', 'desc')
            ->select('product.id', 'product.name', 'product.slug', 'product.price', 'category.name as catname', 'brand.name as braname','product.status', 'product.image')
            ->orderBy('product.created_at', 'DESC')
            ->limit($limit)
            ->get();
        $result = [
                'status'=> true,
                'products'=>$products,
                'message'=>'Tai du lieu thanh cong',
            ];
            return response()->json($result,200);
        }
public function product_brand($limit, $product_id)
    {
        $products = Product::where([['brand_id', $product_id], ['status', 1]])
            ->orderBy('created_at', 'DESC')
            ->select('id', 'name', 'price', 'category_id', 'brand_id','status', 'image', 'product.slug')
            ->limit($limit)
            ->get();
            $result = [
                'status'=> true,
                'products'=>$products,
                'message'=>'Tai du lieu thanh cong',
            ];
            return response()->json($result,200);
    }
}