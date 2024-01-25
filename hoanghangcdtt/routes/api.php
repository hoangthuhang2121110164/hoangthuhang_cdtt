<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

#Controller Backend 
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderdetailController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExportController;

Route::prefix('brand')->group(function () {
    Route::get('index', [BrandController::class, 'index']);
    Route::get('show/{id}', [BrandController::class, 'show']);
    Route::post('store', [BrandController::class, 'store']);
    Route::post('update/{id}', [BrandController::class, 'update']);
    Route::delete('destroy/{id}', [BrandController::class, 'destroy']);
    Route::get('status/{id}', [BrandController::class, 'status']);
    // Route::get('brand_list/{product_id?}', [CategoryController::class, 'brand_list']);

});

Route::prefix('category')->group(function () {
    Route::get('index', [CategoryController::class, 'index']);
    Route::get('index', [CategoryController::class, 'index']);
    Route::get('show/{id}', [CategoryController::class, 'show']);
    Route::get('status/{id}', [CategoryController::class, 'status']);
    Route::post('store', [CategoryController::class, 'store']);
    Route::post('update/{id}', [CategoryController::class, 'update']);
    Route::delete('destroy/{id}', [CategoryController::class, 'destroy']);
    Route::get('category_list/{parent_id?}', [CategoryController::class, 'category_list']);

});

Route::prefix('banner')->group(function () {
    Route::get('index', [BannerController::class, 'index']);
    Route::get('index', [BannerController::class, 'index']);
    Route::get('show/{id}', [BannerController::class, 'show']);
    Route::post('store', [BannerController::class, 'store']);
    Route::post('update/{id}', [BannerController::class, 'update']);
    Route::delete('destroy/{id}', [BannerController::class, 'destroy']);
    Route::get('status/{id}', [BannerController::class, 'status']);
    Route::get('banner_list/{position}', [BannerController::class, 'banner_list']);
});

Route::prefix('contact')->group(function () {
    Route::get('index', [ContactController::class, 'index']);
    Route::get('index', [ContactController::class, 'index']);
    Route::get('show/{id}', [ContactController::class, 'show']);
    Route::post('store', [ContactController::class, 'store']);
    Route::post('update/{id}', [ContactController::class, 'update']);
    Route::delete('destroy/{id}', [ContactController::class, 'destroy']);
    Route::get('status/{id}', [ContactController::class, 'status']);
});

Route::prefix('menu')->group(function () {
    Route::get('index', [MenuController::class, 'index']);
    Route::get('index', [MenuController::class, 'index']);
    Route::get('show/{id}', [MenuController::class, 'show']);
    Route::post('store', [MenuController::class, 'store']);
    Route::post('update/{id}', [MenuController::class, 'update']);
    Route::delete('destroy/{id}', [MenuController::class, 'destroy']);
    Route::get('status/{id}', [MenuController::class, 'status']);
    Route::get('menu_list/{position}/{parent_id}', [MenuController::class, 'menu_list']);

});

Route::prefix('order')->group(function () {
    Route::get('index', [OrderController::class, 'index']);
    Route::get('index', [OrderController::class, 'index']);
    Route::get('show/{id}', [OrderController::class, 'show']);
    Route::post('store', [OrderController::class, 'store']);
    Route::post('update/{id}', [OrderController::class, 'update']);
    Route::delete('destroy/{id}', [OrderController::class, 'destroy']);
    Route::get('status/{id}', [OrderController::class, 'status']);
    Route::post('export/store', [ExportController::class, 'store']);
});

Route::prefix('orderdetail')->group(function () {
    Route::get('index', [OrderdetailController::class, 'index']);
    Route::get('index', [OrderdetailController::class, 'index']);
    Route::get('show/{id}', [OrderdetailController::class, 'show']);
    Route::post('store', [OrderdetailController::class, 'store']);
    Route::post('update/{id}', [OrderdetailController::class, 'update']);
    Route::delete('destroy/{id}', [OrderdetailController::class, 'destroy']);
    Route::get('status/{id}', [OrderdetailController::class, 'status']);
});
Route::prefix('post')->group(function () {
    Route::get('index', [PostController::class, 'index']);
    Route::get('index', [PostController::class, 'index']);
    Route::get('show/{id}', [PostController::class, 'show']);
    Route::post('store', [PostController::class, 'store']);
    Route::post('update/{id}', [PostController::class, 'update']);
    Route::delete('destroy/{id}', [PostController::class, 'destroy']);
    Route::get('status/{id}', [PostController::class, 'status']);
    Route::get('post_list/{type}/{limit}', [PostController::class, 'post_list']);
    Route::get('post_detail/{slug}', [PostController::class, 'post_detail']);
});

Route::prefix('product')->group(function () {
    Route::get('index', [ProductController::class, 'index']);
    Route::get('index', [ProductController::class, 'index']);
    Route::get('show/{id}', [ProductController::class, 'show']);
    Route::post('store', [ProductController::class, 'store']);
    Route::post('update/{id}', [ProductController::class, 'update']);
    Route::delete('destroy/{id}', [ProductController::class, 'destroy']);
    Route::get('status/{id}', [ProductController::class, 'status']);
    Route::get('sale', [ProductController::class, 'sale']);
    Route::get('import', [ProductController::class, 'import']);
    Route::post('storeimport', [ProductController::class, 'storeimport']);
    Route::post('storesale', [ProductController::class, 'storesale']);
    Route::get('productsale/{limit}', [ProductController::class, 'productsale']);
    Route::get('productnew/{limit}', [ProductController::class, 'productnew']);
    Route::get('producthotbuy/{limit}', [ProductController::class, 'producthotbuy']);
    Route::get('product_detail/{slug}', [ProductController::class, 'product_detail']);
    Route::get('product_category/{limit}/{category_id}', [ProductController::class, 'product_category']);
    Route::get('product_all/{limit}', [ProductController::class, 'product_all']);

});

Route::prefix('topic')->group(function () {
    Route::get('index', [TopicController::class, 'index']);
    Route::get('show/{id}', [TopicController::class, 'show']);
    Route::post('store', [TopicController::class, 'store']);
    Route::post('update/{id}', [TopicController::class, 'update']);
    Route::delete('destroy/{id}', [TopicController::class, 'destroy']);
    Route::get('status/{id}', [TopicController::class, 'status']);

});

Route::prefix('user')->group(function () {
    Route::get('index', [UserController::class, 'index']);
    Route::get('index', [UserController::class, 'index']);
    Route::get('show/{id}', [UserController::class, 'show']);
    Route::post('store', [UserController::class, 'store']);
    Route::post('update/{id}', [UserController::class, 'update']);
    Route::delete('destroy/{id}', [UserController::class, 'destroy']);
    Route::get('status/{id}', [UserController::class, 'status']);
});
Route::prefix('customer')->group(function () {
    Route::get('index', [CustomerController::class, 'index']);
    Route::get('index', [CustomerController::class, 'index']);
    Route::get('show/{id}', [CustomerController::class, 'show']);
    Route::post('store', [CustomerController::class, 'store']);
    Route::post('update/{id}', [CustomerController::class, 'update']);
    Route::delete('destroy/{id}', [CustomerController::class, 'destroy']);
    Route::get('status/{id}', [CustomerController::class, 'status']);
});
Route::get("/dashboard", [DashboardController::class, 'index'])->name('dashboard.index');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
