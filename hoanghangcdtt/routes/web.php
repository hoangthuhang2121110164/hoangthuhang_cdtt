<?php

#Controller Backend 
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;



Route::prefix('banner')->group(function (){
    Route::get('index', [BannerController::class, 'index']);
});

Route::prefix('brand')->group(function (){
    Route::get('index', [BrandController::class, 'index']);
});

Route::prefix('category')->group(function (){
    Route::get('index', [CategoryController::class, 'index']);
});





Route::get("/dashboard",[DashboardController::class, 'index'])->name('dashboard.index');
