import express from 'express';
import first from './controller.js'
const router = express.Router();

router.get('/', (req, res) => {
    res.render('create', {
        account_name: null,
        account_number: null,
    })
})

router.post('/create', first.createAccount);
router.post('/balance', first.getBalance);
router.post('/statement', first.getStatement);
router.post('/collect', first.collect);

router





export default router