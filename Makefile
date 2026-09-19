.PHONY: install test build run docker-build docker-up

install:
	cd client && npm ci
	cd server && npm ci

test:
	cd client && npm run lint
	cd server && node --check server.js

build:
	cd client && npm run build

run:
	cd client && npm run dev

# Needed from M4 onwards
docker-build:
	docker compose build

docker-up:
	docker compose up --build