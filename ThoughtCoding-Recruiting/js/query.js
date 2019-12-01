let direction = document.getElementsByClassName('direction')[0];
let state = document.getElementsByClassName('state')[0];
let submit = document.getElementsByClassName('submit')[0];
let tbody = document.getElementsByClassName('tbody')[0];
let count = document.getElementsByClassName('count')[0];
let shuaxin = document.getElementsByClassName('shuaxin')[0];
shuaxin.addEventListener('click', send, false);
let n = 0;
count.innerHTML = '人数：' + n;
/* submit.addEventListener('click', clear, false); */
submit.addEventListener('click', send, false);

function send() {

    let xhr = new XMLHttpRequest();
    let data = "direction=" + direction.value + "&state=" + state.value;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                let result = xhr.responseText;
                if (result != '0') {
                    let date = JSON.parse(result);
                    success(date);
                } else {

                    success(result);
                }
            } else {
                alert("request is error!" + xhr.status);
            }
        }
    }
    xhr.withCredentials = true;
    xhr.open("post", "/naxin/DirServlet", true);
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);

}

function success(data) {
    if (data == '0') {
        n = 0;
        count.innerHTML = '人数：' + n;
        data='';
    } else {
        n = data.length;
        count.innerHTML = '人数：' + n;
    }
    let trs = tbody.getElementsByTagName('tr'); //dom删除节点操作只能针对其子节点！

    console.log(trs);
    if (trs.length >= 2) {
        for (let i = 0; i < trs.length-1; i++) {
            tbody.removeChild(trs[1]);
        }
    }
    console.log(trs);
    if (trs.length >= 2) {
        for (let i = 0; i < trs.length-1; i++) {
            tbody.removeChild(trs[1]);
        }
    }


    for (let i = 0; i < data.length; i++) {
        let row = tbody.insertRow();
        row.innerHTML = ` 
        <tr>
          <td>${data[i].direction}</td>
          <td>${data[i].major}</td>
          <td>${data[i].stuID}</td>
          <td>${data[i].stuName}</td>
          <td>${data[i].tel}</td>
          <td><a href='modify.html'  target="_top"  onclick='change(this)'>修改</a></td>
       </tr>`
    }
}
  function change(node) {
    let thistr = node.parentNode.parentNode;
    let tds = thistr.getElementsByTagName('td');
    console.log(tds);
    let stuID = tds[2].innerHTML;
    console.log(stuID);
    localStorage.setItem('StuID', stuID);
}