<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\DraftController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::prefix('/articles')->group(function() {
//     Route::get('/', [ArticleController::class, 'index']);
//     Route::post('/', [ArticleController::class, 'post']); 
//     Route::get('/categories', [ArticleController::class, 'get_categories']); 
//     Route::get('/months', [ArticleController::class, 'get_months']);
//     Route::get('/{id_or_category}', [ArticleController::class, 'get_article_by_id_or_category']);
//     Route::prefix('{id}')->group(function() {
//         Route::put('/', [ArticleController::class, 'update']);
//         Route::delete('/', [ArticleController::class, 'delete']);
//     });
//     Route::get('/{year}/{month}', [ArticleController::class, 'get_articles_by_year_month']); 
// });

Route::get('/articles', [ArticleController::class, 'index']);
Route::post('/articles', [ArticleController::class, 'post']);
//order is important
Route::get('/articles/categories', [ArticleController::class, 'get_categories']);
Route::get('/articles/months', [ArticleController::class, 'get_months']);
Route::get('/articles/{id_or_category}', [ArticleController::class, 'get_article_by_id_or_category']);
Route::put('/articles/{id}', [ArticleController::class, 'update']);
Route::delete('/articles/{id}', [ArticleController::class, 'delete']);
Route::get('/articles/{year}/{month}', [ArticleController::class, 'get_articles_by_year_month']);

Route::get('/drafts', [DraftController::class, 'index']);
Route::post('/drafts', [DraftController::class, 'post']);
Route::put('/drafts/{id}', [DraftController::class, 'update']);
Route::delete('/drafts/{id}', [DraftController::class, 'delete']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'post']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'delete']);

Route::get('/images', [ImageController::class, 'index']);
Route::post('/images', [ImageController::class, 'post']);
Route::get('/images/{id}', [ImageController::class, 'return_image']);
Route::put('/images/{id}', [ImageController::class, 'update']);
Route::delete('/images/{id}', [ImageController::class, 'delete']);
