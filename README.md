<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Instalaciones Recomendadas

* [Visual Studio Code](https://code.visualstudio.com/)
* [Postman](https://www.postman.com/downloads/)
* [Docker Desktop](https://www.docker.com/get-started) (descargar imagenes de BD)
* [Table Plus](https://tableplus.com/) (IDE de BD)

Descargar imagen de Postgres (se ejecuta en terminal)
```
docker pull postgres:14.3
```

## Instalar CLI

```bash
$ npm i -g @nestjs/cli
```

## Instalar depencencias

```bash
$ npm install
```

## Compilar la app

```bash
# Correr la aplicacion en modo debug y ver cambios
$ npm run start:dev
```

## Levantar imagen de Mongo en Docker
Desde la terminal del proyecto correr este comando para crear la BD (si no esta creada) y levantar el proceso de Mongo

```bash
$ docker-compose up -d
```

## TablePlus
Ingresar esta coneccion una vez que tu Docker este arriba con la imagen de mongodb

```bash
$ mongodb://localhost:27017/amazon
```
