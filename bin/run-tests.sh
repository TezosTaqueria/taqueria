#!/usr/bin/env bash
# Test runner wrapper script
# Usage: run-tests.sh [--e2e] [--skip-setup] <command...>
#
# Options:
#   --e2e        Add taq binary to PATH (for e2e tests)
#   --skip-setup Skip running before-all-tests.sh
#
# Examples:
#   run-tests.sh deno test unit/ --allow-all
#   run-tests.sh --e2e pnpm exec jest --config jest.config.e2e.ts

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TAQUERIA_ROOT="$(dirname "$SCRIPT_DIR")"
TESTS_DIR="$TAQUERIA_ROOT/tests"

# Parse options
E2E_MODE=false
SKIP_SETUP=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --e2e)
            E2E_MODE=true
            shift
            ;;
        --skip-setup)
            SKIP_SETUP=true
            shift
            ;;
        *)
            break
            ;;
    esac
done

# Run setup unless skipped
if [ "$SKIP_SETUP" = false ]; then
    "$SCRIPT_DIR/before-all-tests.sh"
fi

# Add taq to PATH for e2e tests
if [ "$E2E_MODE" = true ]; then
    export PATH="$TAQUERIA_ROOT:$PATH"
fi

# Set TEST environment variable
export TEST=true

# Execute the command
exec "$@"
