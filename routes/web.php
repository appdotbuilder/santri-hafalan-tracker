<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TahfidzController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome', [
        'auth' => [
            'user' => auth()->user()?->load('role'),
        ]
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Tahfidz routes
    Route::resource('tahfidz', TahfidzController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
