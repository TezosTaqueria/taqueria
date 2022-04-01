FROM oxheadalpha/flextesa:latest
RUN mkdir /app
WORKDIR /app
COPY index.js /app/
RUN apk add net-tools nodejs npm
CMD node /app/index.js