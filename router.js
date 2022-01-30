import express from 'express';
import controller from './controller.js'
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


export default router