const mongoose = require('mongoose')
const Todo = require('../todo') // 載入 todo model

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })  // 設定連線到 mongoDB
const db = mongoose.connection  // 取得資料庫連線狀態
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {       //連線成功只會發生一次，所以這裡使用 once
  console.log('mongodb connected!')

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }

  console.log('done')
})