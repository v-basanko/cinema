FROM node:12.0
ENV INSTALL_PATH /rest-api
WORKDIR $INSTALL_PATH
COPY package.json $INSTALL_PATH/
RUN npm install -g nodemon
RUN npm install  --silent
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it && \
    chmod +x /usr/local/bin/wait-for-it
COPY . .
EXPOSE 8080