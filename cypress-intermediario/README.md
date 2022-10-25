# Testes automatizados com Cypress - Intermediario

Projeto desenvolvido junto ao curso de Cypress(Intermediario) da escola TAT com intuito de fixar e aprimorar conhecimentos na ferramenta de automação de testes.

## Setup do ambiente local com DOCKER
Execute o comando __docker run --publish 80:80 -p 22:22 --hostname localhost wlsf82/gitlab-ce__ e aguarde até o ambiente inicializar, e então, acesse a URL http://localhost/ para definir a senha do usuario root.

#### Criando um Access Token
- Faça login com o usuário root com a senha definida na seção anterior.
- Clique no avatar do usuário no canto superior direito da tela, clique no link __Settings__, e então clique no menu lateral esquerdo na opção __Access Token__
- No campo nome, digite o valor __curso-cypress-intermediario__, na seção __Scopes__ marque a opção __'api'__, e então clique no botão __Create personal access token__. 

> Uma mensagem de que o token foi criado com sucesso deve ser exibida, além do token propriamente dito. Copie o token clicando no botão à direita do campo e guarde-o para utiliza-lo posteriormente.

#### Adicionando uma chave SSH
- No terminal, digite o seguinte comando e pressione ENTER __ssh-keygen -t ed25519 -C "root@example.com"__.
- Será solicitado um caminho para salvar a chave. Pressione ENTER para aceitar o caminho padrão.
- Será solicitada um senha. Pressione ENTER para que a senha não seja necessária.
- Será solicitado que repita a senha. Pressione ENTER novamente para que a senha não seja necessária.
- No terminal, digite o seguinte comando e pressione ENTER para copiar a chave pública recém criada para a área de transferência __pbcopy < ~/.ssh/id_ed25519.pub__ (ou no Git Bash use o comando __cat ~/.ssh/id_ed25519.pub | clip__)
- Logando na aplicação com o usuário __root__, clique no avatar do usuário no canto superior da tela, clique no link __Settings__, e então clique no menu lateral esquerdo na opção __SSH Keys__
- Cole sua chave SSH pública no campo key. O campo Title deve ser automaticament prenchido.
- Por fim, clique no botão __Add key__.

> Ao tentar rodar o teste por clone do Repo através da Chave SSH, um erro pode ocorrer, sendo necessário aplicar o comando __ssh-keygen -R localhost__ , pressioar ENTER e rodar o teste novamente.
---
## Conceitos aprendidos durante o curso:
- Configuração de um container Docker e a importância do uso para testes.
- Configuração de BaseURL no Cypress.
- Utilização da lib Faker para geração de dados aleatórios.
- Testes de API, utilizando Access Token, metodos customizados para as chamadas e dependências entre comandos customizados.
- Como trabalhar com testes de API e GUI quando há testes com muitas pré condições.
- Como utilizar testes por CLI aliados a testes de GUI.
---
### **Pré Requisitos**:
Para executar o projeto de testes em seu computador, é necessário ter instalado: 

- [git](https://git-scm.com/) (utilizei a v2.38.1.windows.2);
- [Node.js](https://nodejs.org/en/) (utilizei a v16.18.0);
- [npm](https://www.npmjs.com/) (utilizei a v8.19.1);

> É recomendado a utilização das mesmas versões ou mais recentes.
> Para verificar as versões do git, Node.js e npm instaladas, execute o comando `git --version && node --version && npm --version`;

### **Instalação**:
Execute o comando **npm install** para instalar as dependências do projeto.

### **Comandos para execução de testes**:

>Execute este comando para abrir o Cypress em modo Interativo;
~~~
npm run
~~~

>Execute este comando para abrir o Cypress em modo Headless;
~~~
npm open
~~~