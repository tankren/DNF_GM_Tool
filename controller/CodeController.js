let db = require('../controller/DbController');

module.exports = {
  index: (req, res, next) => {
    let page = req.query.page;
    let limit = req.query.limit;
    let _uid = req.session.uid;
    let code = req.query.code || "";

    let params = {
      code: 0,
      data: [],
      count: 0
    }
    let sql = `select * from mysql.code limit ${ (page - 1) * limit}, ${limit};`;
    db(sql)
    .then( data => {
      let sql = `SELECT COUNT(code) from mysql.code`;
      
      params.data = data;
      return db(sql)
    })
    .then( count => {
      params.count = count[0]["COUNT(code)"];
      res.json(params)
    })
  },
  
}