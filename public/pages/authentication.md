# Autenticação
Nesta seção você vai encontrar as informações necessárias para começar a usar os serviços da Warren, o primeiro passo é fazer a autenticação para que os dados possam ser entregues de forma segura.

-----
#### URL Base da API

Para acessar os recursos protegidos, todos os consumidores dos serviços precisam se autenticar e utilizar um token nas chamadas subsequentes. A URL base para autenticação é: ```https://waas.warren.com.br```

-----

Para conectar com as integrações e poder acessar as informações de seus clientes de forma segura, é necessário fazer todas as requisições usando o protocolo HTTPS e incluir o token de autenticação a cada requisição.

Você vai precisa de seu ```clientId``` e da sua ```secretKey``` nessa etapa.

::: danger Importante!
:warning: Nunca exponha seu ```clientId``` e ```secretKey``` num repositório público, nem as utilize no seu código do lado do cliente. Faça-o sempre com segurança a partir do seu servidor.
:::

-----

#### Endpoint de Autenticação

### Método HTTP

`POST /api/v1/authenticate`

### Corpo da Requisição

Envie um JSON com os seguintes campos:

```json
{
  "client_id": "string",
  "client_secret": "string",
  "grant_type": "string"
}
```

- `client_id`: Seu identificador único de cliente fornecido pelo sistema.
- `client_secret`: A chave secreta associada ao seu client_id.
- `grant_type`: O tipo de concessão de acesso. Atualmente, suportamos apenas "client_credentials".
  
## Tratamento de Erros na Requisição

`401Unauthorized` Se o `grant_type` não for informado corretamente

**Exemplo de Resposta**
```json
{
  "message": "grant_type_not_allowed"
}
```

`401 Unauthorized` Se o `client_id` não for informado corretamente

**Exemplo de Resposta**
```json
{
  "message": "identity_not_found"
}
```

`401 Unauthorized` Se o `client_secret` não for informado corretamente

**Exemplo de Resposta**
```json
{
  "message": "invalid_client_secret"
}
```

## Utilizando o Token de Acesso
Inclua o access_token no cabeçalho Authorization de suas requisições:

```text
Authorization: Bearer {access_token}
```

**Exemplo de Requisição Autenticada**
```bash
curl -X GET \
  https://waas.warren.com.br/recurso-protegido \
  -H 'Authorization: Bearer seu_access_token'
```

## Fluxo de Autenticação



1. Obter as Credenciais do Cliente: Certifique-se de que você possui o client_id e o client_secret fornecidos pelo sistema.
2. Solicitar um Token de Acesso: Faça uma requisição POST para o endpoint de autenticação com as credenciais do cliente e o grant_type.
3. Receber o Token de Acesso: Se a autenticação for bem-sucedida, você receberá um access_token que deve ser utilizado nas requisições subsequentes.
4. Acessar Recursos Protegidos: Utilize o access_token no cabeçalho Authorization para acessar os recursos protegidos da API.

## Observações Importantes
- Segurança: Mantenha seu client_secret seguro e nunca o exponha em aplicações cliente ou em código-fonte público.
- Expiração do Token: O access_token possui um tempo de expiração definido em expires_in. Após esse período, você precisará solicitar um novo token.
