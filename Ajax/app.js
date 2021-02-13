/*jshint esversion: 8*/
const express = require('express');
const path = require('path');
const fs = require('fs');
//处理post参数
const bodyParser = require('body-parser');
//处理formData处理过的表单参数
const formidable = require('formidable');
const app = express();

//静态资源访问功能
app.use(express.static(path.join(__dirname, 'server', 'public')));
//01
app.get('/first', (req, res) => {
    res.send('Hello');
});
//02
app.get('/responseDate', (req, res) => {
    res.send({
        "name": "张三"
    });
});
//03
app.get('/get', (req, res) => {
    res.send(req.query);
});
//04
//处理application/x-www-form-urlencoded类型的post参数，放入req.body中
app.use(bodyParser.urlencoded({
    extended: false
}));
app.post('/post', (req, res) => {
    res.send(req.body);
});
//05
//处理application/x-www-form-urlencoded类型的post参数，放入req.body中
app.use(bodyParser.json());
app.post('/json', (req, res) => {
    res.send(req.body);
});
//06
app.get('/readystate', (req, res) => {
    res.send('ok');
});
//07
app.get('/error', (req, res) => {
    res.status(400).send('ok');
});
//08
app.get('/cache', (req, res) => {
    fs.readFile('./server/public/test.txt', (err, result) => {
        res.send(result);
    });
});
//12
app.get('/verifyEmailAdress', (req, res) => {
    if (req.query.email == '1336352883@qq.com') {
        res.send('no');
    } else {
        res.send('ok');
        console.log(req.query.email);

    }
});
//13
app.get('/searchAutoPrompt', (req, res) => {
    if (req.query.key == '牛') {
        res.send(['牛逼', '牛大妈', '牛大爷']);
    }
});
//14
app.get('/province', (req, res) => {
    res.send([{
        id: '001',
        name: '江苏省'
    }, {
        id: '002',
        name: '湖南省'
    }, {
        id: '001',
        name: '山东省'
    }, {
        id: '001',
        name: '河北省'
    }]);
});

app.get('/cities', (req, res) => {
    if (req.query.id == '001') {
        res.send([{
            id: '300',
            name: '南通市'
        }, {
            id: '400',
            name: '无锡市'
        }, {
            id: '500',
            name: '南京市'
        }, {
            id: '600',
            name: '苏州市'
        }]);
    } else {
        res.send('null');
    }
});

app.get('/areas', (req, res) => {
    if (req.query.id == '300') {
        res.send([{
            id: '300',
            name: '如东县'
        }, {
            id: '400',
            name: '掘港县'
        }, {
            id: '500',
            name: '马塘县'
        }, {
            id: '600',
            name: '北坎县'
        }]);
    } else {
        res.send('null');
    }
});
//15

app.post('/formData', (req, res) => {
    //创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    //解析传来的formdat对象
    form.parse(req, (err, fields, files) => {
        res.send(fields);
    });

});
//17
app.post('/file', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, 'server', 'public', 'uploads');
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        //将文件的地址响应回客户端
        res.send({
            path: files.attrName.path.split('public')[1]
        });
    });
});
app.listen(3000);
console.log('服务器启动成功，请访问localhost:3000');