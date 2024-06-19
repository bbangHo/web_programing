var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var status = require('../lib/status.js');


function authIsOwner(request,response){
  if(typeof request.session.passport === 'undefined'|| request.session.passport === null){
    return false;
  }
  else {
    if(Object.keys(request.session.passport)=='user'){
      return true;
    }else{
      return false;
    }
}
}

var url = require('url');
function getFormattedUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
}



router.get('/', function(request, response){
  var authStatusUI = `<a href="/login">로그인</a>`
  if(authIsOwner(request,response)){
    authStatusUI=`<a href="/mypage">마이페이지</a>&nbsp&nbsp&nbsp&nbsp<a href="/logout">로그아웃</a>`
  }

    var msg = request.flash();
    var alert = '';
    if(msg.success){
      alert = msg.success[0];
    }
    if (getFormattedUrl(request).indexOf('#') > -1) {
      getFormattedUrl(request)= '/';
  }
    var _template = template.web(authStatusUI);
    response.send(_template);
});
    module.exports = router;
