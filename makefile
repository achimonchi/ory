image_kratos= "oryd/kratos:v0.8.0-alpha.3"
host_kratos= "http://127.0.0.1"

create-network:
	docker network create kratos

# not working
build-kratos-migrate:
	docker build -f build/kratos.dockerfile -t test-kratos .

# working properly
run-kratos-compose:
	export URI_KRATOS=${host_kratos}
	docker-compose -f kratos/build/docker-compose.yaml up -d --build --force-recreate

# not working
run-kratos-manual:
	bash build/kratos.sh ${image_kratos}



