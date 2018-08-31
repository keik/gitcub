TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

NPM=$(shell npm bin)

.PHONY: start build clean

start: build
	@echo $(TAG)$@$(END)
	npm run start

build: node_modules
	@echo $(TAG)$@$(END)
	npm run clean
	npm run lint
	npm run typecheck
	npm run test
	npm run build

node_modules:
	@echo $(TAG)$@$(END)
	npm i

clean:
	@echo $(TAG)$@$(END)
	npm run clean
