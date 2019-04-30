# NoTimeTube

Projeto de uploud de videos em Nodejs referente a matéria de Programação Web 2.

## Executar projeto

1. Passo

Instalar as dependencias do npm

    npm install

2. Passo

Iniciar servidor, e para isso existe duas formas, local e deploy

### Local

A execução local pode ser executada via npm ou Heroku local, indo da escolha do usuário.

- NPM:

Executar o comando abaixo e visualizar no localhost:3000

        npm start

- Heroku Local:

Executar o comando abaixo e visualizar no localhost:5000

        heroku local web

### Deploy

O deploy da aplicação é realizada via Heroku, pelos seguintes comandos:

- Enviar os arquivos de uma determinada branch para o heroku

        git push heroku master

- Acessar o link do [site](https://notimetube.herokuapp.com/) ou executar o comando abaixo

        heroku open