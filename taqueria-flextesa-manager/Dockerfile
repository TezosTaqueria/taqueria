# Should point to the latest stable version, so it needs to be updated as part of our release process.
FROM oxheadalpha/flextesa:20221026
RUN mkdir /app
WORKDIR /app
COPY index.js /app/
RUN apk add net-tools nodejs npm
CMD node /app/index.js