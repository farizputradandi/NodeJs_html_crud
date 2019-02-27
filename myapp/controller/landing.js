var mysql = require('mysql');

//database system
  // Create connection
  const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
  });

  // Connect
  db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
  }); 


exports.create_table = function(req, res, next) {    
    let sql = 'CREATE TABLE register(id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('register table created...');
    });  
}
  

exports.get = function(req, res, next) {  
	res.render('index', { title: 'Express' });   
}
exports.submit_data = function(req, res, next) {   
    console.log("username : ",req.body.RegUsername); 
    console.log("password : ",req.body.RegPassword);
    
    
	let post = {username:req.body.RegUsername, password:req.body.RegPassword};
	let sql = 'INSERT INTO register SET ?';
	let query = db.query(sql, post, (err, result) => {
		if(err) throw err;
		console.log(result); 
	}); 

	res.redirect('/leads');// this will trigger controll/index.js router.get('/leads',dbSystem1.showusers); 
	// res.render('halaman', { title: 'welcome to homepage' });   
}

exports.AllshowUser = function(req, res, next) {   
    let sql = 'SELECT * FROM register';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;  
        res.render('halaman', { title: 'all users', lala:results });   
    });   
}

exports.showUserProfile = function(req, res, next) {   
    takeId = req.params.user_id;         
    let sql = `SELECT * FROM register WHERE id = ${takeId}`; 
    let query = db.query(sql, (err, results) => { 
        if(err) throw err;   
        res.render('userSpec', {lala:results[0],title:"asdfasd"}  ); 
    });    
}

exports.edit_form = function(req, res, next) {   
    takeId = req.params.user_id;                 
    let sql = `SELECT * FROM register WHERE id = ${takeId}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;  
        res.render('edit_form', { lala:results[0] });  
    });  
}

exports.submit_edit = function(req, res, next) {  
    let takeId = req.params.user_id;       
    let post = {username:req.body.RegUsername, password:req.body.RegPassword}; 
    let sql = 'UPDATE register SET ? WHERE id = ?';
    let query = db.query(sql,[post,takeId], (err, result) => {
        if(err) throw err; 
    }); 
    res.redirect('/leads');
     
}

exports.delete_data = function(req, res, next) {  
    let takeId = req.params.user_id;         
    let sql = `DELETE FROM register WHERE id = ${takeId}`; 
    let query = db.query(sql, (err, result) => {
        if(err) throw err; 
    }); 
    res.redirect('/leads/');  
}
  /*
  // res.sendFile(__dirname + '/public/index.html')
    // res.render('halaman');// take a look what's inside view/halaman.ejs
    // res.render('halaman',{cabe1 : req.params.name});// pass data
    // var data = {age:29, job: 'ninja'};
    // res.render('halaman',{cabe1 : "haloo semuaa", passdata :data}); 


    tihs to recieve
    <h1>title = <%= cabe1 %></h1>
    <p>age : <%= data.age %></p>
    <p>age : <%= data.job %></p>
  */