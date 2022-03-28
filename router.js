import express from 'express';
import controller from './controller.js'
import Pcontroller from './Pcontroller.js';
import Ocontroller from './Ocontroller.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('create', {
        account_name: null,
        account_number: null,
    })
})

router.post('/create', controller.createAccount);
router.post('/balance', controller.getBalance);
router.post('/statement', controller.getStatement);
router.post('/collect', controller.collect);
router.post('/account-min', Pcontroller.AccountMin);
router.post('/score', Pcontroller.creditScore);
router.post('/wallet', Pcontroller.openUSDWallet);
router.post('/bvn-min', Pcontroller.BvnMin);
router.post('/bvn-max', Pcontroller.BvnMax);
router.post('/account-mid', Pcontroller.AccountMid);
router.post('/nuban', Ocontroller.lookupNuban);
router.post('/get-bank', Ocontroller.getBank);
router.post('/list-branch', Ocontroller.listBranch);
router.post('/nin-min', Pcontroller.NINMin);
router.post('/nin-mid', Pcontroller.NINMid);

router.post('/account-max', Pcontroller.AccountMax);
router.post('/bvn-mid', Pcontroller.BvnMid);
router.post('/loan-status', Ocontroller.loanStatus);
router.post('/look-accMin', Pcontroller.lookupAccountMin);
router.post('/look-accMid', Pcontroller.lookupAccountMid);
router.post('/look-accMax', Pcontroller.lookupAccountMax);



export default router