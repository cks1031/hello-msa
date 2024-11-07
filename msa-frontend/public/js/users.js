// 페이지 로드시 자동으로 실행
window.addEventListener('load', async () => {
    try {
        const users = await getUserList();
        displayUserList(users);
    } catch (e) {
        console.log(e);
        alert('회원 목록 조회 실패!');
    }
});
// 회원 데이터 가져오기
const getUserList = async () => {
    let url = `http://${sessionStorage.getItem('usersrvURL')}/users`;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error('회원 목록 조회 실패!!');
    }
};
// 가져온 회원 데이터 표시하기
const displayUserList = (users) => {
    const userlist = document.querySelector('#user-list');
    console.log(users)

    let html = '<ul>';
    for (const user of users){
        html += `<li>
            회원아이디 : <a href="/user/${user.mno}">${user.userid}</a>,
            회원이름 : ${user.name},
            회원가입일 : ${user.regdate},
            [<a href="javascript:mmodify('${user.mno}')">수정</a>],
            [<a href="javascript:mremove('${user.mno}')">삭제</a>]
        </li>`;
    }
    html += '</ul>';

    userlist.innerHTML = html;
};

// 회원 데이터 수정하기
const mmodify = (mno) => {
    alert('수정되었습니다!');
};

// 회원 데이터 삭제하기
const mremove = async (mno) => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;
    let url = `http://${sessionStorage.getItem('usersrvURL')}/user/${mno}`;
    const res = await fetch(url, {method: 'delete'});
    if (res.ok) {
        console.log(res);
        location.href='/users';
    }
};