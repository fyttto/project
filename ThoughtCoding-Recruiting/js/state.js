let name = document.getElementsByClassName('name')[0];
let ul = document.getElementsByClassName('time-horizontal')[0];
let lis = ul.children;
send();

function send() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                let result = xhr.responseText;
                if (result === 0) {
                    window.location.href = '../html/Land.html';
                } else if (result == 1) {
                    alert('您还没有注册！请返回登陆页面进行注册！');
                } else {
                    let Stumessage = JSON.parse(result);
                    console.log(result);
                    success(Stumessage.stuName, Stumessage.state);
                }


            } else {
                alert("request is error!" + xhr.status);
            }
        }
    }
    xhr.withCredentials = true;
    xhr.open("post", "/naxin/InfoServlet", true);
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send();

}

function success(stuName, data) {

    for (var i = 0; i <= data; i++) {
        lis[i].className = 's';
    }
    name.innerHTML = stuName;
}