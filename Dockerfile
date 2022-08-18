FROM alpine
FROM node:16


RUN mkdir -m 777 deno
ENV DENO_DIR=./deno

COPY --from=docker:dind /usr/local/bin/docker /bin/docker

RUN chmod +x /usr/local/bin

ENV PATH="/bin:{$PATH}"
