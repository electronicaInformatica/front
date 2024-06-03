FROM node:18.16-alpine as build
RUN apk add --no-cache python3 py3-pip make gcc g++

COPY . .

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación para producción
RUN npm run dev
