const express=require('express');
const mysql=require('mysql');
const common = require('../../libs/common');
const query = require('../../libs/mysql_pool');
module.exports=function (){


    let router = express.Router();
    router.use('/test', (req, res) => {
        res.send('测试接口: website_test');
    });
    return router;
};
