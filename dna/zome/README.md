# Zome Developer Setup

This folder links to DNA for the `profiles` zome. The code reference for the zome is in `zomes/profiles`.

To see the API for the profiles zome and integration details visit:
https://github.com/holochain-open-dev/profiles


## Building

All the instructions here assume you are running them inside the nix-shell inside the `zome` directory 

```bash
CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
hc dna pack workdir/dna
hc app pack workdir/happ
```

This should create a `workdir/happ/profiles.happ` file.

## Testing

After having built the DNA:

```bash
cd test
npm install
npm test
```

## Running

After having built the DNA:

```bash
hc s generate workdir/happ/profiles.happ --run=8888
```

Now `holochain` will be listening at port `8888`;

# Running two player mode

if on your same machine you wil need 4 browser windows (two for holochain and two for the UI)

hc s generate workdir/happ/profiles.happ --run=8888 network -b yourbootstapserver quic
hc s generate workdir/happ/profiles.happ --run=8889 network -b yourbootstapserver quic
