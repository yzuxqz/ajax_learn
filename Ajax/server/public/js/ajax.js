function ajax(options) {
    //7.存储的是默认值
    var defaults = {
        type: 'get',
        url: '',
        data: '',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: {},
        error: {}
    };
    Object.assign(defaults, options); //使用options对象的属性覆盖defaults的属性
    //1.创建ajax对象
    var xhr = new XMLHttpRequest();

    //5.拼接参数
    var params = ''; //用于拼接传递来的对象参数
    for (var attr in defaults.data) { //循环传来的参数对象       
        params += attr + '=' + defaults.data[attr] + '&'; //将参数转为application/x-www-form-urlencoded字符串
    }
    params = params.substr(0, params.length - 1); //去掉最后一个&符号

    //6.判断请求方式，决定参数的位置
    //get请求
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }
    //2.配置去哪
    xhr.open(defaults.type, defaults.url);

    //6.post请求
    if (defaults.type == 'post') {
        //设置请求参数格式类型 ,在js中只有在字符串中可以用-，所以不能写成options.header.Content-type，这是不合法的
        xhr.setRequestHeader('Content-Type', defaults.header['Content-Type']);
        if (defaults.header['Content-Type'] == 'application/json') {
            xhr.send(JSON.stringify(defaults.data)); //3.post请求参数格式如果是json类型：原来的参数转为json字符串
        } else {
            xhr.send(params); //3.post请求参数格式如果是urlencoded类型：发送拼接的字符串
        }
    } else {
        xhr.send(); //3.发送get请求
    }

    //4.监听onload事件,xhr对象接受完响应数据后触发
    xhr.onload = function () {
        var contentType = xhr.getResponseHeader('Content-Type'); //获取响应头中关于返回数据格式类型的数据
        var responseText = xhr.responseText; //服务端的传来的数据
        if (contentType.includes('json')) { //如果服务端数据为json格式
            responseText = JSON.parse(xhr.responseText); //将json字符串转为json对象
        }

        if (xhr.status == 200) { //判断http状态码
            options.success(responseText, xhr); //调用success属性，它是一个函数，在数据请求成功后调用，把数据作为实参传递
        } else {
            options.error(responseText, xhr); //调用error属性
        }

    };
}