// 引入模块
const express = require("express");
// 创建路由对象
var router = express.Router();
const pool = require("../pool");
//注册 
router.post("/register", (req, res) => {  //insert
    pool.getConnection((err, conn) => {
        if (err) throw err;
        let params = req.body;
        var sql = "SELECT * FROM users where telphone=?";
        conn.query(sql, params.telphone, (err, result) => {
            if (err) throw err;
            else {
                if (result.length !== 0) {
                    res.json({ success: false, msg: "该手机号已注册" })
                    res.end()
                } else if (result.length == 0) {
                    var sql = "insert into users(telphone,password,sex) values(?,?,?)"
                    conn.query(sql, [params.telphone, params.password, params.sex], (err, result) => {
                        if (err) throw err;
                        if (result.affectedRows > 0) {
                            res.json({ success:true, msg: "注册成功" })
                        } else {
                            res.json({ success: false, msg: "注册失败" })
                        }
                        conn.release();
                    });
                }
                conn.release();
            }
        });
    })
})
    //登录
router.post("/login", (req, res) => {  //select
    pool.getConnection((err, conn) => {
        if (err) throw err;
        let params = req.body;
        var sql = "SELECT * FROM users where telphone=?";
        conn.query(sql, params.telphone, (err, result) => {
            if (err) throw err;
            else {
                if (result.length == 0) {
                    res.json({ success: false, msg: "你还没有注册，快去注册一个账号吧" });
                    res.end();
                } else if (result.length !== 0) {
                    var sql = "SELECT * FROM users where telphone=? and password=?"
                    conn.query(sql, [params.telphone, params.password], (err, result) => {
                        if (err) throw err;
                        else {
                            if (result.length == 0) {
                                res.json({ success: false, msg: "密码错误，请重新登录" });
                                res.end();
                            } else {
                                res.json({ success: true, msg: "登录成功", data: result });
                                res.end();
                            }
                        }
                        conn.release();
                    });
                }
            }
        });
    })
})
// 用户信息修改
router.post("/editusers", (req, res) => {  //update
    pool.getConnection((err, conn) => {
        if (err) throw err;
        let params = req.body;
        console.log(JSON.stringify(params))
        var sql = "UPDATE users SET icon=?, name=? WHERE id=?";
        pool.query(sql, [params.icon, params.name,1], (err, result) => {
            if (err) throw err;
            console.log(JSON.stringify(result))
            if (result.affectedRows > 0) {
                res.json({ success:true, msg: "更新成功"})
                // var sql = "SELECT * FROM users where id=?"
                // conn.query(sql, [params.id], (err, result) => {
                //     if (err) throw err;
                //     else {
                //         if (result.length == 0) {
                //         res.json({ success:true, msg: "注册成功" , ret:result })
                //     } else {
                //         res.json({ success: false, msg: "注册失败" })
                //     }
                // });
            } else {
                res.json({ success: false, msg: "更新失败" })
            }
            conn.release();
        })
    })
})
// 获取用户信息
router.post("/getusers", (req, res) => {  //update
    pool.getConnection((err, conn) => {
        if (err) throw err;
        let params = req.body;
        console.log(JSON.stringify(params))
        var sql = "SELECT * FROM users where id=?";
        conn.query(sql, params.id, (err, result) => {
            if (err) throw err;
            else {
                conn.release();
                res.json({ success: true, data:result})
                res.end()
            }
        })
    })
})
    //留言反馈
    router.post("/addAdvice", (req, res) => {  //insert
        pool.getConnection((err, conn) => {
            if (err) throw err;
            let params = req.body;
            var sql = "insert into advice(uid,type,content) values(?,?,?)"
            conn.query(sql, [params.uid,params.type, params.content], (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    conn.release();
                    res.json({ success:true, msg: "反馈成功" })
                } else {
                    conn.release();
                    res.json({ success: false, msg: "反馈失败" })
                }
            });
        })
    })
    //景区推荐
    router.post("/recomjingqu", (req, res) => {  //insert
        pool.getConnection((err, conn) => {
            if (err) throw err;
            let params = req.body;
            var sql = "insert into recomjingqus(uid,recomaddress,recomname,recombecause) values(?,?,?,?)"
            conn.query(sql, [params.uid,params.recomaddress, params.recomname, params.recombecause], (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    conn.release();
                    res.json({ success:true, msg: "感谢您的推荐，我们会尽快处理您的推荐" })
                } else {
                    conn.release();
                    res.json({ success: false, msg: "推荐失败" })
                }
            });
        })
    })
// 搜索查询--景区
router.get("/getjingqus", (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        let params = req.query;
        var sql 
        if(params&&params.keyword){
            sql = `SELECT * FROM jingqu WHERE introduce LIKE '%${params.keyword}%';`;
        }else{
            sql = "SELECT * FROM jingqu";
        }
        console.log(JSON.stringify(params))
        // 从链接池中获取链接
        conn.query(sql, (err, result) => {
            if (err) throw err;
            if (result) {
                conn.release();
                res.json({ success: true, data:result })
            }
        })
    })
})
// 景区专属推荐
router.get("/jingquCustomized", (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        let params = req.query;
        var huanjing=params.huanjing?("huanjing LIKE '%"+params.huanjing+"%'"+(params.yinshi?" && ":"")):""
        var yinshi=params.yinshi?("yinshi LIKE '%"+params.yinshi+"%'"+(params.jiaotong?" && ":"")):""
        var jiaotong=params.jiaotong?("jiaotong LIKE '%"+params.jiaotong+"%'"+(params.aihao?" && ":"")):""
        var aihao=params.aihao?("aihao LIKE '%"+params.aihao+"%'"+(params.sheshi?" && ":"")):""
        var sheshi=params.sheshi?("sheshi LIKE '%"+params.sheshi+"%'"+(params.xiaofei?" && ":"")):""
        var xiaofei=params.xiaofei?("xiaofei LIKE '%"+params.xiaofei+"%';"):""
        var sql = "SELECT * FROM jingqu WHERE "+huanjing+yinshi+jiaotong+aihao+sheshi+xiaofei;
        console.log(JSON.stringify(params))
        console.log(sql)
        // 从链接池中获取链接
        conn.query(sql, (err, result) => {
            if (err) throw err;
            if (result) {
                conn.release();
                res.json({ success: true,msg:"提交成功", data:result })
            }
        })
    })
})
// 游记分享
router.get("/shares", (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        let params = req.query;
        var sql = "SELECT * FROM shares";
        // 从链接池中获取链接
        conn.query(sql, (err, result) => {
            if (err) throw err;
            if (result) {
                conn.release();
                res.json({ success: true, data:result })
            }
        })
    })
})
// 添加--游记分享
router.post("/sharesAdd", (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        let params = req.body;
        console.log("....."+JSON.stringify(params))
        var sql = "insert into shares(uid,cover,title,content,ctime) values(?,?,?,?,?)"
        conn.query(sql, [params.uid,params.cover,params.title, params.content,params.ctime], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                conn.release();
                res.json({ success:true, msg: "发表成功" })
            } else {
                conn.release();
                res.json({ success: false, msg: "发表失败" })
            }
        });
    })
})
    // 将路由对象导出
module.exports = router;