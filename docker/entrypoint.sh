#!/bin/sh
set -e

: "${API_URL:=http://localhost:8000/api/v1}"

cat > /usr/share/movies/dist/config.json <<EOF
{
  "API_URL": "${API_URL}"
}
EOF

exec "$@"
