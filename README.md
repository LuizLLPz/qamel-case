
# Qamel Case é uma rede social sendo desenvolvida conforme vou estudando novos tópicos

### Frameworks Utilizados no desenvolvimento front end:
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

### Estilização e componentes:
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

### Ferramentas do servidor e api:
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

### Bancos de dados utilizados:
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)


## Notas
Para o aplicativo funcionar é necessário ter um servidor postgres e redis instalados.
Podendo ser localmente ou por um serviço de nuvem.

## Testando o servidor
Primeiro é necessário entrar no diretório do servidor
```console
$ cd qamel-case-server
```
Depois é necessário transpilar o código para Javascript:
```console
$ npm run watch 
```
ou: 
```console
$ yarn watch 
```
Após isso é necessário criar o arquivo .env com as seguintes variáveis de ambiente definidas com seus respectivos valores para o servidor funcionar corretamente

## Variáveis de ambiente
SERVER_URI: URI do banco de dados utilizado, no caso postgres (é possível trocar o banco de dados modificando o schema.prisma e gerando uma nova configuração do prisma)  
REDIS_URI: URI do banco de dados redis  
SERVER_PORT: Porta onde o servidor vai escutar  
