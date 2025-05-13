package com.empresa.estoque.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.empresa.estoque.entity.Copo;
import com.empresa.estoque.repository.CopoRepository;

import java.util.List;

@Service
public class CopoService {

    private final CopoRepository copoRepository;

    
    public CopoService(CopoRepository copoRepository) {
        this.copoRepository = copoRepository;
    }

    // Criação com validação de duplicados
    @Transactional
    public Copo criarCopo(Copo copo) {
        if (existeCopoComMesmasCaracteristicas(copo)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Copo já cadastrado com estas características");
        }
        return copoRepository.save(copo);
    }

    // Atualização completa
    @Transactional
    public Copo atualizarCopo(Long id, Copo copoAtualizado) {
        return copoRepository.findById(id)
            .map(copo -> {
                copo.setNome(copoAtualizado.getNome());
                copo.setCor(copoAtualizado.getCor());
                copo.setCapacidadeMl(copoAtualizado.getCapacidadeMl());
                copo.setQuantidadeEstoque(copoAtualizado.getQuantidadeEstoque());
                copo.setPreco(copoAtualizado.getPreco());
                return copoRepository.save(copo);
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Copo não encontrado"));
    }

    // Consultas
    public List<Copo> listarTodos() {
        return copoRepository.findAll();
    }

    public Copo buscarPorId(Long id) {
        return copoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Copo não encontrado"));
    }

    // Gestão de estoque
    @Transactional
    public Copo adicionarAoEstoque(Long id, int quantidade) {
        Copo copo = buscarPorId(id);
        copo.setQuantidadeEstoque(copo.getQuantidadeEstoque() + quantidade);
        return copoRepository.save(copo);
    }

    @Transactional
    public Copo removerDoEstoque(Long id, int quantidade) {
        Copo copo = buscarPorId(id);
        
        if (copo.getQuantidadeEstoque() < quantidade) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Estoque insuficiente. Disponível: " + copo.getQuantidadeEstoque());
        }
        
        copo.setQuantidadeEstoque(copo.getQuantidadeEstoque() - quantidade);
        return copoRepository.save(copo);
    }

    // Consultas customizadas
    public List<Copo> buscarPorCor(String cor) {
        return copoRepository.findByCorIgnoreCase(cor);
    }

    public List<Copo> buscarComEstoqueBaixo(int nivelAlerta) {
        return copoRepository.findByQuantidadeEstoqueLessThan(nivelAlerta);
    }

    // Validação auxiliar
    private boolean existeCopoComMesmasCaracteristicas(Copo copo) {
        return copoRepository.existsByNomeAndCorAndCapacidadeMl(
            copo.getNome(), 
            copo.getCor(), 
            copo.getCapacidadeMl());
    }
 // Em CopoService.java
    @Transactional
    public void removerCopo(Long id) {
        Copo copo = buscarPorId(id); // Reaproveita a validação
        copoRepository.delete(copo);
    }
}