# gh

[![Travis CI](https://img.shields.io/travis/keik/gh.svg?style=flat-square)](https://travis-ci.org/keik/gh)
[![Coverage Status](https://img.shields.io/coveralls/keik/gh.svg?style=flat-square)](https://coveralls.io/github/keik/gh)

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
npm run watch
```


## Test

```
npm test
```


## License

MIT &copy; keik
