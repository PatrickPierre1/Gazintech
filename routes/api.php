<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::get('/user', [UserController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/levels', [LevelController::class, 'store']);
