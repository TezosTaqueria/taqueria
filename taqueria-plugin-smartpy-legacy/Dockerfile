FROM ocaml/opam:alpine-3.15-ocaml-4.13

USER root

RUN apk add -U nano curl bash ca-certificates openssl ncurses coreutils python2 make gcc g++ libgcc linux-headers grep util-linux binutils findutils m4 gmp-dev

RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o /usr/bin/n && \
    chmod a+x /usr/bin/n && \
    N_NODE_MIRROR=https://unofficial-builds.nodejs.org/download/release n --arch x64-musl lts

RUN opam init -a --disable-sandboxing

RUN opam install ocamlfind

RUN bash <(curl -s https://smartpy.io/cli/install.sh) --with-smartml --yes