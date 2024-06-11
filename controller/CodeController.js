let db = require('../controller/DbController');

module.exports = {
  index: (req, res, next) => {
    let page = req.query.page;
    let limit = req.query.limit;
    let codename = req.query.codename || "";

    let params = {
      code: 0,
      data: [],
      count: 0
    }
    let sql = `select * from mysql.code where codename like '%${codename}%' limit ${ (page - 1) * limit}, ${limit};`;
    db(sql)
    .then( data => {
      let sql = `SELECT COUNT(code) from mysql.code where codename like '%${codename}%'`;
      
      params.data = data;
      return db(sql)
    })
    .then( count => {
      params.count = count[0]["COUNT(code)"];
      res.json(params)
    })
  },

  mailcode: (req, res, next) => {
    let codename = req.query.codename;
    req.session.itme_id = codename;

    res.json({
      code: 200,
      msg: "选择物品代码成功"
    })
}