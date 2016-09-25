TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

npm=$(shell npm bin)

.PHONY: all start watch build test clean

all: build

start: build
	@echo $(TAG)$@$(END)
	node build/server

watch: node_modules
	@echo $(TAG)$@$(END)
	$(npm)/babel lib --ignore lib/client --out-dir build
	DEBUG="gh:*" $(npm)/parallelshell \
		'$(npm)/babel lib --ignore lib/client --out-dir build --watch --skip-initial-build --source-maps inline' \
		'$(npm)/webpack --config webpack.client.config.js --devtool sourcemap --watch' \
		'$(npm)/nodemon build/server --watch build --ignore build/assets'

build: node_modules clean test
	@echo $(TAG)$@$(END)
	$(MAKE) build-client build-server

build-client: node_modules
	BUILD_ENV=production $(npm)/webpack --config webpack.client.config.js

build-server: node_modules
	$(npm)/babel lib --ignore lib/client --out-dir build

lint: node_modules

test: node_modules
	@echo $(TAG)$@$(END)
	$(npm)/standard '{lib/**/*.js,test/**/*.js}'
	$(npm)/nyc --require babel-register --all \
		--include 'lib/**' \
		--exclude 'lib/{server/index.js,client/app.js}' \
		$(npm)/ava 'test/test-*.js'

clean:
	@echo $(TAG)$@$(END)
	rm -rf build

node_modules: package.json
	@echo $(TAG)$@$(END)
	npm install
