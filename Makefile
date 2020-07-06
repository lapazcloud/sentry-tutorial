build:
	$(MAKE) -C ./backend build
	$(MAKE) -C ./frontend build

start:
	docker-compose up -d

stop:
	docker-compose down
