import{Keypair, Connection, PublicKey, LAMPORTS_PER_SOL} from "@solana/web3.js";

import{mintTo, getOrCreateAssociatedTokenAccount} from "@solana/spl-token";

import wallet from './wallet.json';

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com","confirmed");
const mint = new PublicKey("J2unnYoW2Vqner3YTcGrrPzCUf6aob5jYyy81y83KxmR");


(
    async () => {

        const tokenAccount = await getOrCreateAssociatedTokenAccount(
             connection,
             keypair,
             mint,
             keypair.publicKey,
        );


        const ata = tokenAccount.address; //associated token account
        console.log("Associated token account: ",ata.toBase58());
        //Associated token account:  E9S9Un5mcRtusuTks7cWrEVdH3dfkSteGZicdTww5KKf

        const amount = 1*LAMPORTS_PER_SOL;

        await mintTo(
            connection,
            keypair,
            mint,
            ata,
            keypair.publicKey,
            amount,
        );

        console.log("Minted ",amount," tokens to ",ata.toBase58());
        //Minted  1000000000  tokens to  E9S9Un5mcRtusuTks7cWrEVdH3dfkSteGZicdTww5KKf
    }

)();