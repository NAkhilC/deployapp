


# Define node version
FROM node:18-alpine AS client_build
# Define container directory
WORKDIR /app
# Copy package*.json for npm install
COPY ./ang-app /app/
# Run npm clean install, including dev dependencies for @angular-devkit
RUN npm install
# Run npm install @angular/cli
RUN npm install -g @angular/cli

# Run ng build through npm to create dist folder
RUN node_modules/.bin/ng build --configuration production


# Define node version
FROM node:18-alpine AS server_build
# Define container directory
WORKDIR /app
# Copy package*.json for npm install
COPY ./server /app/
COPY --from=client_build /app/dist/ang-app /app/ang-app
# Run npm clean install, prod dependencies only
RUN npm i


#docker image

FROM alpine
WORKDIR /app
RUN apk add --no-cache nodejs
COPY --from=server_build /app ./
EXPOSE 3000
CMD ["node", "server.js"]