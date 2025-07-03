# wait-for-db.sh
#!/bin/sh

until pg_isready -h db -p 5432 -U postgres; do
  echo "Waiting for database connection..."
  sleep 2
done

echo "Database is ready!"
exec "$@"