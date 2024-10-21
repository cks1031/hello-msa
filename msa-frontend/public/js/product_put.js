// 페이지 완전 로드시 자동으로 실행
document.addEventListener('DOMContentLoaded', async () => {
    let pno = location.pathname.split('/').pop();

    try {
        const product = await getProductOne(pno);
        displayProductOneForm(product);
    } catch (e) {
        console.log(e);
    }
});

const getProductOne = async (pno) => {
    let url = `http://127.0.0.1:8050/product/${pno}`;
    const res = await fetch(url);
    if (res.status === 404) {
        location.href = '/notfound';
    } else if (res.status === 200) { // res.ok 와 동일
        data = await res.json();
        return data;
    } else {
        throw new Error('상품 상세 정보 fetch 실패!!');
    }
};

// 서버로부터 받아온 상품정보를 수정 폼에 출력
const displayProductOneForm = (product) => {
    const frm = document.productfrm;

    frm.name.value = `${product.name}`;
    frm.desc.value = `${product.desc}`;
    frm.price.value = `${product.price}`;
    frm.maker.value = `${product.maker}`;
    frm.regdate.value = `${product.regdate}`;
    frm.pno.value = `${product.pno}`;
};

// 수정하기 버튼 클릭 처리
const modifybtn = document.querySelector('#modifybtn');

modifybtn.addEventListener('click', () => {
    const prouductfrm = document.productfrm
    const formData = new FormData(prouductfrm);

    if (!confirm('정말로 수정하시겠습니까?')) return;

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] = val;
    });
    console.log(jsondata);

    const res = fetch(`http://127.0.0.1:8050/product/`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsondata)
        }).then((res) => {
            if (res.status === 404) {
                location.href='/notfound'
            } else if (res.status === 200) {
                location.href='/products';
            }
        })
        .catch((error) => { console.log(error)})
    });