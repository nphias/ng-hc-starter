# ng--hc-starter

# loading sequence
![image](angular_seq.png)

## Holochain setup

Uses holochain RSM 0.0.1 
ensure you have followed the instructions to install holochain including holochain-run-dna
use nix shell from the rsm install directory, change to the project directory
run the conductor against a pre-compiled WASM from inside the dna directory :

-  RUST_LOG=warn holochain-run-dna profiles.dna.gz

## UI setup

in another shell enter the ui directory.  
npm install / yarn install  
npm start / yarn start  

