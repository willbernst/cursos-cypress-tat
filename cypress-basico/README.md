# Testes automatizados com Cypress - Básico

Projeto desenvolvido junto ao curso de Cypress(Básico) da escola TAT com intuito de fixar e aprimorar conhecimentos na ferramenta de automação de testes.

## O que aprendi com este curso:

- Como configurar um projeto Cypress do zero.
- Como visitar páginas locais e remotas.
- Como lidar com os elementos mais comuns encontrados em aplicações web.
- Como testar _upload_ de arquivos.
- Como realizar as mais diversas verificações de resultados esperados.
- Como criar comandos customizados.
- Como lidar com links que abrem em outra aba do navegador.
- Como rodar testes simulando as dimensões de um dispositivo móvel.
- Como resolver os mesmos problemas de diferentes formas, conhecendo a [API do Cypress](https://docs.cypress.io/api/table-of-contents).
- Como executar os testes em um _pipeline_ de integração contínua sempre que mudanças ocorrerem no código da aplicação (ou dos testes).
- Como criar uma documentação mínima para seu projeto de testes automatizados.

-----------------------------------------------------------------------------------------------------------

### **Pré Requisitos**:
Para executar o projeto de testes em seu computador, é necessário ter instalado: 

- [git](https://git-scm.com/) (utilizei a v2.33.0.windows.2);
- [Node.js](https://nodejs.org/en/) (utilizei a v16.13.2);
- [npm](https://www.npmjs.com/) (utilizei a v8.1.2);

> É recomendado a utilização das mesmas versões ou mais recentes.
> Para verificar as versões do git, Node.js e npm instaladas, execute o comando `git --version && node --version && npm --version`;

### **Instalação**:
Execute o comando **npm install** para instalar as dependências do projeto.

### **Comandos para execução de testes**:

>Execute este comando para abrir o Cypress em modo Interativo;
~~~
npm run cy:open
~~~

>Execute este comando para abrir o Cypress em modo Headless;
~~~
npm run cy:run
~~~

>Execute este comando para abrir o Cypress em modo Interativo simulando viewport Mobile;
~~~
npm run cy:open:mobile
~~~

>Execute este comando para abrir o Cypress em modo Headless simulando viewport Mobile;
~~~
npm run cy:run:mobile
~~~