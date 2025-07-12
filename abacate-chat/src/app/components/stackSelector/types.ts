import { JavaIcon } from "@icons/stack/java";
import JavaScriptIcon from "@icons/stack/javascript";
import { LovableIcon } from "@icons/stack/Lovable";
import { PhpIcon } from "@icons/stack/php";
import PythonIcon from "@icons/stack/python";
import { RubyIcon } from "@icons/stack/Ruby";

const prompt = {
lovable: `Para cobrança quero usar a AbacatePay. Aqui está uma descrição sobre a abacate pay. Use ela para integrar para pagamentos.
Se atente a quais rotas podem ser utilizadas e sempre procure na documentação como usá-las. Sempre que for gerar código lembre se de identificar quais são os campos que estão marcados como \`required\` e usa-los quando necessário.

# Guia de Integração com a AbacatePay

A AbacatePay é um gateway de pagamentos oferecendo integração simples e eficiente para recebimento via PIX.

## Visão Geral

- Método de pagamento: Apenas PIX.
- Preço: R$0,80 por transação (fixo, sem percentual).
- Notificações: Webhook para confirmação de pagamento.

## Como Integrar

1. Configure a chave no seu backend (ex: variável de ambiente ou secrets do Supabase).
2. Implemente o fluxo de pagamento (QR Code ou Link de Pagamento).
3. Configure o webhook no dashboard para receber confirmações de pagamento.

---

## Opções de Fluxos de Pagamento
### 1. Criação de QR Code PIX (Checkout Transparente)
- Gere um QR Code e código copia-e-cola para exibir ao usuário.
- O usuário paga via PIX usando o QR Code.
- Receba confirmação via webhook.

**Exemplo de requisição:**
\`\`\`http
POST /v1/pixQrCode/create
Authorization: Bearer {SUA_CHAVE_API}
Content-Type: application/json

{
  "amount": 1000,
  "expiresIn": 3600,
  "description": "Pagamento de serviço",
  "customer": {
    "name": "Fulano de tal",
    "cellphone": "(00) 0000-0000",
    "email": "cliente@gmail.com",
    "taxId": "123.456.789-01"
  }
}
\`\`\`

### 2. Criação de Link de Pagamento (Cobrança)

- Crie um link para o cliente ser redirecionado e pagar.
- O usuário é redirecionado para a página de pagamento da AbacatePay.
- Após o pagamento, o usuário é redirecionado para a URL definida.
- Receba confirmação via webhook.

**Exemplo de requisição:**
\`\`\`http
POST /v1/billing/create
Authorization: Bearer {SUA_CHAVE_API}
Content-Type: application/json

{
  "frequency": "ONE_TIME",
  "methods": ["PIX"],
  "products": [
    {
      "externalId": "prod-1234",
      "name": "Assinatura Mensal",
      "quantity": 1,
      "price": 2000
    }
  ],
  "returnUrl": "https://seusite.com/voltar",
  "completionUrl": "https://seusite.com/sucesso",
  "customer": {
    "name": "Fulano de tal",
    "cellphone": "(00) 0000-0000",
    "email": "cliente@gmail.com",
    "taxId": "123.456.789-01"
  }
}
\`\`\`

## Webhook de Confirmação

- Configure a URL do webhook no dashboard da AbacatePay.
- Você receberá um POST com os dados do pagamento assim que for confirmado.
- Use o webhook para atualizar o status do usuário no seu sistema.
- No dashboard da AbacatePay o usuário poderá inserir um Secret que deve ser verificado para ter certeza que o webhook veio de um fonte verdadeira

---
## Boas Práticas

- **Nunca exponha sua chave de API no frontend.**
- Use variáveis de ambiente para armazenar a chave.
- Teste todo o fluxo em Dev mode antes de ir para produção.
- Sempre valide o payload recebido no webhook.

---

## Observações
- A URL da API da AbacatePay é \`https://api.abacatepay.com/v1\`
- Todos os valores monetários são em centavos (ex: 1000 = R$10,00).
- Para cobranças do tipo \`ONE_TIME\`, é obrigatório informar o cliente (\`customer\` ou \`customerId\`).
- Para múltiplos pagamentos (\`MULTIPLE_PAYMENTS\`), o cliente preenche os dados no checkout.
- O ambiente (dev/prod) é definido pela chave de API utilizada.

---

**Exemplo de fluxo resumido:**

1. Backend cria cobrança ou QR Code via API.
2. Frontend redireciona o usuário para o link ou QR Code ao usuário.
3. Usuário realiza o pagamento.
4. AbacatePay envia webhook de confirmação.
5. Backend atualiza status do usuário.

---

# Documentação OpenAPI da abacate:

openapi: 3.1.0
info:
  title: API AbacatePay
  description: API para gerenciamento de cobranças e pagamentos usando o AbacatePay.
  version: 1.0.0
servers:
  - url: https://api.abacatepay.com/v1
    description: Único servidor para os ambientes de produção e sandbox.
paths:
  /customer/create:
    post:
      summary: Criar um novo cliente
      description: Permite que você crie um novo cliente para a sua loja.
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              description: Os dados do seu cliente caso deseje criá-lo no momento da criação da sua cobrança.
              required: ['name', 'cellphone', 'email', 'taxId']
              additionalProperties: false
              properties:
                name:
                  type: string
                  description: Nome completo do seu cliente
                  example: Daniel Lima
                cellphone:
                  type: string
                  description: Celular do cliente
                  example: (11) 4002-8922
                email:
                  type: string
                  description: E-mail do cliente
                  example: daniel_lima@abacatepay.com
                taxId:
                  type: string
                  description: CPF ou CNPJ válido do cliente.
                  example: 123.456.789-01
      responses:
        '200':
          description: Cliente criado com sucesso.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/Customer'
                  error:
                    type: null
        '401':
          description: Não autorizado. Falha na autenticação.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Mensagem de erro descrevendo o motivo da falha na autenticação.
                    example: 'Token de autenticação inválido ou ausente.'
  /customer/list:
    get:
      summary: Listar clientes
      description: Permite que você recupere uma lista de todos os seus clientes.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Lista de clientes retornada com sucesso.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    description: Lista de clientes.
                    items:
                      $ref: '#/components/schemas/Customer'
                  error:
                    type: null
        '401':
          description: Não autorizado. Falha na autenticação.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Mensagem de erro descrevendo o motivo da falha na autenticação.
                    example: 'Token de autenticação inválido ou ausente.'
  /coupon/create:
    post:
      summary: Criar um novo cupom
      description: Permite que você crie um novo cupom que pode ser usado por seus clientes para aplicar descontos.
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                data:
                  $ref: '#/components/schemas/Coupon'
                error:
                  type: null
      responses:
        '200':
          description: Cliente criado com sucesso.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/CouponResponse'
                  error:
                    type: null
        '401':
          description: Não autorizado. Falha na autenticação.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Mensagem de erro descrevendo o motivo da falha na autenticação.
                    example: 'Token de autenticação inválido ou ausente.'
  /coupon/list:
    get:
      summary: Listar cupons
      description: Permite que você recupere uma lista de todos os seus cupons.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Lista de cupons retornada com sucesso.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    description: Lista de cupons.
                    items:
                      $ref: '#/components/schemas/CouponResponse'
                  error:
                    type: null
        '401':
          description: Não autorizado. Falha na autenticação.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Mensagem de erro descrevendo o motivo da falha na autenticação.
                    example: 'Token de autenticação inválido ou ausente.'
  /billing/create:
    post:
      summary: Criar uma nova cobrança
      description: Permite que você crie um link de cobrança pro seu cliente pagar você.
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                frequency:
                  type: string
                  description: Define o tipo de frequência da cobrança. Para cobranças únicas, use \`ONE_TIME\`. Para cobranças que podem ser pagas mais de uma vez, use \`MULTIPLE_PAYMENTS\`.
                  enum: ['ONE_TIME', 'MULTIPLE_PAYMENTS']
                  default: 'ONE_TIME'
                  example: 'ONE_TIME'
                methods:
                  type: array
                  description: Métodos de pagamento que serão utilizados. Atualmente, apenas PIX é suportado.
                  items:
                    type: string
                    enum: ['PIX']
                  minItems: 1
                  maxItems: 1
                  uniqueItems: true
                  default: ['PIX']
                  example: ['PIX']
                products:
                  type: array
                  description: Lista de produtos que seu cliente está pagando.
                  items:
                    type: object
                    properties:
                      externalId:
                        type: string
                        description: O id do produto em seu sistema. Utilizamos esse id para criar seu produto na AbacatePay de forma automática, então certifique-se de que seu id é único.
                        example: 'prod-1234'
                      name:
                        type: string
                        description: Nome do produto.
                        example: 'Assinatura de Programa Fitness'
                      description:
                        type: string
                        description: Descrição detalhada do produto.
                        example: 'Acesso ao programa fitness premium por 1 mês.'
                      quantity:
                        type: integer
                        description: Quantidade do produto sendo adquirida.
                        minimum: 1
                        example: 2
                      price:
                        type: integer
                        description: Preço por unidade do produto em centavos. O mínimo é 100 (1 BRL).
                        minimum: 100
                        example: 2000
                    required: ['externalId', 'name', 'quantity', 'price']
                    additionalProperties: false
                  minItems: 1
                  example:
                    - externalId: 'prod-1234'
                      name: 'Assinatura de Programa Fitness'
                      description: 'Acesso ao programa fitness premium por 1 mês.'
                      quantity: 2
                      price: 2000
                returnUrl:
                  type: string
                  format: uri
                  description: URL para redirecionar o cliente caso o mesmo clique na opção "Voltar".
                  example: 'https://example.com/billing'
                completionUrl:
                  type: string
                  format: uri
                  description: URL para redirecionar o cliente quando o pagamento for concluído.
                  example: 'https://example.com/completion'
                customerId:
                  type: string
                  description: O id de um cliente já cadastrado em sua loja.
                  example: 'cust_abcdefghij'
                customer:
                  type: object
                  description: Dados do seu cliente. Caso o cliente não exista ele será criado.
                  required: ['name', 'cellphone', 'email', 'taxId']
                  additionalProperties: false
                  properties:
                    name:
                      type: string
                      description: Nome completo do seu cliente
                      example: Daniel Lima
                    cellphone:
                      type: string
                      description: Celular do cliente
                      example: (11) 4002-8922
                    email:
                      type: string
                      description: E-mail do cliente
                      example: daniel_lima@abacatepay.com
                    taxId:
                      type: string
                      description: CPF ou CNPJ do cliente.
                      example: 123.456.789-01
              required: ['frequency', 'methods', 'products', 'returnUrl', 'completionUrl']
              additionalProperties: false
      responses:
        '200':
          description: Cobrança criada com sucesso.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/Billing'
                  error:
                    type: null
        '401':
          description: Não autorizado. Falha na autenticação.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Mensagem de erro descrevendo o motivo da falha na autenticação.
                    example: 'Token de autenticação inválido ou ausente.'
  /billing/list:
    get:
      summary: Listar cobranças
      description: Permite que você recupere uma lista de todas as cobranças criadas.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Lista de cobranças retornada com sucesso.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    description: Lista de cobranças criadas.
                    items:
                      $ref: '#/components/schemas/Billing'
                  error:
                    type: null
        '401':
          description: Não autorizado. Falha na autenticação.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Mensagem de erro descrevendo o motivo da falha na autenticação.
                    example: 'Token de autenticação inválido ou ausente.'
  /pixQrCode/create:
    post:
      summary: 'Criar QRCode PIX'
      description: Permite que você crie um código copia-e-cola e um QRCode Pix para seu cliente fazer o pagamento.
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                amount:
                  type: number
                  description: Valor da cobrança em centavos.
                expiresIn:
                  type: number
                  description: Tempo de expiração da cobrança em segundos.
                description:
                  type: string
                  maxLength: 140
                  description: Mensagem que aparecerá na hora do pagamento do PIX.
                customer:
                  type: object
                  description: |
                    Os dados do seu cliente para criá-lo.
                    O objeto de customer não é obrigatório, mas ao informar qualquer informação do \`customer\` todos os campos \`name\`, \`cellphone\`, \`email\` e \`taxId\` são obrigatórios.
                  required: ['name', 'cellphone', 'email', 'taxId']
                  additionalProperties: false
                  properties:
                    name:
                      type: string
                      description: Nome completo do seu cliente
                      example: Daniel Lima
                    cellphone:
                      type: string
                      description: Celular do cliente
                      example: (11) 4002-8922
                    email:
                      type: string
                      description: E-mail do cliente
                      example: daniel_lima@abacatepay.com
                    taxId:
                      type: string
                      description: CPF ou CNPJ do cliente.
                      example: 123.456.789-01
              required: ['amount']
              additionalProperties: false
      responses:
        '200':
          description: QRCode Pix criado com sucesso
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/PixQRCode'
                  error:
                    type: null
        '401':
          description: Não autorizado. Falha na autenticação.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Mensagem de erro descrevendo o motivo da falha na autenticação.
                    example: 'Token de autenticação inválido ou ausente.'
  /pixQrCode/check:
    get:
      summary: 'Checar Status'
      description: Checar status do pagamento do QRCode Pix.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Status retornado
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    properties:
                      status:
                        type: string
                        description: Informação sobre o andamento do QRCode Pix.
                        enum: ['PENDING', 'EXPIRED', 'CANCELLED', 'PAID', 'REFUNDED']
                        example: 'PENDING'
                      expiresAt:
                        type: string
                        description: Data de expiração do QRCode Pix
                        example: '2025-03-25T21:50:20.772Z'
                  error:
                    type: null
        '401':
          description: Não autorizado. Falha na autenticação.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Mensagem de erro descrevendo o motivo da falha na autenticação.
                    example: 'Token de autenticação inválido ou ausente.'
      parameters:
        - name: id
          in: query
          description: ID do QRCode Pix
          required: true
          schema:
            type: string
  /pixQrCode/simulate-payment:
    post:
      summary: 'Simular Pagamento'
      description: Simula o pagamento de um QRCode Pix criado no modo de desenvolvimento.
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                metadata:
                  type: object
                  description: Metadados opcionais para a requisição
                  default: {}
      responses:
        '200':
          description: Pagamento ralizado com sucesso
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/PixQRCode'
                  error:
                    type: null
        '401':
          description: Não autorizado. Falha na autenticação.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Mensagem de erro descrevendo o motivo da falha na autenticação.
                    example: 'Token de autenticação inválido ou ausente.'
      parameters:
        - name: id
          in: query
          description: ID do QRCode Pix
          required: true
          schema:
            type: string
components:
  schemas:
    Customer:
      type: object
      description: Os dados do seu cliente.
      required: ['name', 'cellphone', 'email', 'taxId']
      additionalProperties: false
      properties:
        id:
          type: string
          description: Identificador único do cliente
          example: 'bill_123456'
        metadata:
          type: object
          description: Dados do cliente
          properties:
            name:
              type: string
              description: Nome completo do seu cliente
              example: Daniel Lima
            cellphone:
              type: string
              description: Celular do cliente
              example: (11) 4002-8922
            email:
              type: string
              description: E-mail do cliente
              example: daniel_lima@abacatepay.com
            taxId:
              type: string
              description: CPF ou CNPJ do cliente.
              example: 123.456.789-01
    Coupon:
      type: object
      description: Os dados do seu cupom.
      required: ['code', 'discount', 'discountKind']
      additionalProperties: false
      properties:
        code:
          type: string
          description: Identificador único do cupom
          example: DEYVIN_20
        notes:
          type: string
          description: Descrição sbre o cupom
          example: Cupom de desconto pro meu público
        maxRedeems:
          type: number
          description: Quantidade de vezes em que o cupom pode ser resgatado. -1 Significa que esse cupom pode ser resgatado sem limites
          example: 10
          default: -1
        discountKind:
          type: string
          description: Tipo de desconto aplicado, porcentagem ou fixo
          enum: ['PERCENTAGE', 'FIXED']
        discount:
          type: number
          description: Valor de desconto a ser aplicado
        metadata:
          type: object
          description: Objeto chave valor para metadados do cupom
          default: {}
    CouponResponse:
      type: object
      description: Os dados do seu cupom.
      required: ['id', 'discount', 'discountKind', 'status', 'createdAt', 'updatedAt']
      additionalProperties: false
      properties:
        id:
          type: string
          description: Identificador único do cupom
          example: DEYVIN_20
        notes:
          type: string
          description: Descrição sobre o cupom
          example: Cupom de desconto pro meu público
        maxRedeems:
          type: integer
          description: Quantidade de vezes em que o cupom pode ser resgatado. -1 significa ilimitado.
          example: -1
          default: 10
        redeemsCount:
          type: integer
          description: Quantidade de vezes que o cupom já foi resgatado.
          example: 0
        discountKind:
          type: string
          description: Tipo de desconto aplicado, porcentagem ou fixo
          enum: ['PERCENTAGE', 'FIXED']
          example: PERCENTAGE
        discount:
          type: number
          description: Valor de desconto a ser aplicado
          example: 123
        devMode:
          type: boolean
          description: Indica se o cupom foi criado em ambiente de testes.
          example: true
        status:
          type: string
          description: Status atual do cupom.
          enum: ['ACTIVE', 'INACTIVE', 'EXPIRED']
          example: ACTIVE
        createdAt:
          type: string
          format: date-time
          description: Data de criação do cupom.
          example: '2025-05-25T23:43:25.250Z'
        updatedAt:
          type: string
          format: date-time
          description: Data de atualização do cupom.
          example: '2025-05-25T23:43:25.250Z'
        metadata:
          type: object
          description: Objeto chave valor para metadados do cupom
          default: {}




    Billing:
      type: object
      properties:
        id:
          type: string
          description: Identificador único da cobrança.
          example: 'bill_123456'
        url:
          type: string
          format: uri
          description: URL onde o usuário pode concluir o pagamento.
          example: 'https://pay.abacatepay.com/bill-5678'
        amount:
          type: number
          description: Valor total a ser pago em centavos.
          example: 4000
        status:
          type: string
          description: Status atual da cobrança.
          enum: ['PENDING', 'EXPIRED', 'CANCELLED', 'PAID', 'REFUNDED']
          example: 'PENDING'
        devMode:
          type: boolean
          description: Indica se a cobrança foi criada em ambiente de testes.
          example: true
        methods:
          type: array
          description: Métodos de pagamento suportados para esta cobrança.
          items:
            type: string
            enum: ['PIX']
          example: ['PIX']
        products:
          type: array
          description: Lista de produtos na cobrança.
          items:
            type: object
            properties:
              id:
                type: string
                description: Identificador único do produto.
                example: 'prod_123456'
              externalId:
                type: string
                description: O id do produto em seu sistema.
                example: 'prod-1234'
              quantity:
                type: integer
                description: Quantidade do produto sendo adquirida.
                example: 2
        frequency:
          type: string
          description: Frequência da cobrança.
          enum: ['ONE_TIME', 'MULTIPLE_PAYMENTS']
          example: 'ONE_TIME'
        nextBilling:
          type: string
          format: date-time
          nullable: true
          description: Data e hora da próxima cobrança, ou null para cobranças únicas.
          example: null
        customer:
          type: object
          nullable: true
          $ref: '#/components/schemas/Customer'
      required:
        ['id', 'url', 'amount', 'status', 'devMode', 'methods', 'products', 'frequency', 'createdAt', 'updatedAt']
    PixQRCode:
      type: object
      properties:
        id:
          type: string
          description: Identificador único do QRCode Pix.
          example: 'pix_char_123456'
        amount:
          type: number
          description: Valor a ser pago.
          example: 100
        status:
          type: string
          description: Informação sobre o andamento do QRCode Pix.
          enum: ['PENDING', 'EXPIRED', 'CANCELLED', 'PAID', 'REFUNDED']
          example: 'PENDING'
        devMode:
          type: boolean
          description: Ambiente no qual o QRCode Pix foi criado.
          example: true
        brCode:
          type: string
          description: Código copia-e-cola do QRCode Pix.
          example: '00020101021226950014br.gov.bcb.pix'
        brCodeBase64:
          type: string
          description: Imagem em Base64 do QRCode Pix.
          example: 'data:image/png;base64,iVBORw0KGgoAAA'
        platformFee:
          type: number
          description: Taxas da plataforma
          example: 80
        createdAt:
          type: string
          description: Data de criação do QRCode Pix.
          example: '2025-03-24T21:50:20.772Z'
        updatedAt:
          type: string
          description: Data de atualização do QRCode Pix.
          example: '2025-03-24T21:50:20.772Z'
        expiresAt:
          type: string
          description: Data de expiração do QRCode Pix
          example: '2025-03-25T21:50:20.772Z'
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

Referências adicionais:

---
title: "Referência para detalhes de cobrança"
description: "Crie um link de cobrança e deixe seu cliente pagar"
icon: "book-open-cover"
---

O termo "cobrança" é genérico. Ele representa um portal de um fluxo de pagamento onde você pode cobrar seu cliente e ele fazer todo o processo de pagamento sem nenhuma interrupção.

Atualmente uma cobrança pode ser de duas formas: 
- \`ONE_TIME\` para cobranças que serão pagas uma única vez.  preciso enviar os dados do seu cliente. Para cobrançar \`ONE_TIME\` é obrigatório informar o cliente ao criar a cobrança por meio dos campos \`customerId\` ou \`customer\`. 
  - Só é necessário fornecer uma das opções de identificador do cliente: \`customerId\` **OU** \`customer\`.
- \`MULTIPLE_PAYMENTS\` é uma cobrança que pode ser paga multiplas vezes e por múltiplas pessoas diferentes. **Ex:** utilização de um único link de pagamento para vender um produto para múltiplas pessoas.
  - Para cobranças \`MULTIPLE_PAYMENTS\` o usuário informará informações como CPF, nome e email na página do checkout.`,

python : `Me ajude a integrar a AbacatePay usando Python`,
 javascript : `Me ajude a integrar a AbacatePay usando Javascript`,
php : `Me ajude a integrar a AbacatePay usando PHP`,
ruby : `Me ajude a integrar a AbacatePay usando Ruby`,
java: `Me ajude a integrar a AbacatePay usando Java`
}

export const languages = [
    {
      code: "python",
      label: "Python",
      Icon: PythonIcon,
      prompt: prompt.python,
    },
    {
      code: "javascript",
      label: "Javascript",
      Icon: JavaScriptIcon,
      prompt: prompt.javascript,
    },
    {
      code: "php",
      label: "PHP",
      Icon: PhpIcon,
      prompt: prompt.php,
    },
    {
      code: "ruby",
      label: "Ruby",
      Icon: RubyIcon,
      prompt: prompt.ruby,
    },
    {
      code: "java",
      label: "Java",
      Icon: JavaIcon,
      prompt: prompt.java,
    },
    {
      code: "lovable",
      label: "Lovable",
      Icon: LovableIcon,
      prompt: prompt.lovable,
    },
  ];