build:
	docker-compose build

start:
	docker-compose up -d

test:
	docker-compose exec api-trasformer sh -c "npm run test"

stop:
	docker-compose down

reset:
	docker-compose down -v

restart:
	docker-compose down
	docker-compose up -d