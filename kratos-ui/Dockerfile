FROM node:16-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package.json .
RUN npm install

ARG NEXT_PUBLIC_KRATOS_HOST=http://localhost:4433

RUN echo $NEXT_PUBLIC_KRATOS_HOST

ENV NEXT_PUBLIC_KRATOS_HOST=$NEXT_PUBLIC_KRATOS_HOST

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

