# build stage
FROM node:16.18.0 as build-stage

ARG ENVIRONMENT=prod //Default value provided for prod and test

RUN echo "${ENVIRONMENT}"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run ${ENVIRONMENT}
COPY Staticfile ./dist
    
# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]