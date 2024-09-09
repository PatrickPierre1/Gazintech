<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LevelRequest;
use App\Models\Level;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 8);

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
    public function store(LevelRequest $request)
    {
        try {
            $level = Level::create($request->validated());

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
    public function show(string $id): JsonResponse
    {
        try {
            $level = Level::findOrFail($id);

            return response()->json([
                'level' => $level,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Nível não encontrado.',
                'error' => $e->getMessage(),
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao tentar obter os dados do nível. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
    public function update(LevelRequest $request, string $id): JsonResponse
    {
        try {
            $level = Level::findOrFail($id);

            $level->update($request->validated());

            return response()->json([
                'message' => 'Nível atualizado com sucesso!',
                'level' => $level,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Nível não encontrado.',
                'error' => $e->getMessage(),
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao tentar atualizar o nível. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
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
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
