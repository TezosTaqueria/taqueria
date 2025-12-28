{
  description = "Taqueria development environment with LIGO compiler";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        # LIGO static binary (version 1.12.1)
        # Download from GitLab artifacts
        ligo = pkgs.stdenv.mkDerivation {
          pname = "ligo";
          version = "1.12.1";

          src = pkgs.fetchurl {
            url = "https://gitlab.com/ligolang/ligo/-/jobs/11403991547/artifacts/raw/ligo";
            sha256 = "sha256-to1q5tSIYpBjiFhpo8DulonzQiWu8lPWfqb4FmxOnoo=";
          };

          dontUnpack = true;

          installPhase = ''
            mkdir -p $out/bin
            cp $src $out/bin/ligo
            chmod +x $out/bin/ligo
          '';

          meta = with pkgs.lib; {
            description = "LIGO - A friendly Smart Contract Language for Tezos";
            homepage = "https://ligolang.org";
            license = licenses.mit;
            platforms = [ "x86_64-linux" ];
          };
        };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "taqueria-dev";

          buildInputs = with pkgs; [
            # LIGO smart contract compiler for Tezos
            ligo

            # Node.js and pnpm for the monorepo
            nodejs_20
            nodePackages.pnpm

            # Deno for the CLI
            deno

            # Python with uv for SmartPy
            # Install SmartPy with: uv add smartpy-tezos
            python312
            uv

            # Git for version control
            git

            # Docker CLI (runtime provided by host)
            docker-client
          ];

          shellHook = ''
            echo "Taqueria development environment loaded"
            echo "LIGO version: $(ligo --version 2>/dev/null || echo 'checking...')"
            echo "Node.js version: $(node --version)"
            echo "Deno version: $(deno --version | head -1)"
            echo "pnpm version: $(pnpm --version)"
            echo "Python version: $(python --version)"
            echo "uv version: $(uv --version)"
            echo ""
            echo "To install SmartPy: uv add smartpy-tezos"
          '';
        };
      }
    );
}
