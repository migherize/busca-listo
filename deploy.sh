#!/bin/bash
set -a
source .env
set +a

IMAGE_NAME=${APP_NAME:-my-app}

echo "🔹 Construyendo la imagen Docker: $IMAGE_NAME ..."
docker build -t $IMAGE_NAME .

# Detener y eliminar contenedor previo si existe
if [ "$(docker ps -aq -f name=$IMAGE_NAME)" ]; then
    echo "🛑 Deteniendo y eliminando contenedor previo..."
    docker rm -f $IMAGE_NAME
fi

# Ejecutar nuevo contenedor
echo "🚀 Levantando contenedor en puerto ${PORT:-80}..."
docker run -d \
  --name $IMAGE_NAME \
  -p ${PORT:-80}:80 \
  $IMAGE_NAME

echo "✅ Despliegue completo. Tu app está en http://localhost:${PORT:-80}"
