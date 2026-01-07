# Remaining Fixes

## Taquito Plugin: Faucet URL should be network-aware

**Issue:** When originating a contract without a funded account, the taquito plugin displays:
```
To fund this account:
1. Go to https://teztnets.com and click "Faucet" of the target testnet
```

**Problem:** This is generic advice. For Shadownet, it should direct users to `https://faucet.shadownet.teztnets.com` directly, or at minimum reference the correct network.

**Location:** `taqueria-plugin-taquito/` - find where this message is generated

**Suggested Fix:** Make the faucet URL dynamic based on the target network:
- Shadownet → `https://faucet.shadownet.teztnets.com`
- Ghostnet → `https://faucet.ghostnet.teztnets.com`
- Or construct dynamically: `https://faucet.{networkName}.teztnets.com`
