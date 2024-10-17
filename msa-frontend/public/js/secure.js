// 페이지 완전 로드 후 코드 실행
document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    if (!token){
        alert('로그인 하세요!');
        location.href = '/';
    }
});

const logoutbtn = document.querySelector("#logoutbtn");
logoutbtn.addEventListener('click', () => {
    sessionStorage.removeItem('token');
    location.href = '/';
})