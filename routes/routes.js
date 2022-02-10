const verifyJwtController = require('../api').verifyJwt;
const product = require('../api').product;

module.exports = function (app) {
    /**
     * GET /api/v1/user-profile
     * @summary This is the summary or description of the endpoint
     * @return {string} 200 - success response
     * @security BearerAuth
     */
    app.get('/api/v1/user-profile', [verifyJwtController.verifyToken, verifyJwtController.userProfile]);
    /**
    * GET /api/v1/product
    * @summary This is the summary or description of the endpoint
    * @return {string} 200 - success response
    * @security BearerAuth
    */
    app.get('/api/v1/product', [verifyJwtController.verifyToken], product.list);
    /**
    * GET /api/v1/product/agg
    * @summary This is the summary or description of the endpoint
    * @return {string} 200 - success response
    * @security BearerAuth
    */
    app.get('/api/v1/product/agg', [verifyJwtController.verifyToken, verifyJwtController.isAdmin], product.aggregation);

}