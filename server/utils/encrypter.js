const crypto = require('crypto')
const { uniqueString } = require('../helpers/uniqueString')
const encryptionKey = uniqueString(50)
const algorithm = "aes-192-cbc";
const key = crypto.scryptSync(encryptionKey, "salt", 24);

const encrypt = (clearText) => {
    console.log('token---->', encryptionKey);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(clearText, "utf8", "hex");
    return [
        encrypted + cipher.final("hex"),
        Buffer.from(iv).toString("hex"),
    ].join("lex");
}

const dencrypt = (encryptedText) => {
    const [encrypted, iv] = encryptedText.split("lex");
    if (!iv) throw new Error("IV not found");
    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        Buffer.from(iv, "hex")
    );
    return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
}


module.exports = {
    encrypt,
    dencrypt
}
