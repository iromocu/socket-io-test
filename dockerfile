# build stage
FROM node:18.16.0 as build-stage

ARG ENVIRONMENT=qa //Default value provided qa

RUN echo "${ENVIRONMENT}"

WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
COPY Staticfile ./dist
    
# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]