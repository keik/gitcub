# GitCub

[![CircleCI](https://circleci.com/gh/keik/gitcub/tree/develop.svg?style=svg)](https://circleci.com/gh/keik/gitcub/tree/develop)
[![Coverage Status](https://img.shields.io/coveralls/keik/gitcub.svg?style=flat-square)](https://coveralls.io/github/keik/gitcub)

Performant GitHub clone application powered by React + Express as universal JavaScript.


## Development status

Under development.

Implemented features:

- [x] Git repository viewer
- [x] Push / Pull via HTTP(s)
- [ ] Authentication
- [ ] Issues
- [ ] Pull requests
- [ ] ...


## Demo

https://gh0.herokuapp.com/


## Build and run

```
make build start
```

Application configurations are available by `config.json`


## Development

### Run dependent services

Run MySQL and Redis by Docker

```
docker-compose up -d
```

### Initiaize database


Creating

```
npx sequelize db:create
```

Seeding

```
npx sequelize db:seed
```

Migrating

```
npx sequelize db:migrate
```


### Coding

Watch changes and build incrementally with

```
npm run watch:js      # for frontend
npm run watch:server  # for server
```

Also watch internal package `@gitcub/ui`, add follows


```
cd packages/ui
npx tsc -w
```


## Test

```
npm test
```


## License

MIT &copy; keik
