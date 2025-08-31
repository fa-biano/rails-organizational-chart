include .env

db_create:
	RAILS_ENV=development bundle exec rails db:create

db_migrate:
	RAILS_ENV=development bundle exec rails db:migrate

db_drop:
	docker exec -it rails_postgres psql -U $(DB_USER) -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname!='postgres';"