##  📱 Your-Project 

### Backend de uma plataforma acadêmica, que possibilita alunos de qualquer escola ou faculdade publicarem projetos que buscam desenvolver, na intenção de que outros alunos se inscrevam no projeto e façam parte dele. A plataforma foi desenvolvida utilizando principalmente o banco de dados MySQL, Nodejs para controle do backend, jsonwebtoken para autorização e autenticação e outras diversas bibliotecas.  
## A autentificação de cada aluno exige o nome, sobrenome, número de identificação, sala de aula, número de telefone e email. Uma vez logado o aluno pode buscar os projetos que mais se interessa por um filtro de nicho, clicar no projeto e ver seu nome, descrição e até um vídeo de apresentação, caso tenha interesse pode se inscrever no projeto e fazendo isso deixa seu número de telefone, email e sala para contato podendo se desinscrever do projeto futuramente. Cada aluno tem em seu perfil suas informações que podem ser modificadas e projetos que estão inscritos 



## 💻 Tecnologias Usadas
<div style="display: inline_block"><br/>
<img align="center" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img align="center" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
<img align="center" src="https://shields.io/badge/MySQL-lightgrey?logo=mysql&style=plastic&logoColor=white&labelColor=blue">

## 💻 O Porque Das Minhas Escolhas Técnicas

#### Dividi a aplicação em 6 pastas onde agora apenas 3 estão visiveis.
Na controllers é onde deixamos toda funcionalidade do sistema separado em funções 
exemplo: Função A - Registra usuário
 Função B - Faz autentificação do usuário

No routes nos escrevemos quando devemos chamar essas funções apartir da rota e requisição ou seja se alguém fizer uma requisição post na rota "/registro" nós executamos a função A que vem dos controllers. Aqui também trabalhamos com a biblioteca multer para upload das fotos de usuários e vídeos dos projetos, se alguém fizer uma requisição na rota de login ou de post do projeto pegaremos o input do formulário que está o vídeo e a foto do aluno e iremos alocar os arquivos ai carregados em uma pasta específica

No db nós fazemos uma simples conexão com o banco de dados

Sobre as bibliotecas jsonwebtoken e bcrypt acredito que foram boas escolhas, tendo em mente que controlo a autenticação de A a Z do usuário com o jsonwebtoken e com a bcrypt consigo criptografar e fazer o salt da senha com duas linhas de código, economizando tempo, dados e organização. O multer permite realizar o upload de arquivos também com simples linhas de código facilitando muito o processo de desenvolvimento

## Instalação 

#### Clone o Projeto Com: </br>

git clone https://github.com/joaobarbanti/Your-Project
#### Entre na pasta e instale as dependências com: 
 Yarn
#### Com tudo correto você pode iniciar o servidor com:
yarn start
#### Se você estiver no ambiente de desenvolvimento, poderá usar o servidor de desenvolvimento:
yarn dev</br>
yarn queue
## Importante 💛

### a aplicação foi totalmente feita por mim joão ricardo mas você pode usar ela do jeito que preferir! seja para estudo,apoio nos estudos ou até para ganhar dinheiro quem sabe rsrs. entre em contato em joaobarbanti7@gmail.com.
</div>
