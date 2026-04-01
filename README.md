# 📚 Digilibra - Biblioteca Digital

Uma Single Page Application (SPA) para gerenciamento de acervo de uma biblioteca digital. Este projeto permite o cadastro, listagem, edição e exclusão de **Livros** e **Autores**.

Este frontend foi desenvolvido seguindo princípios estritos de **Vanilla Web Development**, sem a utilização de frameworks JavaScript pesados (como React, Angular ou Vue) ou bibliotecas de pré-processamento, garantindo alta performance, leveza e execução direta no navegador.

## 🚀 Tecnologias Utilizadas

* **HTML5:** Estrutura semântica da aplicação.
* **CSS3:** Estilização customizada nativa (Flexbox, CSS Grid) sem frameworks de UI.
* **JavaScript (ES6+):** Manipulação do DOM, controle de estado da SPA e consumo da API RESTful via `Fetch API`.

## ⚙️ Pré-requisitos e Dependências

Devido à arquitetura adotada, o frontend **não possui dependências externas** via gerenciadores de pacotes (como `npm` ou `yarn`). Não é necessário instalar o Node.js para rodar esta interface.

**No entanto, o frontend depende do Backend (API) para funcionar corretamente:**
* A API em Python/Flask deve estar em execução na sua máquina local.

## 🛠️ Instruções de Instalação e Configuração

Siga os passos abaixo para executar a aplicação no seu ambiente local:

### 1. Clonando o repositório
Abra o seu terminal e clone este repositório para a sua máquina:
```bash
git clone https://github.com/victorvazdev/digilibra-front.git
cd digilibra-front
```

### 2. Configurando a conexão com a API
Por padrão, o frontend está configurado para se comunicar com a API local na porta 8000.

Caso precise alterar o endereço da API, edite o arquivo api.js localizado na raiz do projeto:

```javascript
// api.js
const API_URL = 'http://127.0.0.1:8000'; // Altere para o endereço e porta corretos da sua API
```

### 3. Executando a Aplicação (Comandos de Inicialização)
Para inicializar o frontend, basta dar um duplo clique no arquivo principal:

1. Navegue até a pasta do projeto através do gerenciador de arquivos do seu sistema operacional.
2. Dê um duplo clique no arquivo index.html.
3. O projeto será aberto e executado imediatamente no seu navegador padrão web (Chrome, Firefox, Edge, Safari, etc).

## 📂 Estrutura de Arquivos
A aplicação adota o princípio de Separation of Concerns (Separação de Responsabilidades), dividindo a lógica de negócio em módulos independentes:

`index.html`: Estrutura principal, templates e containers da SPA.
`styles.css`: Regras de design, cores, responsividade e layout (Grid/Flexbox).
`api.js`: Configurações globais e estado base do sistema.
`app.js`: Lógica de roteamento da SPA e inicialização de eventos.
`authors.js`: Lógica de negócio, CRUD e renderização do módulo de Autores.
`books.js`: Lógica de negócio, CRUD e renderização do módulo de Livros.
