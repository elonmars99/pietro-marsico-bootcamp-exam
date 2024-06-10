import {Keypair, Connection, PublicKey, LAMPORTS_PER_SOL} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

import wallet from './wallet.json';

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com","confirmed");
const mint = new PublicKey("J2unnYoW2Vqner3YTcGrrPzCUf6aob5jYyy81y83KxmR");
const fromAta = new PublicKey("E9S9Un5mcRtusuTks7cWrEVdH3dfkSteGZicdTww5KKf");

const to = Keypair.generate();
console.log("To address: ",to.publicKey.toBase58());
//To address:  FxyLC97DjuyLYkSiBZt917yzwcmqHTSKnPP4v32647sp

(
    async() => {

        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to.publicKey,
        );

        const toAta = tokenAccount.address;
        console.log("associated token account: ",toAta.toBase58());
        //associated token account:  BZyAoXQ8mBRs27qtbnjqUGwYpzygFNUzqVkDAHiENWXA

        const amountToAta = tokenAccount.amount;
        console.log("Amount in ATA: ",amountToAta);
        //Amount in ATA:  0n

        const amount=1*LAMPORTS_PER_SOL;

        await transfer(
            connection,
            keypair,
            fromAta,
            toAta,
            keypair,
            amount
        )


        console.log("Transferred ",amount," tokens from ",fromAta.toBase58()," to ",toAta.toBase58());
        //Transferred  1000000000  tokens from  E9S9Un5mcRtusuTks7cWrEVdH3dfkSteGZicdTww5KKf  to  BZyAoXQ8mBRs27qtbnjqUGwYpzygFNUzqVkDAHiENWXA
    }

)();