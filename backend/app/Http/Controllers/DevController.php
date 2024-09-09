<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeveloperRequest;
use App\Models\Developer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DevController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        // Pagina 10 desenvolvedores por página
        $developers = Developer::with('level')->paginate(8);

        return response()->json($developers);
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
    public function store(DeveloperRequest $request): JsonResponse
    {
        try {
            $developer = Developer::create($request->validated());

            return response()->json([
                'message' => 'Desenvolvedor criado com sucesso!',
                'developer' => $developer->load('level'),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao tentar cadastrar o desenvolvedor. Por favor, tente novamente.',
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
            $developer = Developer::with('level')->findOrFail($id);

            return response()->json([
                'developer' => $developer,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Desenvolvedor não encontrado.',
                'error' => $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao tentar obter os dados do desenvolvedor. Por favor, tente novamente.',
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
    public function update(DeveloperRequest $request, string $id): JsonResponse
    {
        try {
            $developer = Developer::findOrFail($id);

            $developer->update($request->validated());

            return response()->json([
                'message' => 'Desenvolvedor atualizado com sucesso!',
                'developer' => $developer->load('level'),
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Desenvolvedor não encontrado.',
                'error' => $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao tentar atualizar o desenvolvedor. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $developer = Developer::findOrFail($id);

            $developer->delete();

            return response()->json([
                'message' => 'Desenvolvedor removido com sucesso!',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Desenvolvedor não encontrado.',
                'error' => $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao tentar remover o desenvolvedor. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
