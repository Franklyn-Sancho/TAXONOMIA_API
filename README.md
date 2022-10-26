# TAXONOMIA_API

Esta é uma API construída em NODEJS que tem como responsabilidade fazer a comunicação entre uma aplicação FrontEnd e o banco de dados. Os usuários, por meio de um layout, poderão armazenar diversos dados de sistemas taxônomicos em um único arquivo JSON. Além de toda a comunicação, o programa também conta com um sistema de logging feito com o winston - assim, tanto as mensagens de erro, quanto as de sucesso, serão armazenadas em dois arquivos json, facilitando futuras manutenções. O propósito dessa aplicação é o voluntariado e a aplicação. 

## como executar
1. Faça um clone da aplicação 
2. Instale as dependências com npm install 
3. Rode o comando npm start -> vai subir na porta 3000
4. Teste as rotas no postman, insomonia e etc
5. Se quiser, crie um arquivo ejs numa pasta public - já está configurado 


## Tecnologias 
![Badge](https://img.shields.io/static/v1?label=node.js&message=runtime&color=green&style=for-the-badge&logo=node.js)
![Badge](https://img.shields.io/static/v1?label=javascript&message=language&color=yellow&style=for-the-badge&logo=JAVASCRIPT)
![Badge](https://img.shields.io/static/v1?label=mongodb&message=database&color=blue&style=for-the-badge&logo=MONGODB)

## próximas features 

- => controle de validação de formulário - FEITO 21/06/2022
- => sistema de autenticação de usuário - FEITO 
- => sistema de administrador - FEITO ADMINISTRADOR
- => rotas privadas para usuários autenticados (administradores e moderadores) - FEITO
- => controle de exceções - 50% FEITO
- => conceito de SOLID ou melhoria de código - PRECISA FINALIZAR
- => criação de logs mais explicativos - FEITO
- => melhorias na rota delete => ainda precisa melhor
- => melhorias no controle de validação de dados
- => adição de datas nos arquivos json
- => sistema de pesquisa
- => sistemas de testes
