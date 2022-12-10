.PHONY: build
build: 
	docker-compose build

.PHONY: dev
dev:
	docker-compose up

.PHONY: stop
stop:
	docker kill $(docker ps -q) && docker rm $(docker ps -a -q)

.PHONY: remove
remove:
	docker system prune -af --volumes

.PHONY: dev-build
dev-build:
	docker-compose up --build
