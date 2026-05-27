.PHONY: install dev build lint typecheck validate test test-e2e clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

lint-fix:
	npm run lint:fix

typecheck:
	npm run typecheck

validate:
	npm run validate

format:
	npm run format

test:
	npm run test

test-watch:
	npm run test:watch

test-e2e:
	npx playwright install --with-deps chromium
	npm run test:e2e

ci: install typecheck lint build test

clean:
	rm -rf out .next node_modules
