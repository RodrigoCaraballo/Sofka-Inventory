# Utiliza una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia la carpeta dist de tu proyecto local al directorio /app en el contenedor
COPY ./dist/apps/web-socket ./dist/apps/web-socket

# Copia cualquier otro archivo necesario para la ejecución de tu aplicación (por ejemplo, package.json)
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias con pnpm
RUN npm install -g pnpm && \
    pnpm install --production

# Expone el puerto en el que tu aplicación NestJS escucha (si es necesario)
EXPOSE 3000

# Define el comando para iniciar tu aplicación (asegúrate de que el archivo principal sea correcto)
CMD ["node", "dist/apps/web-socket/main.js"]
