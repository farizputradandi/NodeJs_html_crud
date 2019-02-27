var express = require('express');
var router = express.Router();
let myController = require('../controller/landing');//use data from controllers/landing
  

router.get('/createTable', myController.create_table );

router.get('/', myController.get );
router.post('/', myController.submit_data );

router.get('/leads',myController.AllshowUser);  //coming from controller/dbSystem exports.submit_lead 
router.get('/leads/:user_id',myController.showUserProfile);  //coming from controller/dbSystem exports.submit_lead 
 
router.get('/leads/:user_id/edit',myController.edit_form);//this sends data to control/dbSystem  
router.post('/leads/:user_id/edit',myController.submit_edit);//continue the request post data , in action form
 
router.get('/leads/:user_id/delete',myController.delete_data);//this sends data to control/dbSystem  

module.exports = router;
