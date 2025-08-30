
# Desafio FullStack Developer — Inlog

Este repositório contém a implementação completa do desafio **FullStack Developer** dividido em duas partes: **Back-end (.NET 6 API)** e **Front-end (React + TypeScript)**.

Tecnologias Utilizadas

- **Back-end**
  - [.NET 6](https://dotnet.microsoft.com/) — Criação da API.
  - **Entity Framework Core** — ORM para persistência de dados.
  - **xUnit** — Testes unitários.
  - **Clean Architecture** — Separação de responsabilidades em camadas.

- **Front-end**
  - [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) — Construção da interface.
  - **React Router** — Navegação entre páginas.
  - **Axios** — Consumo da API de veículos.
  - **React Leaflet** — Exibição de mapa interativo.
  - **Jest + React Testing Library** — Testes unitários e de integração.

---

Estrutura do Repositório

```
/
├── back-end/                         # API em .NET 6
│   ├── Inlog.Desafio.Backend.WebApi/ # Endpoints da aplicação
│   ├── Inlog.Desafio.Backend.Application/ # Serviços e DTOs
│   ├── Inlog.Desafio.Backend.Domain/ # Entidades e contratos
│   ├── Inlog.Desafio.Backend.Infra/  # Repositórios e persistência
│   └── tests/                        # Testes unitários (xUnit)
│
├── front-end/                        # Aplicação em React + TS
│   ├── src/components/               # Componentes reutilizáveis
│   ├── src/pages/                    # Páginas principais (VehiclesList, VehicleCreate, etc.)
│   ├── src/api/                      # Configuração do Axios
│   ├── src/hooks/                    # Hooks customizados
│   ├── src/styles/                   # Estilos globais e CSS
│   └── src/__tests__/                # Testes unitários e integração
```
---

## Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/yannymoscovits/desafio-fullstack-inlog.git
cd desafio-fullstack-inlog
```

### 2. Rodar o Back-end (API .NET 6)
```bash
cd back-end
dotnet restore
dotnet build
dotnet run --project Inlog.Desafio.Backend.WebApi
```
- A API sobe em: `https://localhost:5001`  
- Endpoints disponíveis:
  - `GET /api/veiculos`
  - `POST /api/veiculos`

### 3. Rodar o Front-end (React + TypeScript)
```bash
cd front-end
npm install
npm start
```
- Aplicação disponível em: `http://localhost:3000`
---

## Testes

### Back-end
```bash
cd back-end
dotnet test
```

### Front-end
```bash
cd front-end
npm test
```

Os testes incluem:
- **Back-end:** Validação de serviços e repositórios (xUnit).
- **Front-end:** Testes de componentes (VehicleCreate, VehiclesList, etc.) com **Jest + Testing Library**.

Resultados dos Testes:

API:

<img width="1020" height="375" alt="image" src="https://github.com/user-attachments/assets/f75a95fd-9332-4e49-9585-cd03364f1e6c" />

FRONT (REACT):

<img width="558" height="234" alt="image" src="https://github.com/user-attachments/assets/945596c8-bf26-4746-95a3-1b9b58eaacbd" />

## Funcionalidades Implementadas

- **Back-end**
  - API REST para cadastro e listagem de veículos.
  - Estrutura em camadas (Clean Architecture).
  - Testes unitários básicos.

- **Front-end**
  - Tela de listagem de veículos com **paginação** e **ordenação por proximidade** (usando geolocalização).
  - Tela de criação de veículos.
  - Integração com API via Axios.
  - Exibição de mapa (mockado nos testes com React Leaflet).
  - Testes unitários e de integração.

---
Lista de Veículos
<img width="1910" height="860" alt="image" src="https://github.com/user-attachments/assets/060fba67-ed2a-450d-b492-3dbab933ef9b" />
Cadastro de Veículos
<img width="1904" height="886" alt="image" src="https://github.com/user-attachments/assets/c7e081c7-471c-4e5c-b5f5-230a67de2b23" />

## Comentários da Autora

Durante o desenvolvimento deste desafio, tomei algumas decisões técnicas que considero relevantes compartilhar:

- **React com Hooks:**  
  Optei por usar componentes funcionais com *hooks* (`useState`, `useEffect`, `useMemo`) em vez de classes. Essa escolha traz um código mais limpo e moderno, além de seguir as boas práticas recomendadas atualmente pela comunidade React.

- **TypeScript no front e C# no back:**  
  A tipagem forte foi essencial para evitar erros em tempo de execução e garantir segurança nas integrações entre camadas.  
  No back-end, usei C# com .NET 6, explorando DTOs, serviços e repositórios para manter o código organizado. Tambem usei a v6.0 para simular alguns sistemas "legados" da possível vaga.
  No front, o TypeScript ajudou a controlar os tipos vindos da API e dar mais confiança nos testes.

- **Axios para consumo de API:**  
  Usei o `axios` por ser uma biblioteca simples, robusta e amplamente usada. Uma dificuldade inicial foi integrar os testes com Jest, já que o axios trabalha com ESM e o Jest, por padrão, espera CJS. A solução foi ajustar *mocks* e `transformIgnorePatterns` para rodar    sem erros. Essa tarefa em especial foi a que me tomou mais tempo, mas que no final tive um resultado muito positivo.

- **React Testing Library + Jest:**  
  Testar foi um ponto desafiador: precisei simular chamadas assíncronas da API, geolocalização e componentes de mapa.  
  O aprendizado aqui foi sobre como *mockar* dependências externas (`axios`, `react-router-dom`, componentes de mapa) e usar `waitFor`/`act` para lidar com *state updates*.  
  No fim, consegui validar tanto a criação de veículos quanto a listagem com paginação.

- **Mapas (Leaflet):**  
  Optei por utilizar a biblioteca React Leaflet em vez da Google Maps API por alguns motivos práticos. O Leaflet é uma solução open source, leve e simples de configurar, que permite exibir mapas de forma eficiente sem a necessidade de criar contas, gerar chaves de API    ou configurar billing. Para o contexto deste desafio, essa praticidade foi fundamental, pois reduziu o tempo de setup e permitiu focar nos testes. Além disso, a documentação do React Leaflet é direta e objetiva, o que me ajudou pois nunca havia trabalhado com mapas.
 
- **Interface sem uso de bibliotecas de UI (Material, Ant, etc.):**  :
  Optei por não usar bibliotecas visuais prontas, pois o escopo da interface era simples e resolvi com HTML + CSS customizado. Isso me permitiu focar em áreas mais desafiadoras para mim, como Leaflet e testes unitários (FRONT), que considerei mais relevantes para este desafio.

---

### Dificuldades Encontradas
- Adequar o Jest para rodar com módulos ESM como `axios`.  
- Criar testes consistentes para hooks e chamadas assíncronas.  
- Ajustar mocks de bibliotecas externas sem quebrar os testes.  
- Organizar paginação e geolocalização ao mesmo tempo, garantindo que os veículos fossem exibidos corretamente na UI.

---

Esses pontos refletem meu aprendizado e justificam minhas escolhas. Busquei equilíbrio entre **boas práticas**, **clareza do código** e **entregáveis testáveis** dentro do prazo do desafio.

## Possíveis Melhorias
- Adicionar **Redux** ou outro state manager para estados globais.
- Implementar **filtros e buscas** na listagem de veículos.
- Mais testes de integração ponta a ponta (E2E).
- Incluir JWT para autenticação BAERER e BCRYPT para incluir senhas criptografadas (API).
---

## Autor
Desenvolvido por **Yanny Moscovits** 🚀  
FullStack Developer | .NET + React
