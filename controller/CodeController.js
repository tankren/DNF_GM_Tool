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
  //  let item_id = req.query.code; // 物品id
    let item_id = 52; // 物品id
    let mid = req.session.mid; // 角色id
    console.log("物品代码为：" + item_id);
    console.log("角色名为：" + mid);
    let item_num =  prompt("输入数量") || 1; // 数量
    let strong_num = prompt("输入强化值") || 0; // 强化值
    
    let d = new Date();
    let datetime = `${d.toLocaleDateString('zh-TW')} ${d.toLocaleTimeString()}`  //台湾时间格式，否则为空
    
    let sql = `insert into taiwan_cain_2nd.letter 
    (charac_no,send_charac_name,letter_text,reg_date) 
    values 
    (${mid},'DNF GM','祝您游戏愉快 :D','${datetime}')`;

    db(sql)
    .then( result => {
      let insertId = result.insertId
      let sql = `insert into taiwan_cain_2nd.postal 
      (occ_time,send_charac_name,receive_charac_no,item_id,add_info,upgrade,amplify_option,amplify_value,gold,seal_flag,letter_id,seperate_upgrade)
       values 
       ('${datetime}','DNF GM',${mid},${item_id},${item_num},${strong_num},0,0,0,0,${insertId}, 0)`;

       return db(sql)
    })
    .then( result => {
      return res.json({
        code: 200,
        msg: "物品发送成功"
      })
    })
  }
}