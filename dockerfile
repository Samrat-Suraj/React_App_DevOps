FROM node:alpine
WORKDIR /app
COPY . /app
EXPOSE 5173
RUN npm install
CMD ["npm","run","dev"]

