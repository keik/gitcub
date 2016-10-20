TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

NPM=$(shell npm bin)

BROWSERIFY_OPTS=\
  -e lib/client/main.js -e lib/client/repository.js \
  -p [ factor-bundle -o bundle/main.js -o bundle/repository.js ] \
  -p [ css-modulesify -o bundle/style.css -d ./lib/share ] \
  -t babelify \
  --extension jsx -v -o bundle/common.js

.PHONY: build start watch bundle test clean

build: clean lint test bundle
	@echo $(TAG)$@$(END)

start: build
	@echo $(TAG)$@$(END)
	node -r babel-register -r ./css-modules-register lib/server

watch: node_modules
	@echo $(TAG)$@$(END)
	mkdir -p bundle
	BABEL_ENV="development" DEBUG="keik:*,gh:*" $(NPM)/parallelshell \
		'$(NPM)/watchify $(BROWSERIFY_OPTS) -d' \
		'$(NPM)/nodemon \
			--exec "node -r babel-register -r ./css-modules-register lib/server" \
			-e .js,.jsx -w lib/server -w lib/share/components' \
		'$(NPM)/ava -r babel-register -r ./css-modules-register test/test-*.js --watch --source lib'

storybook: node_modules
	$(NPM)/start-storybook -p 6006

bundle: node_modules
	@echo $(TAG)$@$(END)
	mkdir -p $@
	BABEL_ENV="production" $(NPM)/browserify $(BROWSERIFY_OPTS)

test: node_modules
	@echo $(TAG)$@$(END)
	BABEL_ENV="test" $(NPM)/nyc -i babel-register -i ./css-modules-register --all \
		--include 'lib/**' \
		--exclude 'lib/{server/index.js,client/*.js,share/stories}' \
		$(NPM)/ava 'test/test-*.js'

lint: node_modules
	@echo $(TAG)$@$(END)
	$(NPM)/eslint '{lib/**/*.js,test/**/*.js}'

clean:
	@echo $(TAG)$@$(END)
	rm -rf bundle

node_modules: package.json
	@echo $(TAG)$@$(END)
	yarn || npm install
