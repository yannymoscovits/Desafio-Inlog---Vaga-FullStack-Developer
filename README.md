Desafio Inlog 
Backend (.NET 6)

Visão Geral

Este projeto implementa a solução do desafio FullStack da Inlog, com foco em uma API REST para gerenciamento de veículos, construída em .NET 6.

O armazenamento padrão é InMemory, garantindo execução local e testes sem necessidade de banco externo. No entanto, a arquitetura foi desenhada para permitir substituição simples por um banco relacional (ex.: SQL Server), preservando as camadas de aplicação e domínio.

Arquitetura e Decisões de Projeto

A solução foi estruturada de forma a seguir princípios de Clean Architecture e separação de responsabilidades:

Domain
Contém as entidades de negócio e enums (Veiculo, TipoVeiculo).

Foco em manter regras de negócio puras, sem dependências externas.

Application
Responsável pela lógica de aplicação e casos de uso.

Contém os DTOs, interfaces (IVeiculoRepository) e services (VeiculoService).

Essa camada orquestra o fluxo de dados entre WebApi e Domain.

Infra.Database
Implementa a persistência.

WebApi
Exposição da API via controllers.

Utiliza Swagger para documentação e testes interativos.

Apenas orquestra chamadas para a camada de aplicação, respeitando a separação de responsabilidades.

Testes
Projeto dedicado com xUnit e Moq.

Foram criados testes unitários para validar regras de negócio no VeiculoService.

O repositório é mockado, permitindo validar a lógica sem dependência de infraestrutura.

Decisões Técnicas

Armazenamento InMemory: escolhido por ser simples, rápido de configurar e suficiente para validar regras e endpoints.

DTOs vs. Entidades: uso de DTOs na camada de aplicação evita acoplamento direto entre WebApi e Domain, facilitando evolução.

Mocks com Moq: garantem isolamento da lógica em testes, validando cenários como chassi duplicado sem necessidade de banco real.

Clean Architecture simplificada: ainda que não seja uma implementação 100% formal, a divisão de responsabilidades segue a ideia de manter o domínio puro e camadas externas substituíveis.

Tecnologias Utilizadas

.NET 6
Entity Framework Core (InMemory)
xUnit + Moq para testes unitários
Swagger / Swashbuckle para documentação
FluentAssertions para asserts mais expressivos