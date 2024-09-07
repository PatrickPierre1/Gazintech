<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
//Route::middleware('auth:sanctum')->post('/levels', [LevelController::class, 'store']);

// Rotas para Levels 
Route::get('/levels', [LevelController::class, 'index']);
Route::post('/levels', [LevelController::class,'store']);
Route::put('/levels/{id}', [LevelController::class,'update']);
Route::delete('/levels/{id}', [LevelController::class,'destroy']);

Route::post('/register', [AuthController::class, 'register']);
Route::get('/user', [UserController::class, 'index']);




