
FROM --platform="$TARGETPLATFORM" alpine:3.16
FROM --platform="$TARGETPLATFORM" node:16

RUN mkdir -m 777 deno
RUN echo "I am building for $TARGETPLATFORM"
ENV DENO_DIR=./deno

COPY --from=docker:dind /usr/local/bin/docker /bin/docker

COPY ./taq /usr/local/bin/taq
RUN chmod +x /usr/local/bin

ENV PATH="/bin:{$PATH}"
