import axios from "axios"
import crypto from "crypto";
import validate from "./utils.js";


// TripleDes Encryption...
const encrypt = (secretKey, plainText) => {
    const bufferedKey = Buffer.from(secretKey, 'utf16le');

    const key = crypto.createHash('md5').update(bufferedKey).digest();
    const newKey = Buffer.concat([key, key.slice(0, 8)]);
    const IV = Buffer.alloc(8, '\0');

    const cipher = crypto.createCipheriv('des-ede3-cbc', newKey, IV).setAutoPadding(true);
    return cipher.update(plainText, 'utf8', 'base64') + cipher.final('base64');
}

const lookupNuban = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const bankVerificationNumber = encrypt(process.env.API_SECRET, "200756456789")


    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "lookup_Nuban",
        auth: {
            auth_provider: "DemoProvider",
            // type: 'bvn',
            // secure: bankVerificationNumber
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "A random transaction",
            transaction_ref_parent: null,
            amount: 0,
            customer: {
                customer_ref: "demo_53",
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                mobile_no: req.body.mobile_no
            },
            details: {
                account_number: req.body.account_no
            }

    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'lookup_Nuban'
        let ref = word;
        const responses = await validate(type, ref)
        return res.status(200).json(responses.data);
    }

    if (response.data.status === 'Successful') {
        return res.status(200).json(response.data);
       
     } else {
         return res.status(400).json({
             success: false,
             data: response.data
        })
     }

}

const getBank = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const bankVerificationNumber = encrypt(process.env.API_SECRET, "200756456789")


    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "get_banks",
        auth: {
            auth_provider: "DemoProvider",
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "A random transaction",
            transaction_ref_parent: null,
            amount: 0,
            customer: {
                customer_ref: "demo_53",
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                mobile_no: req.body.mobile_no
            },
            details: null
    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'get_banks'
        let ref = word;
        const responses = await validate(type, ref)
        return res.status(200).json(responses.data);
    }

    if (response.data.status === 'Successful') {
        return res.status(200).json(response.data);
       
     } else {
         return res.status(400).json({
             success: false,
             data: response.data
         })
     }

}

const listBranch = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const bankVerificationNumber = encrypt(process.env.API_SECRET, "200756456789")


    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "list_branches",
        auth: {
            auth_provider: "DemoProvider",
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "A random transaction",
            transaction_ref_parent: null,
            amount: 0,
            customer: {
                customer_ref: "demo_53",
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                mobile_no: req.body.mobile_no
            },
            details: null
    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'list_branches';
        let ref = word;
        const responses = await validate(type, ref)
        return res.status(200).json(responses.data);
    }

    if (response.data.status === 'Successful') {
        return res.status(200).json(response.data);
       
     } else {
         return res.status(400).json({
             success: false,
             data: response.data
         })
     }

}

const loanStatus = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "get_loan_status",
        auth: {
            auth_provider: "DemoProvider"
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "Create account transaction",
            transaction_ref_parent: null,
            amount: 0,
            customer: {
                customer_ref: "53",
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                mobile_no: req.body.mobile_no
            },
            details: null
    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

if(response.data.status === 'WaitingForOTP') {
    console.log('here');
    let type = 'get_loan_status'
    let ref = word;
    const responses = await validate(type, ref)
    return res.status(200).json(responses.data);
}


    if (response.data.status === 'Successful') {
       return res.render('account', {
            account_name: response.data.data.provider_response.account_name,
            account_number: response.data.data.provider_response.account_number,
        })
      
    } else {
        return res.status(400).json({
            success: false,
            data: response.data
        })
    }

}

export default { lookupNuban, getBank, loanStatus, listBranch }