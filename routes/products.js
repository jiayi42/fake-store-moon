const {Product} = require('../models/product');
const express = require('express');
// const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) =>{

    // let filter = {}
    // if(req.query.categories){
    //     filter = {category: req.filter.categories.split(',')}
    // }

    const productList = await Product.find();//.select('name image -_id');
    //const productList = await Product.find(filter).populate('category');
    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

router.get(`/:id`, async (req, res) =>{
    if(! mongoose.isValidObjectId(req.params.id)){
        res.status(400).send("Invalid Product Id");
    }
    const product = await Product.findById(req.params.id);// .populate('category');

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product);
})

router.get(`/get/subscribed_user`, async (req, res) =>{
    const productList = await Product.find().select("subscribed_user");//.select('name image -_id');
    //const productList = await Product.find(filter).populate('category');
    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

router.get(`/subscribed_user/:id`, async (req, res) =>{
    if(! mongoose.isValidObjectId(req.params.id)){
        res.status(400).send("Invalid Product Id");
    }
    const product = await Product.findById(req.params.id).select("subscribed_user");// .populate('category');

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product);
})

router.post(`/`, async (req, res) =>{
    //const category = await Category.findById(req.body.category);
    //if (!category) return res.status(401).send("Invalid Category")
    

    let product = new Product({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        fid: req.body.fid
 
    })

    product = await product.save();

    if(!product) {
        return res.status(500).json({message: "The category with the given ID was not found"});
    }

    res.send(product);

})

router.put("/:id", async (req,res)=>{
    if(! mongoose.isValidObjectId(req.params.id)){
        res.status(400).send("Invalid Product Id");
    }
    //const category = await Category.findById(req.body.category);
    //if (!category) return res.status(401).send("Invalid Category")

    const product =await Product.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            category: req.body.category,
            fid: req.body.fid,
            subscribed_user: req.body.subscribed_user
        },
        {new: true}
    )

    if(!product){
        return res.status(404).send('the product cannot be updated!');
    }

    res.send(product);

})

router.put("/remove/subscribed_user/:id", async (req,res)=>{
    if(! mongoose.isValidObjectId(req.params.id)){
        res.status(400).send("Invalid Product Id");
    }
    //const category = await Category.findById(req.body.category);
    //if (!category) return res.status(401).send("Invalid Category")

    const product =await Product.findByIdAndUpdate(
        req.params.id,
        
        {
            $pull: { subscribed_user: req.body.subscribed_user }
             
        },
        {new: true}
    )

    if(!product){
        return res.status(404).send('the product cannot be updated!');
    }

    res.send(product);

})

router.put("/append/subscribed_user/:id", async (req,res)=>{
    if(! mongoose.isValidObjectId(req.params.id)){
        res.status(400).send("Invalid Product Id");
    }
    //const category = await Category.findById(req.body.category);
    //if (!category) return res.status(401).send("Invalid Category")

    const product =await Product.findByIdAndUpdate(
        req.params.id,
        
        {
            $push: { subscribed_user: req.body.subscribed_user }
             
        },
        {new: true}
    )

    if(!product){
        return res.status(404).send('the product cannot be updated!');
    }

    res.send(product);

})

router.delete(`/:id`, (req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({
                success:true,
                message:'the product has been removed!'
            })
        }else{
            return res.status(404).json({
                success:false,
                message:'the product has not been found!'
            })
        }
    }).catch(err=>{
        return res.status(400).json({
            success:false,
            error: err
        })
    })
})

router.get(`/get/count`, async (req, res) =>{

    const productCount = await Product.countDocuments((count)=>count);

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

// router.get(`/get/featured`, async (req, res) =>{

//     const products = await Product.find({isFeatured: true});

//     if(!products) {
//         res.status(500).json({success: false})
//     } 
//     res.send(products);
// })


// router.get(`/get/featured/:count`, async (req, res) =>{
//     const count = req.params.count ? req.params.count : 0
//     const products = await Product.find({isFeatured: true}).limit(+count);

//     if(!products) {
//         res.status(500).json({success: false})
//     } 
//     res.send(products);
// })

module.exports =router;