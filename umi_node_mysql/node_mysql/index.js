const express = require('express')
const mysql = require('mysql')
const app = express()

const sqlOptions = {
	host: '192.168.9.186',
	port: '3306',
	user: 'root',
	password: 'zwh521',
	database: 'users',
}

//设置跨域
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	res.header('Access-Control-Allow-Methods', 'PUT,PORT,GET,DELETE,OPTIONS')
	res.header('X-Powered-By', '3.2.1')
	res.header('Content-Type', 'application/json;chartset=uft-8')
	next()
})

//链接mysql
const pool = mysql.createPool(sqlOptions)

//设置返回值
let ret = {
	data: {},
	msg: '成功',
	success: true,
}

//获取用户列表
app.get('/user/userlist', (req, res) => {
	const sql = 'SELECT * FROM account'
	pool.query(sql, (err, result) => {
		if (err) {
			res.send(
				JSON.stringify({
					...ret,
					msg: '失败',
					success: false,
					data: null,
				})
			)
		} else {
			res.send(JSON.stringify({ ...ret, data: result }))
		}
	})
})

//服务
app.listen(8001, () => {
	console.log('启动服务8001')
})
