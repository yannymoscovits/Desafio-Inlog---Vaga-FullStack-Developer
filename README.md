# Desafio Inlog - Vaga FullStack Developer 🚀

Objetivo Geral:

O objetivo deste desafio é avaliar e demonstrar suas habilidades no desenvolvimento de back-end, seguido pela integração e desenvolvimento do front-end, utilizando as APIs que você criou na primeira etapa.

# Back - End

## Introdução 📜
O objetivo é completar a aplicação WebApi presente na pasta back-end.

## Instruções 📝
A solução esta em dotnet 6.0 e pode ser utilizado a IDE de sua preferência mas
deve ser feito como o dotnet 6.0 ou superior.

Dentro da Solução tem algumas sugestões de estrutura de projeto, para
que possa colocar as classes e interfaces necessárias.

## Iniciando o Projeto 🚀
Dentro da pasta Controllers tem uma controller de veículos 
com dois métdos para servir de ponto de partida, um POST e 
um GET, não é necessário fazer os demais endpoints.

As classes para representar o veiculo já existem.

Poderá ser feito um armazenamento de dados em memória ou com 
um banco de dados que não precisar ser disponibilizado na entrega
(por meio de docker-compose por exemplo).

Deve ser feito pelo menos um teste unitário para qualquer camada.

#### Observações:🌟


## Dicas 💡
Fique a vontade para adicionar nugets para ajudar no desenvolvimento.

# Front - End

## Introdução 📜
O objetivo deste desafio é criar um projeto React que contenha duas páginas: uma para listar veículos e outra para cadastrar novos veículos. 

Na página de listagem de veículos, será necessário utilizar a biblioteca do mapa, como o Leaflet ou Google Maps API, para exibir um mapa com a localização de cada veículo da lista.

Além disso, a lista de veículos deve estar ordenada pela localização mais próxima do usuário. Na página de cadastro de veículos, será necessário criar um formulário para inserir as informações básicas e a localização do veículo. 

O design do projeto fica à escolha do desenvolvedor do teste. Use sua criatividade e mostre suas habilidades em React, API e testes automatizados neste desafio!

## Instruções 📝
1. Crie 2 páginas em React: Uma para listagem de veículos e outra página de cadastro de veículos. 🚗📝

2. Na página de listagem de veículos, utilize a biblioteca do mapa, como o Leaflet ou Google Maps API para exibir um mapa e colocar um pin em cada localização de veículos na lista. 🗺️
    - A tela de listagem deve conter uma lista de veículos deve estar ordenada pela localização mais próxima do usuário (web).
    - Além da listagem, deve conter um mapa com as informações solicitadas.

3. Na página de cadastro de veículos, crie um formulário que permita ao usuário inserir as informações básicas e a localização do veículo.
   - Exemplo:
```json
{
    identifier: 'Vehicle 1',
    license_plate: 'AAA-9A99',
    tracker_serial_number: 'A0000000',
    coordinates: {
        latitude: -25.43247,
        longitude: -49.27845
    } 
}
```

4. Crie teste usando o Jest, React Testing Library ou Cypress para garantir que:
   - A listagem de veículos seja renderizada corretamente com o mapa. 🧭
   - O formulário de cadastro de veículos esteja funcionando perfeitamente. ✅
   - A Fake API esteja respondendo corretamente. 📡

## Iniciando o Projeto 🚀
- Certifique-se de ter o Node.js instalado em sua máquina.
- Clone este repositório usando o comando git clone https://github.com/weareinlog/Desafio-Inlog---Vaga-FullStack-Developer.
- Acesse a pasta do projeto usando o comando cd nome-da-pasta.
- Instale as dependências do projeto usando o comando npm install.
- Execute o projeto usando o comando npm start.
- Acesse o projeto em seu navegador através da url http://localhost:3000.

#### Observações:🌟
- Você pode utilizar bibliotecas externas para ajudar no desenvolvimento do projeto, tais como:
    - Validadores: react-hook-form, yup, formik entre outros.
    - Componentes: Material-UI, Chakra-ui entre outros.
    - Rotas: React-router-dom.

- Caso deseje adicionar mais campos para o veículo como uma imagem entre outros, fique à vontade. Isso será visto como bônus. 🏎️💻


## Dicas 💡

- Use componentes funcionais com hooks do React.
- Utilize TypeScript ou PropTypes para tipagem.
- Utilize Redux ou outro gerenciador de estado para armazenar as informações dos veículos.
- Utilize o Axios para fazer requisições à API.
- Utilize a biblioteca React Leaflet ou Google Maps API para exibir o mapa.
- Teste todos os componentes criados.
- Se quiser adicionar algum bônus, como uma busca de veículos ou um filtro de veículos, fique à vontade.
- Este projeto foi criado utilizando o padrão create-react-app, que oferece uma estrutura básica para a construção de aplicativos React. Você é livre para alterar a arquitetura do projeto conforme achar melhor, adicionando ou removendo bibliotecas e componentes, criando novas pastas e arquivos, e assim por diante. Sinta-se à vontade para personalizar o projeto de acordo com as suas necessidades e preferências.

---

## Como entregar 📨

- Crie um fork deste repositório e desenvolva nele.
- Após finalizar, enviar para o email beinlog@inlog.com.br o link do repositorio do github com seu projeto, além de seus dados de contato.

## Boa sorte!