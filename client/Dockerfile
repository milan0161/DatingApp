FROM node:18.16
WORKDIR /app

# COPY package.json .
COPY . .
RUN yarn


EXPOSE 5173

CMD [ "yarn", "dev" ]