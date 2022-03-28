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

// Get Accounts Min
const AccountMin = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "get_accounts_min",
        auth: {
            auth_provider: "DemoProvider"
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get Account min",
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
        let type = 'get_accounts_min'
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

const AccountMid = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "get_accounts_mid",
        auth: {
            auth_provider: "DemoProvider"
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get Account min",
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
        let type = 'get_accounts_mid'
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

const BvnMin = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const secureBvn = encrypt(process.env.API_SECRET, "200234568694")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "lookup_bvn_min",
        auth: {
            type: "bvn",
            secure: secureBvn,
            auth_provider: "Demoprovider",
            route_mode: null
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get Account min",
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
                dob: "1990-09-12",
            }

    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'lookup_bvn_min'
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

const BvnMax = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const secureBvn = encrypt(process.env.API_SECRET, "200234568694")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "lookup_bvn_max",
        auth: {
            type: "bvn",
            secure: secureBvn,
            auth_provider: "Demoprovider",
            route_mode: null
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get Account min",
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
                dob: "1990-09-12",
                name_on_account: "uju usman"
            }

    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'lookup_bvn_max'
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

const NINMin = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const secureNin = encrypt(process.env.API_SECRET, "1209876509")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "lookup_nin_min",
        auth: {
            type: "nin",
            secure: secureNin,
            auth_provider: "Demoprovider",
            route_mode: null
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get Account min",
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
                dob: "1990-09-12",
                middle_name: "uju usman"
            }

    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'lookup_nin_min'
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

const NINMid = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "lookup_nin_mid",
        auth: {
            type: "nin",
            secure: "",
            auth_provider: "Demoprovider",
            route_mode: null
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get Account min",
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
                dob: "1990-09-12",
                name_on_account: "uju usman"
            }

    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'lookup_nin_mid'
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

const creditScore = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "get_credit_score",
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
        let type = 'get_credit_score'
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

const openUSDWallet = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "open_wallet",
        auth: {
            type: "bvn",
            secure: "",
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
            meta: {
                account_currency: "USD"
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

    

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'open_wallet'
        let ref = word;
        const responses = await validate(type, ref)
        return res.status(200).json(responses.data);
    }

    if (response.data.status === 'Successful') {
       return res.status(200).json(response.data)
      
    } else {
        return res.status(400).json({
            success: false,
            data: response.data
        })
    }

}


const BvnMid = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "lookup_bvn_mid",
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

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'lookup_bvn_mid'
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

const AccountMax = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "get_accounts_max",
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
        let type = 'get_accounts_max'
        let ref = word;
        const responses = await validate(type, ref)
        return res.status(200).json(responses.data);
    }

    if (response.data.status === 'Successful') {
       return res.status(200).json(response.data)
      
    } else {
        return res.status(400).json({
            success: false,
            data: response.data
        })
    }

}

const lookupAccountMin = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const accNumber = "0232321798"+";"+"011"
    const secureBank = encrypt(process.env.API_SECRET, accNumber)

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "lookup_account_min",
        auth: {
            type: 'bank.account',
            secure: secureBank,
            auth_provider: "DemoProvider"
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get Account min",
            transaction_ref_parent: null,
            amount: 0,
            customer: {
                customer_ref: "53",
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                mobile_no: req.body.mobile_no
            },
            details: {}

    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'lookup_account_min'
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

const lookupAccountMid = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const accNumber = "0232321798"+";"+"011"
    const secureBank = encrypt(process.env.API_SECRET, accNumber)

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "lookup_account_mid",
        auth: {
            type: 'bank.account',
            secure: secureBank,
            auth_provider: "DemoProvider"
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get Account min",
            transaction_ref_parent: null,
            amount: 0,
            customer: {
                customer_ref: "53",
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                mobile_no: req.body.mobile_no
            },
            details: {}

    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'lookup_account_mid'
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

const lookupAccountMax = async (req, res) => {
    const word = crypto.randomBytes(7).toString('hex');
    const value = word+";"+process.env.API_SECRET
    const hased = crypto.createHash('md5').update(value).digest("hex")
    const accNumber = "0232321798"+";"+"011"
    const secureBank = encrypt(process.env.API_SECRET, accNumber)

    const response = await axios.post('https://api.onepipe.io/v2/transact', {
        request_ref: word,
        request_type: "lookup_account_max",
        auth: {
            type: 'bank.account',
            secure: secureBank,
            auth_provider: "DemoProvider"
        },
        transaction: {
            mock_mode: "inspect",
            transaction_ref: word,
            transaction_desc: "get Account min",
            transaction_ref_parent: null,
            amount: 0,
            customer: {
                customer_ref: "53",
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                mobile_no: req.body.mobile_no
            },
            details: {}

    }}, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Signature: hased

        }
    })

    if(response.data.status === 'WaitingForOTP') {
        console.log('here');
        let type = 'lookup_account_max'
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


export default { AccountMin, AccountMid, AccountMax,  BvnMin, BvnMid, BvnMax, creditScore, openUSDWallet, NINMin, NINMid, lookupAccountMin, lookupAccountMid, lookupAccountMax }