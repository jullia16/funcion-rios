# Usa a imagem base do Nginx
FROM nginx:alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/share/nginx/html

# Remove os arquivos padrão do Nginx
RUN rm -rf ./*

# Copia todos os arquivos do seu projeto para o diretório do Nginx
COPY . .

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx quando o container rodar
CMD ["nginx", "-g", "daemon off;"]
