import * as ed from 'noble-ed25519';

const privateKey = ed.utils.randomPrivateKey(); // 32-byte Uint8Array or string.
const msgHash = 'magic';


export async function createWallet() {
    const publicKey = await ed.getPublicKey(privateKey);
    const signature = await ed.sign(msgHash, privateKey);
    const isSigned = await ed.verify(signature, msgHash, publicKey);
}