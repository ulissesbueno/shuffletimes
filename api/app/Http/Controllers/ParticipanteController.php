<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Participante;

class ParticipanteController extends Controller
{
    // Método para listar todos os participantes
    public function getParticipantes()
    {
        $participantes = Participante::all();
        return response($participantes);
    }

    // Método para distribuir jogadores em times
    public function shuffleTime(Request $request)
    {
        $numeroDeTimes = $request->input('numeroDeTimes');

        // Recuperar todos os participantes
        $participantes = Participante::all()->values();

        // Certificar-se de que há pelo menos um participante e o número de times é maior que 0
        if ($participantes->isEmpty() || $numeroDeTimes <= 0) {
            return redirect()->back()->with('error', 'Nenhum participante ou número de times inválido.');
        }

        // Embaralhar a ordem dos participantes
        $participantesEmbaralhados = $participantes->shuffle();

        // Dividir os participantes em times igualmente
        $times = [];
        $time = [];
        $totalPorTime = $participantesEmbaralhados->count() / $numeroDeTimes;
        for ($i = 0; $i < $participantesEmbaralhados->count(); $i++) {
            array_push($time, $participantesEmbaralhados[$i]);
            if (count($time) >= $totalPorTime) {
                $times[] = $time;
                $time = [];
            }
        }

        // Você pode fazer algo com os times aqui, como salvá-los no banco de dados ou exibi-los na view

        return response()->json($times);
    }

    public function adicionarParticipante(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
        ]);

        $participante = new Participante();
        $participante->nome = $request->input('nome');
        $participante->telefone = $request->input('telefone');
        $participante->save();

        return response()->json([
            "success" => true
        ]);
    }
}
