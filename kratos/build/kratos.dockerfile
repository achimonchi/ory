FROM oryd/kratos:v0.8.0-alpha.3
ENV dsn=postgresql://kratos:kratos@localhost:5432/kratos?sslmode=disable
COPY config/kratos.yaml /etc/config/kratos/kratos.yml
RUN kratos migrate sql -e --yes --config /etc/config/kratos/kratos.yml