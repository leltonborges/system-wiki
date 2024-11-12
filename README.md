# System Wiki - CS/UDF

## Descrição do Projeto

O **System Wiki** é parte de um projeto acadêmico solicitado pela **Prof.ª Kadidja** na disciplina "Projeto de Linguagem de Programação" do **7º semestre** do curso de **Ciência da Computação** no **Centro Universitário do Distrito Federal (UDF)**.

O objetivo do sistema é facilitar o acesso a informações acadêmicas, oferecendo um espaço centralizado onde estudantes e professores possam consultar e organizar conteúdos sobre tecnologias e ferramentas utilizadas no ambiente acadêmico.

## Integrantes

- **[Suelen Barbosa Marinho](https://github.com/suelenmarinho)**
- **[Lelton Pereira Borges](https://github.com/leltonborges)**

## Tecnologias

As seguintes ferramentas foram utilizadas no desenvolvimento do Front-end:

- [TypeScript](https://www.typescriptlang.org/)
- [Framework Angular (18+)](https://angular.dev/)
- [Node.js](https://nodejs.org/en)
- [NgRx](https://ngrx.io/)
- [Sass](https://sass-lang.com/)
  - [Docker](https://docs.docker.com/engine/install/) "Opcional"

## Demonstrativos

### Home Page

![Home Page](./imgs/Home.png)

### Menu de filtros

![Home Page](./imgs/Home-Filter.png)

### Artigo Demo

![Artigo Demo](./imgs/article-detail.png)
## Execução

### Build para execução

Para executar o projeto, é necessário que a camada de serviço esteja funcionando. Consulte o repositório [system-wiki-back](https://github.com/leltonborges/system-wiki-back) para saber como configurá-la.

Após a configuração da camada de serviço, você deve configurar o caminho para que a aplicação se comunique com os serviços. Isso pode ser feito de duas formas:

1. **Primeira opção: Configuração de variáveis de ambiente**
   No terminal, execute:
   ```shell
   export PROD=true
   export API_ARTICLE_URL=<url-do-backend>
   ```

2. **Segunda opção: Alteração no arquivo `src/environments/environment.ts`**
   Modifique as propriedades conforme abaixo:
   ```typescript
   export const environment = {
     production: false,
     API_ARTICLE_URL: 'http://localhost:8080'
   };
   ```

---

### Execução com Docker

No repositório do [Docker Hub](https://hub.docker.com/r/leltondev/system-wiki-front), estão disponíveis as imagens do projeto.

#### 1. Execução de uma única imagem

Execute o comando abaixo para subir o Front-end:

```shell
docker run -p 80:80 -e PROD=true -e API_ARTICLE_URL=http://backend:8080 leltondev/system-wiki-front:1.1.0-nginx
```

#### 2. Execução com Docker Compose

Configure o `docker-compose.yml` com o seguinte conteúdo:

```yaml
services:
  frontend:
    image: leltondev/system-wiki-front:1.1.0-nginx
    environment:
      API_ARTICLE_URL: http://backend:8080
      PROD: true
    ports:
      - "80:80"
    networks:
      - system-wiki

networks:
  system-wiki:
    name: system-wiki-net
    driver: bridge
```

#### 3. Subindo todos os serviços com um único Docker Compose

Utilize o arquivo abaixo para executar o projeto completo:

```yaml
services:
  mongo:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: system-wiki
    ports:
      - "27017:27017"
    networks:
      - system-wiki

  mongo-express:
    image: mongo-express
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
      ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017/
      ME_CONFIG_BASICAUTH: false
    ports:
      - "8081:8081"
    networks:
      - system-wiki

  frontend:
    image: leltondev/system-wiki-front:1.1.0-nginx
    environment:
      API_ARTICLE_URL: http://backend:8080
      PROD: true
    ports:
      - "80:80"
    networks:
      - system-wiki

  backend:
    image: leltondev/system-wiki-back:1.1.0-jvm
    environment:
      CORS: true
      CORS_ORIGINS: /.*/
      MONGODB_URL: mongodb://root:example@mongo:27017/system-wiki?authSource=admin
      MONGODB_DATABASE: system-wiki
    ports:
      - "8080:8080"
    networks:
      - system-wiki

networks:
  system-wiki:
    name: system-wiki-net
    driver: bridge
```

---

**Nota:** Certifique-se de ajustar as credenciais e variáveis conforme necessário para o ambiente local.

--- 
