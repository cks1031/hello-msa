// 회원가입 버튼 이벤트 처리
const regbtn = document.querySelector('#regbtn');
const userform = document.userform;

// 비동기 처리 구현 - async, await
regbtn.addEventListener('click', async () => {
    const formData = new FormData(userform);

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] = val;
    });
    console.log(jsondata);

    const res = await fetch(`http://${sessionStorage.getItem('usersrvURL')}/user`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsondata)
        })
        // 서버로의 응답 처리
        .then(res => {
            alert('회원가입 성공!!');
        }).catch((error) => {
            alert('회원가입 실패!!');
            console.log(data.detail);
        });
})