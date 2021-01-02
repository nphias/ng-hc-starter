# Zome Developer Setup

This folder has an example DNA for the `profiles` zome. The actual code for the zome is in `zomes/profiles`.

To change the code, you can work either opening VSCode inside the root folder of the repo or in this folder, you should have rust intellisense either way.

## Requirements

Uses holochain RSM 0.0.1 
built to work with holochain build: 3675b58

Ensure you toolkit is up-to-date (rust and rustup)
from the command line:
  - rustup update
  
install the wasm feature:
  - rustup target add wasm32-unknown-unknown

follow instructions to install holochain including holochain-run-dna:
  - do not use nix shell .. it is currently broken.
  - git clone the @holochain/conductor-api repo (or just download the install-holochain.sh script file)
  - run the ./install-holochain.sh script

install npm @holochain-open-dev/holochain-run-dna globally:
  - npm install -g @holochain-open-dev/holochain-run-dna 

## Building

```bash
CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
dna-util -c profiles.dna.workdir/
```

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
holochain-run-dna profiles.dna.gz
```

Now `holochain` will be listening at port `8888`;

