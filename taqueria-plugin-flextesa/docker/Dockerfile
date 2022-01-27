FROM oxheadalpha/flextesa:latest
RUN mkdir /app
WORKDIR /app
COPY startFlextesa.ts /app/
RUN apk add net-tools && apk add nodejs && apk add npm
CMD node /app/startFlextesa.ts