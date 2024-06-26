var express = require("express");
var router = express.Router();
var db = require("../../db/db");
const shortid = require("shortid");

router.get("/mypage", function (request, response) {
  var email = request.session.passport.user;
  var name = db.get("users").find({ email: email }).value().displayName;
  var partner = "";
  var status = " 님과 매칭되었음";
  if (db.get("users").find({ email: email }).value().partnerName) {
    partner = db.get("users").find({ email: email }).value().partnerName;
  } else {
    status = "매칭되지 않았음";
  }
  response.send(`
    <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <!-- css , js -->
      <link rel="stylesheet" href="../css/my.css">
      <script defer src="../js/my.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script type="text/javascript" src="../js/api.js"></script>

      <!-- icon -->
      <script>
        src="https://kit.fontawesome.com/5b7a7cfcb5.js"
        crossorigin="anonymous"
      </script>

      <!-- font -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"   crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans  +KR:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      />

      <!-- favicon -->
      <link rel="icon" href="../favicon.ico" type="image/x-icon" />
      <title>myPage</title>
    </head>
    <body>
      <nav class="navbar">
        <a href="/" class="navbar_logo"> &#127800;부경대 랜덤 매칭 </a>
      </nav>
      <div class="container">
        <div class="title">
          <h1>마이 페이지</h1>
        </div>
        <div class="content">
          <div class="myPageForm">
            <form>
              <!-- 이름 -->
              <div class="intArea">
                <span>이름</span>
                <div> ${name}</div>
              </div>
              <!-- 이메일 -->
              <div class="intArea">
                <span>이메일 계정</span>
                <div>${email}</div>
              </div>
              <!-- 매칭상태 -->
              <div class="intArea">
                <span>매칭상태</span>
                <div>${partner}  <h6> ${status}</h6></div>
              </div>
              <!-- 매칭취소버튼 -->
              <div class="btnArea">
                <input type="button" id="cancel_btn"
                value="매칭취소">
              </div>

              <!-- 성향수정버튼 -->
              <div class="btnArea">
                <input type="button" id="modify"
                value="성향수정">
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="column">©bbangHo</div>
      </footer>
  </html>
  `);
});
module.exports = router;
