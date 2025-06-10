FROM node:20-alpine

ENV NODE_ENV=development   
WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install           

COPY . /app
EXPOSE 3001

CMD ["npm", "run", "dev"]
