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
	cd kratos-ui && docker build -t ory-ui:${tag} -f Dockerfile .
	docker tag ory-ui:${tag} ory-ui:latest

running-frontend:
	docker run -d --name ory-frontend \
		-p 127.0.0.1:3001:3000 \
		ory-ui:latest

remove-frontend:
	docker rm -f ory-frontend

build-and-run-frontend:
	make build-frontend tag=${tag}
	make remove-frontend
	make running-frontend
