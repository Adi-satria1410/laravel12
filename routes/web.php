<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('login');

// Update route register untuk menggunakan controller
Route::get('/register', function () {
    return Inertia::render('auth/register');
})->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])->middleware('guest');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/auth/{provider}/redirect', [SocialiteController::class, 'redirect']);
Route::get('/auth/{provider}/callback', [SocialiteController::class, 'callback']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
