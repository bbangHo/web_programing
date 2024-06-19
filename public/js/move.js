
// html에서 페이지 전환 버튼의 id 받아와서 저장
let matching = document.getElementById("matching");
let my = document.getElementById("my");
let login = document.getElementById("login");
let chat = document.getElementById("chat");
let test = document.getElementById("test");

window.onload = function () {
    move(matching);
    move(my);
    move(login);
    move(chat);
    move(test);
}

// click -> 페이지 전환
function move(btn) {
    btn.addEventListener('click', function move() {
        location.href = '/' + btn.id;
    })
}