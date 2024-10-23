# Instruções para rodar o projeto

## Pré-requisitos

- Docker instalado na máquina (você pode instalar seguindo as instruções no site oficial: https://docs.docker.com/get-docker/)
- Docker Compose instalado (https://docs.docker.com/compose/install/)

## Executando o projeto

Para rodar o projeto, siga os passos abaixo:

1. Certifique-se de que está na raiz do projeto.
2. Execute o seguinte comando:

```bash
docker compose up -d
```

## Considerações

# Modelagem

Dado os enregáveis, foi definida a seguinte modelagem, para atender todos os requisitos:
  - Category: id, name createdAt
  - Product: id, name, price, deletedAt
  - StockMovmentHistory: id, productId, type, description, quantity, date, createdAt

Também é necesário uma tabela meio Categoria e Produtos, para atender o fato de que um produto tem muitas categorias e uma categoria possui muitos produtos (ManyToMany).

StockMovmentHistory foi modelado dessa forma, pois registra uma mudança de estoque em um determinado produto e define também seu tipo ( se foi entrada ou saída de produto).

Dado a simplecidade das relações, escolhi não criar um campo único contendo o estoque do produto na tabela "Product" por questão de normalização. Quanto mais redundâncias eu tenho em um banco de dados mais chances eu tenho de provocar inconsistências ao longo do tempo.

Caso a quantidade de oprações no banco crescesse de maneira significativa, a normalização seria quebrada por questões de performance.

O design de código buscou seguir DDD, onde, para este caso, cada tabela teria o Módulo (ou domínio), mas dado que não existem regras de negócio além das relacionadas a entrada e saída de estoque, e validação de nomes, não é necesário criar uma camada de domínio para isolar apenas as regras de negócio.

Ademais, a API está organizada em Controllers ( que seriam as portas da aplicação ), Services, que usam os recursos de infraestrutura para executar as regras de negócio, e Infra, onde ficam isolados as implementações de bibliotecas, como a ORM e os arquivos de módulos do NestJS.