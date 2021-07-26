const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars');
const Todo = require('./models/todo')
const bodyParser = require('body-parser') // 引用 body-parser


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //定義要使用的樣板引擎
app.set('view engine', 'hbs')


app.use(bodyParser.urlencoded({ extended: true }))


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

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const Createname = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name: Createname })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((items) => res.render('detail', { todo: items }))
    .catch(error => console.log(error))
})

//當使用者觸發了上述 index 或 detail 頁面的 Edit 按鈕時
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((items) => res.render('edit', { todo: items }))
    .catch(error => console.log(error))
})

//設定一條新的路由，來接住表單資料，並且把資料送往資料庫。
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)      //查詢資料
    .then(todo => {             //查詢成功，修改後重新儲存
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))     //儲存成功，導回detail頁面
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})