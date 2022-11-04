# Testes automatizados com Cypress - Avançado

Projeto desenvolvido junto ao curso de Cypress(Avançado) da escola TAT com intuito de fixar e aprimorar conhecimentos na ferramenta de automação de testes.

---
## Conceitos aprendidos durante o curso:

- Implementação de testes 100% flakiness-free.
- Interceptar requisições/respostas da API para utiliza-las nos testes.
- Mockar dados, simulando comunicação com a API.
- Garantir a robustez de um teste de GUI.
- Ler o localstorage do navegador.
- Simular atrasos nas chamadas da API.
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