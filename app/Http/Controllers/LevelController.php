<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Level;
use Exception;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
    
        $levels = Level::paginate($perPage);
    
        return response()->json($levels);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validação com regras e mensagens personalizadas
        $validatedData = $request->validate([
            'nivel' => 'required|string|max:100',
        ], [
            'nivel.required' => 'O campo nível é obrigatório.',
            'nivel.string' => 'O campo nível deve ser uma string.',
            'nivel.max' => 'O campo nível não pode ter mais de 100 caracteres.',
        ]);

        try {
            $level = Level::create($validatedData);

            return response()->json($level, 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao tentar cadastrar o nível. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        {
            $validatedData = $request->validate([
                'nivel' => 'required|string|max:255',
            ], [
                'nivel.required' => 'O campo nível é obrigatório.',
                'nivel.string' => 'O campo nível deve ser uma string válida.',
                'nivel.max' => 'O campo nível não pode ter mais que 255 caracteres.',
            ]);
    
            $level = Level::find($id);
    
            if (!$level) {
                return response()->json([
                    'message' => 'Nível não encontrado.',
                ], 404);
            }
    
            try {
                $level->update([
                    'nivel' => $validatedData['nivel'],
                ]);
    
                return response()->json([
                    'message' => 'Nível atualizado com sucesso!',
                    'data' => $level,
                ], 200);
            } catch (Exception $e) {
                return response()->json([
                    'message' => 'Erro ao tentar atualizar o nível.',
                ], 500);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $level = Level::find($id);

        if (!$level) {
            return response()->json([
                'message' => 'Nível não encontrado.',
            ], 404); 
        }

        try {
            $level->delete();

            return response()->json([
                'message' => 'Nível deletado com sucesso!',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao tentar deletar o nível.',
                'error'=> $e->getMessage(),
            ], 500);
        }
    }
}
