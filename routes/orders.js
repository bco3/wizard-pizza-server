const express = require('express');
const router = express.Router();


// router.get('/', (req, res) => {
//     db.query(function () {
//         res.send(orders)
//     })
// });


router.post('/', (req, res) => {
    const name = req.body.customer.name;
    const phone = req.body.customer['phone number'];
    const email = rew.body.customer.email;
    const subTotal = req.body.totals['sub-total'];
    const discount = req.body.totals.discounts;
    const tax = req.body.totals.tax;
    const total = req.body.totals.total;
    const order = req.body.order;
    const time = new Date().toLocaleString();

    let post = req.body ? req.body : {customer: 'Missing Info'};
    console.log(post);
    orders.push(post);

})

module.exports = router;