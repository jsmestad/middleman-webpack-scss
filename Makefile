.PHONY: help
help: targets

.PHONY: targets
targets:
	@echo "\033[34mTargets\033[0m"
	@echo "\033[34m---------------------------------------------------------------\033[0m"
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-22s\033[0m %s\n", $$1, $$2}'

# Build targets
# -------------

.PHONY: dependencies
dependencies: dependencies-ruby dependencies-npm ## Install dependencies required by the application

.PHONY: dependencies-ruby
dependencies-ruby:
	bundle install

.PHONY: dependencies-npm
dependencies-npm:
	yarn install

.PHONY: lint
lint: lint-prettier ## Run lint tools on the code

.PHONY: lint-prettier
lint-prettier:
	./node_modules/.bin/prettier -l .babelrc webpack.config.js 'assets/{js,css}/**/*.{js,graphql,scss,css})'

.PHONY: format
format: format-prettier ## Run formatting tools on the code

.PHONY: format-prettier
format-prettier:
	./node_modules/.bin/prettier --write '.babelrc' 'webpack.config.js' 'assets/{js,css}/**/*.{js,graphql,scss,css}'

.PHONY: start
start: ## Start middleman locally
	bundle exec middleman serve

.PHONY: build
build: ## Build middleman
	bundle exec middleman build
