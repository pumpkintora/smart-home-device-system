FROM node:18

WORKDIR /user-management-server
COPY package.json .
RUN npm install
COPY . .
CMD npm start
