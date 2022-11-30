FROM node:12
COPY . /app
WORKDIR /app
RUN npm install --only=prod
RUN npm run build
ENTRYPOINT ["npm", "start"]