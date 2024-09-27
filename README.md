# Web Scraping Bot

Este projeto é um bot de web scraping desenvolvido para coletar informações sobre laptops Lenovo de um site de e-commerce. 
A aplicação consiste em um backend em Node.js que realiza a coleta de dados e um frontend em React que exibe as informações dos laptops.

## Funcionalidades

- Coleta de dados sobre laptops Lenovo, incluindo título, preço, descrição, avaliações e imagem.
- Atualização automática a cada 3 horas para garantir que as informações estejam sempre atualizadas.
- Interface de usuário em React para visualizar a lista de laptops.

## Tecnologias Utilizadas

- **Backend**: Node.js, Axios, Cheerio
- **Frontend**: React, Axios

## Como Executar o Projeto

### Backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend

2. Instale as dependências:
   ```bash
   npm i

1. Inicie o servidor:
   ```bash
   node api.js

### Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   cd laptop-scrapping

2. Instale as dependências:
   ```bash
   npm i

1. Inicie o servidor:
   ```bash
   npm start
