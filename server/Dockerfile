FROM node:latest
RUN mkdir -p server
WORKDIR /server/
COPY package.json /server/package.json
COPY package-lock.json /server/package-lock.json

RUN npm install

COPY . .
CMD ["npm", "start"]