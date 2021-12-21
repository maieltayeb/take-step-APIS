const middleWareError = require('../helpers/customErorr')
// const Product = require('../models/product');
require('express-async-errors');

module.exports = async (req, res, next) => {

    const {params: { id: productId },user: { id: userId } } = req;
    const product = await Product.findById(req.params.id);
    if (!product.userId.equals(userId)) 
    throw middleWareError('not authrized', 403, 'you are not authrized')
    next();

}