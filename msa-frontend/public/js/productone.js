// 페이지 완전 로드시 자동으로 실행
document.addEventListener('DOMContentLoaded', async () => {
    // console.log(location.pathname.split('/').pop());
    let pno = location.pathname.split('/').pop();

    try {
        const product = await getProductOne(pno);
        displayProductOne(product);
    } catch (e) {
        console.log(e);
        // alert('상품 상세 정보 조회 실패!');
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

const displayProductOne = (product) => {
    const productone = document.querySelector('#productone');
    console.log(product)

    let html = '<ul>';
    html += `<li>
            상품번호 : ${product.pno},
            상품명 : ${product.name},
            상품상세설명 : ${product.desc},
            상품가격 : ${product.price},
            상품제조사 : ${product.maker}
            상품등록일 : ${product.regdate}
        </li>`;
    html += '</ul>';

    productone.innerHTML = html;
};