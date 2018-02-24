const express=require('express');
const mysql=require('mysql');
const common = require('../../libs/common');
const query = require('../../libs/mysql_pool');
module.exports=function (){
    var router=express.Router();
    router.post('/login', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        //var password = common.md5(req.body.password + common.MD5_SUFFIX);

        query(`SELECT * FROM userinfo WHERE username='${username}'`, (err, data) => {
            var sendData = {
                status: 'error'
            };
            if (err) {
                console.error(err);
                sendData.message = '数据库错误!';
                res.status(500).send(sendData).end();
            } else {
                if (data.length == 0) {
                    sendData.message = '用户名不存在!';
                    res.status(200).send(sendData).end();
                } else {
                    if (data[0].password != password) {
                        sendData.message = '密码错误!';
                        res.status(200).send(sendData).end();
                    } else {
                        sendData.status = 'success';
                        sendData.message = '登录成功!';
                        res.status(200).send(sendData).end();
                    }
                }
            }
        });
    });
    return router;
};
