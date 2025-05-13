# Sistema de Controle de Estoque de Copos

Este repositório contém um sistema completo de **controle de estoque**, dividido em duas partes:

- `frontend/`: Aplicação React com autenticação, rotas protegidas e consumo da API.
- `backend/`: API REST desenvolvida em Spring Boot e conexão com banco de dados MySQL.

---

## 📦 Frontend (React)

Este projeto foi inicializado com [Create React App](https://github.com/facebook/create-react-app).

### Scripts disponíveis

No diretório `frontend`, você pode executar:

### `npm start`

Executa o aplicativo em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar.

A página será recarregada sempre que você fizer alterações.\
Erros de lint também aparecerão no console.

### `npm test`

Executa os testes em modo interativo.\
Veja mais sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Cria a versão de produção na pasta `build`.\
O React será empacotado de forma otimizada para melhor desempenho.

Os arquivos são minificados e seus nomes incluem hashes.\
Sua aplicação estará pronta para ser implantada.

Leia mais sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`

⚠️ **Atenção: operação irreversível. Uma vez ejetado, não é possível voltar.**

Este comando permite controle total sobre as configurações do projeto (webpack, Babel, ESLint etc.).

---

### Saiba mais

- [Documentação do Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Documentação do React](https://reactjs.org/)

---

## ☕ Backend (Spring Boot)

O diretório `backend` contém uma aplicação Spring Boot 3.4.5 com Java 21, banco MySQL

### Funcionalidades principais:

- CRUD completo da entidade `Copo`:
  - Nome
  - Cor
  - Capacidade
  - Quantidade em estoque
  - Preço
- Autenticação via JWT:
  - Endpoints públicos: `/auth/login`, `/auth/register`
  - Endpoints protegidos para manipulação de estoque
- Documentação da API com Swagger (SpringDoc OpenAPI):
  - Acesse: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- Configuração CORS para integração com o React

### Como executar

1. Certifique-se de que o serviço MySQL está ativo  para perfil prod(via Docker ou localmente) ou h2 para perfil dev.
2. No diretório `backend`, execute:

```bash
./mvnw spring-boot:run
