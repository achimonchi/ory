image_kratos= "oryd/kratos:v0.8.0-alpha.3"
host_kratos= "http://localhost"

create-network:
	docker network create kratos

# not working
build-kratos-migrate:
	docker build -f build/kratos.dockerfile -t test-kratos .

# working properly
run-kratos-compose:
	docker-compose -f kratos/build/docker-compose.yaml up -d --build --force-recreate

# not working
run-kratos-manual:
	bash kratos/build/kratos.sh ${image_kratos}


build-frontend:
	cd kratos-ui && docker build -t ory-ui:${tag} -f Dockerfile --build-arg NEXT_PUBLIC_KRATOS_HOST=${NEXT_PUBLIC_KRATOS_HOST} .
	docker tag ory-ui:${tag} ory-ui:latest

running-frontend:
	docker run -d --name ory-frontend \
		-p 127.0.0.1:3001:3000 \
		--env NEXT_PUBLIC_KRATOS_HOST=${NEXT_PUBLIC_KRATOS_HOST} \
		ory-ui:latest

remove-frontend:
	docker rm -f ory-frontend

build-and-run-frontend:
	make build-frontend tag=${tag}
	make remove-frontend
	make running-frontend


# for oathkeeper
generate-id-token:
	docker run oryd/oathkeeper:v0.38.12-beta.1 credentials generate --alg RS256 > oathkeeper/config/jwks.json

build-oathkeeper:
	cd oathkeeper && docker build -t ory-oathkeeper:${tag} -f Dockerfile .
	docker tag ory-oathkeeper:${tag} ory-oathkeeper:latest

run-oathkeeper:
	docker run -d --name oathkeeper \
		-p 5566:5566 \
		-p 5565:5565 \
		ory-oathkeeper:latest \
		--config ./config.yaml \
		serve

remove-oathkeeper:
	docker rm -f oathkeeper

build-and-run-oathkeeper:
	make build-oathkeeper tag=${tag}
	make remove-oathkeeper
	make run-oathkeeper