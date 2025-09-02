include .env
.PHONY: setup-env install-deps start-db start-rails-app local-setup

db_create:
	RAILS_ENV=development bundle exec rails db:create

db_migrate:
	RAILS_ENV=development bundle exec rails db:migrate

db_drop:
	docker exec -it rails_postgres psql -U $(DB_USER) -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname!='postgres';"

setup-env:
	@echo "Checking if .env file exists..."
	@if [ ! -f .env ]; then \
		echo ".env not found. Copying from .env.example..."; \
		cp .env.example .env; \
	else \
		echo ".env already exists. No actions needed."; \
	fi
	@echo ""

install-deps:
	@echo "Checking for 'node_modules' directory..."
	@if [ ! -d node_modules ]; then \
		echo "'node_modules' not found. Installing npm dependencies..."; \
		npm install; \
	else \
		echo "'node_modules' already exists. Skipping installation."; \
	fi
	@echo ""

start-db:
	@echo "Checking if 'rails_postgres' container is running..."
	@if [ $$(docker ps -q -f name=rails_postgres) ]; then \
		echo "Container 'rails_postgres' is already up and running."; \
	else \
		echo "Container 'rails_postgres' is not running. Starting it now..."; \
		docker compose up -d db; \
	fi
	@echo ""

start-rails-app:
	@echo "Checking if 'rails_organizational-chart' container is running..."
	@if [ $$(docker ps -q -f name=rails_organizational-chart) ]; then \
  	echo "Container 'rails_organizational-chart' is already up and running."; \
	else \
    echo "Container 'rails_organizational-chart' is not running. Starting it now..."; \
    docker compose up -d app --build; \
	fi
	@echo ""

local-setup: setup-env install-deps start-db start-rails-app
	@echo "All setup is complete. Access 'http://localhost:3000'."