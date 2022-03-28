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



// Create Account...
const createAccount = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "open_account",
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
            details: {
                name_on_account: req.body.accountName,
                otp_override: true,
                dob: req.body.dob,
                gender: req.body.gender,
                title: req.body.title,
                address_line_1: req.body.address_line_1,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country
            }

    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

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

// Get Balance...
const getBalance = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const words = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")


    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        "request_ref": word,
        "request_type": "get_balance",
        "auth": {
            "auth_provider": "Demoprovider"
        },
        "transaction": {
            "mock_mode": "inspect",
            "transaction_ref": word,
            "transaction_desc": "random transaction",
            "amount": 0,
            "customer": {
                "customer_ref": "35",
                "firstname": req.body.firstname,
                "surname": req.body.surname,
                "email": req.body.email,
                "mobile_no": req.body.mobile_no
            },
            "details": null
        },
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.API_KEY}`,
            'Signature': hased,
        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'get_balance'
        let ref = word;
        const responses = await validate(type, ref)
        return res.status(200).json(responses.data);
    }

    if (response.data.status === 'Successful') {
        res.render('balance', {
            available_balance: response.data.data.provider_response.available_balance
        })
        // return res.status(200).json({
        //     success: true,
        //     data: response.data
        // })
    } else {
        return res.status(400).json({
            success: false,
            data: response.data
        })
    }
}

// Get Statement..
const getStatement = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")


    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "get_statement",
        auth: {
            type: "bank.account", 
            auth_provider: "DemoProvider",
            route_mode: null
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get_statement",
            customer: {
                customer_ref: req.body._id,
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                mobile_no: req.body.mobile_no
            },
            // account_number: 200001999,
            amount: 0,
            details: {
                start_date: "2022-01-27",
                end_date: "2022-01-27",
            }
        }
    }, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'get_statement'
        let ref = word;
        const responses = await validate(type, ref)
        return res.status(200).json(responses.data);
    }

    if (response.data.status === 'Successful') {
        res.render('statement', {
            opening_balance: response.data.data.provider_response.opening_balance,
            closing_balance: response.data.data.provider_response.closing_balance
        })
        // return res.status(200).json({
        //     success: true,
        //     data: response.data
        // })
    } else {
        return res.status(400).json({
            success: false,
            data: response.data
        })
    }
}

// Collect..
const collect = async (req, res) => {
    const word = crypto.randomBytes(5).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const combination = req.body.accountNumber + ";" + req.body.bankCode
    const Evalue = encrypt(process.env.API_SECRET, combination)

    let final_amount = req.body.amount * 10

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "collect",
        auth: {
            type: "bank.account",
            secure: Evalue,
            auth_provider: "Demoprovider",
            route_mode: null
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get statement",
            customer: {
                customer_ref: req.body._id,
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                mobile_no: req.body.mobile_no
            },
            amount: final_amount,
            details: null
        }
    }, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'collect'
        let ref = word;
        const responses = await validate(type, ref)
        return res.status(200).json(responses.data);
    }

    if (response.data.status === 'Successful') {
        res.render('collect', {
            message: response.data.message,
            amount: response.data.data.provider_response.transaction_final_amount
        })
        // return res.status(200).json({
        //     success: true,
        //     data: response.data
        // })
    } else {
        return res.status(400).json({
            success: false,
            data: response.data
        })
    }

}



export default { createAccount, getBalance, getStatement, collect }