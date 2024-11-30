FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install react-scripts -g
RUN npm install
COPY . .
EXPOSE 3000
ENV PORT=3000
ENV WDS_SOCKET_PORT=0
CMD ["npm", "start"]