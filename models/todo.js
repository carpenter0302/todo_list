const mongoose = require('mongoose')
const Schema = mongoose.Schema   //Mongoose 提供了 mongoose.Schema 模組

const todoSchema = new Schema({
  name: {
    type: String,
    required: true  // 這是個必填欄位
  }
})


//透過 module.exports 把這個 schema 輸出
module.exports = mongoose.model('Todo', todoSchema) //匯出的時候把這份 schema 命名為 Todo