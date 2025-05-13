package com.empresa.estoque.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.empresa.estoque.entity.Copo;

import java.util.List;

public interface CopoRepository extends JpaRepository<Copo, Long> {
    List<Copo> findByCorIgnoreCase(String cor);
    List<Copo> findByQuantidadeEstoqueLessThan(int quantidade);
    boolean existsByNomeAndCorAndCapacidadeMl(String nome, String cor, int capacidadeMl);
}