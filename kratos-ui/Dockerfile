FROM node:16-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package.json .
RUN npm install

# ENV NEXT_PUBLIC_KRATOS_HOST=http://localhost:3000

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

