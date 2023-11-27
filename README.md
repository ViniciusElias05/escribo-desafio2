# Projeto API RESTful de Autenticação

#### Objetivo:
Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.

### Requisitos e como foram atendidos:
- Persistência de dados: Utilização do banco de dados mysql e o SQL query builder Knex para construção das querys para comunicação com o banco.
- Task runner para build: utilização do Gulp para realização das tasks.
- Padronização de estilo: jsLint.
- Framework: Express.
- JWT como token: Foi utilizado jwt como token, assim como também foi utilizado dotenv para esconder o secret.
- Testes unitários: Feito com Jest. Cobrindo as requisições das rotas da API.
- Criptografia hash: Utilizado para cripografar a senha, utilizando o bcrypt.
- Hospedagem:
  - Back-end: https://render.com
  - Banco de Dados: https://planetscale.com
 
### Rotas para testar o projeto:
  - Para fazer o Sign Up: `POST` https://api-rest-ed.onrender.com/users/create
    - Entrada:

      ``` json
          {
              "nome": "nome",
              "email": "email@email.com",
              "senha": "senha",
              "telefones": [{"ddd": "21", "numero": "995674356"},{"ddd": "11", "numero": "976543210"}]
          }
      ```
    - Saída:
      ``` json
          {
              "id": "ID",
              "data_criacao": "data",
              "data_atualizacao": "data",
              "ultimo_login": "data",
              "token": "token"
          }
      ```

- Para fazer o Sign In: `POST` https://api-rest-ed.onrender.com/users/login
  
    - Entrada:

      ``` json
          {
              "email": "email@email.com",
              "senha": "12345"
          }
      ```
      
    - Saída:
      
      ``` json
          {
                "id": "ID",
                "data_criacao": "data",
                "data_atualizacao": "data",
                "ultimo_login": "data",
                "token": "token"
          }
      ```

- Para buscar o usuário: `GET` https://api-rest-ed.onrender.com/users/:id
  
    - Entrada:
      Necessário que o id do usuário, que foi disponibilizado no momento do login, seja colocado na rota substituindo :id pelo id real do usuário.
      Também é necessário a utilização do token para Authorization: "Bearer token", o token também é disponibilzado no momento do login.
      
    - Saída:
      
        ``` json
                  {
                    "nome": "nome",
                    "email": "email@email.com",
                    "data_criacao": "data",
                    "data_atualizacao": "data",
                    "ultimo_login": "data",
                    "telefones": [
                              {
                                  "ddd": "11",
                                  "numero": "995674356"
                              },
                              {
                                  "ddd": "11",
                                  "numero": "976543210"
                              }
                         ]
                      }
        ```

- Rota para atualizar o usuário: `PUT` https://api-rest-ed.onrender.com/users/:id

  Necessário que o id do usuário, que foi disponibilizado no momento do login, seja colocado na rota substituindo :id pelo id real do usuário.
  Também é necessário a utilização do token para Authorization: "Bearer token", o token também é disponibilzado no momento do login.
  Não tem valor de saída. Somente o status code 200 para simbolizar que foi bem sucedido a atualização do usuário.

- Rota para deletar o usuário: `DELETE` https://api-rest-ed.onrender.com/users/:id

  Necessário que o id do usuário, que foi disponibilizado no momento do login, seja colocado na rota substituindo :id pelo id real do usuário.
  Também é necessário a utilização do token para Authorization: "Bearer token", o token também é disponibilzado no momento do login.
  Não tem valor de saída. Somente o status code 200 para simbolizar que foi bem sucedido a deleção do usuário.

      
      
