import {Keypair} from "@solana/web3.js";

const keypair = Keypair.generate();

console.log("New wallet: ",keypair.publicKey.toBase58());
//publicKey: 2BzujfTuA27NX5MTxL6pEPGPwp46r5ZxZZxSinjtgF9q

//console.log("Secret key: ",keypair.secretKey.toString());
//o save my private key in wallet.json
