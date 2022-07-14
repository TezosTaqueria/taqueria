
FROM debian:bullseye
FROM node:16

# Set the DENO_DIR environment variable to controll where the cache is built
RUN mkdir deno
ENV DENO_DIR=/deno

COPY --from=docker:dind /usr/local/bin/docker /bin/docker

# Make the binary executable
COPY ./taq /usr/local/bin/taq
RUN chmod +x /usr/local/bin

ENV PATH="/bin:{$PATH}"

# ENTRYPOINT [ "/usr/local/bin/taq" ]
