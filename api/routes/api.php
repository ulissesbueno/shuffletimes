<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\ParticipanteController;


Route::get('/', function(){
    return "api";
});

Route::get('/participantes', [ParticipanteController::class, 'getParticipantes']);
Route::post('/shuffletime', [ParticipanteController::class, 'shuffleTime']);
Route::post('/participantes/adicionar', [ParticipanteController::class, 'adicionarParticipante']);




