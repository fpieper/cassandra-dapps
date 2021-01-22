import * as ed from 'noble-ed25519';




export async function createEdSignature(msg: string) {
    // const privateKey = ed.utils.randomPrivateKey(); // 32-byte Uint8Array or string.
    // const publicKey = await ed.getPublicKey(privateKey);
    // const signature = await ed.sign(msg, privateKey);

    return 'crypto.getRandomValues(privateKey).toString()'
}