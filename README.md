# ng-hc-starter

# loading sequence
![image](angular_seq.png)

## Holochain setup

Uses holochain RSM 0.0.1 
built to work with holochain build: 3675b58

ensure you have followed the instructions to install holochain including holochain-run-dna
do not use nix shell .. it is currently broken.

ensure you toolkit is up-to-date (rust and rustup)
install the wasm feature:
rustup target add wasm32-unknown-unknown

git clone the @holochain/conductor-api repo
run the ./install-holochain.sh script

install npm @holochain-open-dev/holochain-run-dna globally:
npm install -g @holochain-open-dev/holochain-run-dna 

from the dna directory:

choose to:
1. run the conductor against a pre-compiled WASM from inside the dna directory 
  - holochain-run-dna profiles.dna.gz
2. build the wasm manually:
  -  CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
  -  dna-util -c profiles.dna.workdir


## UI setup

from the UI directory:

in another shell enter the ui directory.  
npm install / yarn install  
npm start / yarn start  

