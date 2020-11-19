REACT_APP_API_URL         ?= http://hiredev.theksquaregroup.com
REACT_APP_LOGROCKET_ID    ?=

DOCKER_COMPOSE_PROJECT    ?= kshire-webui
DOCKER_REPOSITORY         ?= ksquare/kshire-webui
DOCKER_LOCAL_REPOSITORY   ?= $(DOCKER_REPOSITORY)
DOCKER_BUILDER_TAG        := kshire-webui:builder

REVISION                  = $(shell git rev-parse --short=7 HEAD)
BRANCH_NAME               = $(shell git rev-parse --abbrev-ref HEAD)

DOCKER_TAG_SUFFIX         ?=
DOCKER_TAG                := $(REVISION)$(shell if [ ! -z "$(DOCKER_TAG_SUFFIX)" ]; then echo "-$(DOCKER_TAG_SUFFIX)"; fi)
DOCKER_REPOSITORY_TAG     := $(DOCKER_REPOSITORY):$(REVISION)
VIRTUAL_HOST              ?= hire-ui.ksquareinc.test

export REVISION
export DOCKER_REPOSITORY_TAG
export DOCKER_TAG_SUFFIX
export VIRTUAL_HOST

export REACT_APP_API_URL
export REACT_APP_LOGROCKET_ID

## Non-interactive fronted runner
define docker-run
	docker run \
		--rm \
		-e CI=true \
		-t $(DOCKER_BUILDER_TAG) \
		$(1)
endef

all: setup build

## Start front-end container in detached mode
start:
	docker-compose up -d

## Stop the containers but don't remove them
stop:
	docker-compose stop

## Cleans and install dependencies
setup:
	yarn install --frozen-lockfile

## Run setup and image targets
build: setup
	yarn build

## Run JS linter, intented for CI environment
js-lint:
	node ./node_modules/.bin/eslint ./src

## Run tests in CI mode, will fail if a test fails
test:
	yarn ci-test

## Run coverage analysis
coverage:
	yarn coverage

## Show descriptions for Makefile targets
help:
	@echo $$'Available targets:\n'
	@grep -e "^##" -A1 $(MAKEFILE_LIST) | \
		sed -e "/^--$\/d; s/\:.*$\//g; s/\#\#\s*//g" | \
		awk '{if(NR%2 == 0) {printf("\t%-16s\t%s\n", $$0, f)} { f=$$0 }}'

## Creates a builder image
docker-builder:
	docker build \
		-t $(DOCKER_BUILDER_TAG) \
		-f Dockerfile.builder .

## Creates a distribution image
docker-image: docker-builder
	docker build \
		--build-arg REACT_APP_API_URL="$(REACT_APP_API_URL)" \
		--build-arg REACT_APP_LOGROCKET_ID="$(REACT_APP_LOGROCKET_ID)" \
		-t $(DOCKER_REPOSITORY_TAG) \
		-f Dockerfile .

## Runs linter check inside a container
docker-ci-lint:
	$(call docker-run,yarn lint)

## Runs CI test inside a container
docker-ci-test:
	$(call docker-run,yarn test)

## Runs coverage checks inside a container
docker-coverage:
	$(call docker-run,yarn coverage)

## Runs all QA checks inside a container
docker-code-qa: docker-image
	parallel \
		$(MAKE) ::: docker-ci-lint docker-ci-test docker-coverage
