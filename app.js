const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars');

const Todo = require('./models/todo')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //定義要使用的樣板引擎
app.set('view engine', 'hbs')

const mongoose = require('mongoose')   // 載入 mongoose
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })  // 設定連線到 mongoDB
const db = mongoose.connection  // 取得資料庫連線狀態
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {       //連線成功只會發生一次，所以這裡使用 once
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(items => res.render('index', { todos: items })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})