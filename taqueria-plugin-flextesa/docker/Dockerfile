FROM oxheadalpha/flextesa:latest
RUN mkdir /app
WORKDIR /app
COPY startFlextesa.ts /app/
RUN apk add net-tools nodejs npm
CMD node /app/startFlextesa.ts