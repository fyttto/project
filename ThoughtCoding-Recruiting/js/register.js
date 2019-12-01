let test = document.getElementsByClassName('test')[0];
let stuName = document.getElementsByClassName('stuName')[0];
let major = document.getElementsByClassName('major')[0];
let direction = document.getElementsByClassName('direction')[0];
let verify = document.getElementsByClassName('verify')[0];
let tel = document.getElementsByClassName('tel')[0];
let submit = document.getElementsByClassName('submit')[0];
let countime = 60;
test.addEventListener('click', settime, false);
submit.addEventListener('click', sub, false);
let v = '/naxin/VerifyServlet';
let s = '/naxin/SignUpServlet';

function sub() {

    if (stuName.value == '' || major.value == '' || direction.value == '') {
        alert('信息填写不完整是无法提交的哦-v-');
        return 0;
    }
    let stuData = "&stuName=" + stuName.value + "&major=" + major.value + "&tel=" + tel.value + "&direction=" + direction.value + "&verify=" + verify.value;
    send(stuData, s);
}

function settime() {
    if (countime == 60) {
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(tel.value)) {
            alert('手机号不合法')
            return false;
        }
    }
    if (countime == 0) {
        test.disabled = false; //使该标签恢复效果
        test.innerHTML = '重新发送';
        test.style.backgroundColor = "#E4E4E1";
        // test.style.border = " 3px dotted #E4E4E1";
        countime = 60;
        return 1;
    } else {
        test.disabled = true;
        setTimeout(function() {
            countime--;
            test.innerHTML = countime + 's后重新发送';
            test.style.backgroundColor = " rgb(152, 154, 160)";
            // test.style.border = " 3px dotted #C9CCD3";
            test.style.color = " #fff"
            if (countime == 59) {
                let tels = "tel=" + tel.value;
                send(tels, v);
            }
            settime();

        }, 1000);
    }
}

function send(data, url) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                let result = xhr.responseText;
                if (result === 0) {
                    window.location.href = '../html/Land.html';

                } else if (result == 1) {
                    alert('注册成功，点击即可跳转到状态页面');
                    window.location.href = '../html/state.html'
                } else if (result == 3) {
                    alert("验证码错误");
                } else if (result == 4) {
                    alert("已经注册！");
                }
            } else {
                alert("request is error!" + xhr.status);
            }
        }
    }
    xhr.withCredentials = true;
    xhr.open("post", url, true);
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);

}