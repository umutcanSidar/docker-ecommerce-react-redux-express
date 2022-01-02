FROM node:latest
RUN mkdir -p client
WORKDIR /client
COPY package.json /client/package.json
COPY package-lock.json /client/package-lock.json
RUN npm install
COPY . .

CMD ["npm","run", "start"]
