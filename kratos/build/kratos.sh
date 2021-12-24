#!/bin/bash

docker run --rm --name ory-kratos \
    -e dsn=postgresql://kratos:kratos@kratos-db:5432/kratos?sslmode=disable \
    --network=kratos \
    $1
