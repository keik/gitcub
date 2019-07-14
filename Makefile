TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

NPM=$(shell npm bin)

.PHONY: start build clean

start: build
	@echo $(TAG)$@$(END)
	npm run start

build: node_modules
	@echo $(TAG)$@$(END)
	npx lerna run build
	npx lerna run test
	npm run lint
	npm run typecheck

node_modules: FORCE
	@echo $(TAG)$@$(END)
	npm i
	npx lerna bootstrap

clean:
	@echo $(TAG)$@$(END)
	npm run clean

FORCE:
