# Taqueria development shell with LIGO compiler
# This file provides backwards compatibility for nix-shell users.
# The primary configuration is in flake.nix.
#
# Usage: nix-shell (requires flakes experimental feature)

(builtins.getFlake (toString ./.)).devShells.${builtins.currentSystem}.default
