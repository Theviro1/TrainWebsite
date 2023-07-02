const Mock = require('mockjs');
//格式： Mock.mock( url, post/get , 返回的数据)；
//./data/userJson就是我们上面定义的数据文件
Mock.mock('/user/userInfo', 'get', require('./data/userJson'));
