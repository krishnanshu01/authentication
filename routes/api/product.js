const express = require('express');


const jwt = require('jsonwebtoken');

const User = require('../../models/User')

const Products = require('../../models/Product')

const config = require('config')

const encrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const auth = require('../../middleware/auth');

const checkAdmin = require('../../middleware/auth')

//@ make    -  private
router.post('/add', [auth.Auth , auth.checkAdmin ,
    check('product', 'please add product').not().isEmpty(),
    check('price', 'please add price').not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let {
            product,
            price
        } = req.body;


        try {
            
            product = new Product({
                product,
                price
            });
            await product.save();
            return res.json(product);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("SERVER ERROR");
        }
    })

    router.delete('/delete', [auth.Auth , auth.checkAdmin ],
        async (req, res) => {
            
            
    
            try {
               console.log(req.body.id);
               let product = await Products.findById(req.body.id);
                if(product !== null){
                    await Products.findByIdAndDelete(req.body.id);
                    res.status(200).send({msg : "product deleted"})
                }else{
                    res.status(400).send({msg : "product not found"})
                }
            } catch (err) {
                console.log(err.message);
                res.status(500).send("SERVER ERROR");
            }
        })

        router.get('/', auth.Auth ,
        async (req, res) => {
            
            
    
            try {
                
               let product = await Products.find();
                
                    res.status(200).send(product)
                
            } catch (err) {
                console.log(err.message);
                res.status(500).send("SERVER ERROR");
            }
        })
    

    module.exports = router;