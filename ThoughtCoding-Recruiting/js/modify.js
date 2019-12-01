let state = document.getElementsByClassName('state')[0];
let submit = document.getElementsByClassName('submit')[0];
let stuID = localStorage.getItem('StuID');
submit.addEventListener('click', send, false);

function send() {
    let xhr = new XMLHttpRequest();
    let data = "stuID=" + stuID + "&state=" + state.value;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                var result = xhr.responseText;

                success(result);
            } else {
                alert("request is error!" + xhr.status);
            }
        }
    }
    xhr.withCredentials = true;
    xhr.open("post", "/naxin/ModServlet", true);
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);

}

function success(data) {
    if (data == 1) {
        alert('修改成功,点击跳转修改界面');
        window.location.href = '../html/query.html'
    } else {
        alert('修改失败');
    }
}