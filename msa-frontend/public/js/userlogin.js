const loginbtn = document.querySelector('#loginbtn');
const loginfrm = document.loginform

loginbtn.addEventListener('click', () => {
    const frmData = new FormData(loginfrm);

    let jsondata = {};
    frmData.forEach((val, key) => {
        jsondata[key] = val;
    });
    console.log(jsondata);

    const res = fetch('http://127.0.0.1:8000/userlogin',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsondata)
        })
        .then(res => {
            if (res.status === 401) {alert('회원 로그인 실패!!');}
            else if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                // console.log(data.access_token); // 토큰 확인
                // localStorage.setItem('token', data.access_token); // 토큰 저장
                sessionStorage.setItem('token', data.access_token);
                alert('회원 로그인 성공!!');
            } else {
                alert('로그인 토큰 확인 불가!!');
            }
        }).catch((error) => {
            alert('회원 로그인 오류 발생!!');
            console.log(data.detail);
        });
});