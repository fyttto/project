let stuID = document.getElementsByTagName('input')[0];
let pwd = document.getElementsByTagName('input')[1];
let submit = document.getElementsByClassName('a')[0];
let count = 0;
let a = debounce(send, 500)
submit.addEventListener('click', a, true);
//防抖
function debounce(fn, waite) {
    let timer = null;
    return function() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, waite);
    }
}

function send() {
    if (stuID.value == '' || pwd.value == '') {
        alert('内容不能为空');
    }
    let xhr = new XMLHttpRequest();
    let data = "stuID=" + stuID.value + "&pwd=" + pwd.value;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                var result = xhr.responseText;
                console.log(2);
                success(result);
            } else {
                alert("request is error!" + xhr.status);
            }
        }
    }
    xhr.withCredentials = true;
    xhr.open("post", "/naxin/RegisterServlet", true);
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);

}

function success(date) {
    if (date == 1) {
        window.location.href = "../html/register.html";
    } else if (date == 2) {
        window.location.href = "../html/state.html";
    } else if(date==5){
        alert('实验室只招收大一大二学生，非常抱歉')
    }

        else {
        alert("账号或者密码错误");
    }
}