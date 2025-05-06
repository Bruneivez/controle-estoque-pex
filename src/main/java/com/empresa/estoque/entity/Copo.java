package com.empresa.estoque.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
public class Copo {
    
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "O nome não pode estar vazio")
    @Size(max = 100, message = "O nome deve ter até 100 caracteres")
    private String nome;
    
    @NotBlank(message = "A cor não pode estar vazia")
    private String cor;
    
    @Positive(message = "A capacidade deve ser maior que zero")
    @Column(name = "capacidade_ml")
    private Integer capacidadeMl;
    
    @PositiveOrZero(message = "A quantidade não pode ser negativa")
    private Integer quantidadeEstoque;
    
    @Positive(message = "O preço deve ser maior que zero")
    @Digits(integer = 6, fraction = 2, message = "Preço inválido")
    private BigDecimal preco;

    
    public Copo() {
    }

   
    public Copo(String nome, String cor, Integer capacidadeMl, Integer quantidadeEstoque, BigDecimal preco) {
        this.nome = nome;
        this.cor = cor;
        this.capacidadeMl = capacidadeMl;
        this.quantidadeEstoque = quantidadeEstoque;
        this.preco = preco;
    }

    
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public Integer getCapacidadeMl() {
        return capacidadeMl;
    }

    public void setCapacidadeMl(Integer capacidadeMl) {
        this.capacidadeMl = capacidadeMl;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    
    @Override
    public String toString() {
        return "Copo{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cor='" + cor + '\'' +
                ", capacidadeMl=" + capacidadeMl +
                ", quantidadeEstoque=" + quantidadeEstoque +
                ", preco=" + preco +
                '}';
    }
}