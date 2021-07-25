const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //定義要使用的樣板引擎
app.set('view engine', 'hbs')

const mongoose = require('mongoose')   // 載入 mongoose
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true})  // 設定連線到 mongoDB
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
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})