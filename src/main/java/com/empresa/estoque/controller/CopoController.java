package com.empresa.estoque.controller;

import com.empresa.estoque.entity.Copo;
import com.empresa.estoque.service.CopoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/copos")  // Adicione esta anotação
@CrossOrigin(origins = "http://localhost:5173")  // Permite conexão com o frontend
public class CopoController {
    
    @Autowired
    private CopoService copoService;

    @GetMapping  // Mapeia GET /api/copos
    public ResponseEntity<List<Copo>> listarTodos() {
        return ResponseEntity.ok(copoService.listarTodos());
    }

    @GetMapping("/{id}")  // Mapeia GET /api/copos/{id}
    public ResponseEntity<Copo> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(copoService.buscarPorId(id));
    }

    @PostMapping  // Mapeia POST /api/copos
    public ResponseEntity<Copo> criarCopo(@RequestBody Copo copo) {
        return ResponseEntity.status(201).body(copoService.criarCopo(copo));
    }

    @PutMapping("/{id}")  // Mapeia PUT /api/copos/{id}
    public ResponseEntity<Copo> atualizarCopo(
            @PathVariable Long id,
            @RequestBody Copo copoAtualizado) {
        return ResponseEntity.ok(copoService.atualizarCopo(id, copoAtualizado));
    }

    @DeleteMapping("/{id}")  // Mapeia DELETE /api/copos/{id}
    public ResponseEntity<Void> removerCopo(@PathVariable Long id) {
        copoService.removerCopo(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/adicionar-estoque")  // Mapeia PATCH /api/copos/{id}/adicionar-estoque
    public ResponseEntity<Copo> adicionarEstoque(
            @PathVariable Long id,
            @RequestParam int quantidade) {
        return ResponseEntity.ok(copoService.adicionarAoEstoque(id, quantidade));
    }

    @PatchMapping("/{id}/remover-estoque")  // Mapeia PATCH /api/copos/{id}/remover-estoque
    public ResponseEntity<Copo> removerEstoque(
            @PathVariable Long id,
            @RequestParam int quantidade) {
        return ResponseEntity.ok(copoService.removerDoEstoque(id, quantidade));
    }

    @GetMapping("/por-cor")  // Mapeia GET /api/copos/por-cor?cor=xxx
    public ResponseEntity<List<Copo>> buscarPorCor(@RequestParam String cor) {
        return ResponseEntity.ok(copoService.buscarPorCor(cor));
    }

    @GetMapping("/estoque-baixo")  // Mapeia GET /api/copos/estoque-baixo?limite=xx
    public ResponseEntity<List<Copo>> buscarEstoqueBaixo(
            @RequestParam(defaultValue = "10") int limite) {
        return ResponseEntity.ok(copoService.buscarComEstoqueBaixo(limite));
    }
}