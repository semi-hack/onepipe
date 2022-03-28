import axios from "axios";
import crypto from "crypto";

// TripleDes Encryption...
const encrypt = (secretKey, plainText) => {
    const bufferedKey = Buffer.from(secretKey, 'utf16le');

    const key = crypto.createHash('md5').update(bufferedKey).digest();
    const newKey = Buffer.concat([key, key.slice(0, 8)]);
    const IV = Buffer.alloc(8, '\0');

    const cipher = crypto.createCipheriv('des-ede3-cbc', newKey, IV).setAutoPadding(true);
    return cipher.update(plainText, 'utf8', 'base64') + cipher.final('base64');
}

const validate = async (type, ref) => {
    const word = crypto.randomBytes(5).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const otp = encrypt(process.env.API_SECRET, '12345678');

    const response = await axios.post('https://api.onepipe.io/v2/transact/validate', {
        request_ref: word,
        request_type: type,
        auth: {
            secure: otp,
            auth_provider: "DemoProvider"
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: ref,
    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if (response.data.status === 'Successful') {
       return response.data
    } else {
        return response.data.status
    }
 
}

export default validate;