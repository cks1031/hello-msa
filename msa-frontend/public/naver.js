var express = require('express');
// axios : 프라미스 기반 http 클라이언트 라이브러리
// 주로 웹앱에서 api 호출 또는 http 요청을 보내는데 사용
var axios = require('axios');
var router = express.Router();

var client_id = '';
var client_secret = '';
var state = "RANDOM_STATE";
// naver login qpi 테스트용 callback url
var redirectURI = encodeURI("http://127.0.0.1:3000/api/callback");
// naver login qpi 로그인용 callback url
var redirectURI2 = encodeURI("http://127.0.0.1:3000/api/callback2");
var api_url = "";

/* custom naver api login */
router.get('/api/naver', function(req, res, next) {
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
});

/* custom naver api callback */
router.get('/api/callback', function(req, res, next) {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

// -------

/* custom naver api login */
router.get('/api/naver2', function(req, res, next) {
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI2 + '&state=' + state;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
});

/* custom naver api callback - get access token */
router.get('/api/callback2', function(req, res, next) {
    const code = req.query.code;
    const state = req.query.state;
    const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    const headers = {
        'X-Naver-Client-Id':client_id,
        'X-Naver-Client-Secret': client_secret,
        'Content-Type': 'application/json'
    };
    axios.get(api_url,{ headers: headers})
        .then(response => {
            data = response.data;
            console.log(data.access_token);
            //sessionStorage.setItem('token', data.access_token); // 사용불가!
            // 즉, 현재 코드는 서버환경에서 실행 중이고,
            // sessionStorage는 클라이언트측 환경에서 제공하는 기능임
            // 따라서, 서버환경에서 제공하는 세션에 토큰 저장
            req.session.token = data.access_token;

            res.redirect('/');
        });
    });

/* secure page2 access  */
router.get('/secure2', function(req, res, next) {
    console.log(req.session.token);

    if (!req.session.token)
        res.redirect('/');
    else
        res.sendFile(__dirname + '/views/secure2.html')
});

/* logout  */
router.get('/logout', function(req, res, next) {
    if (req.session.token)
        req.session.destroy(); // 서버측 세션 제거
    res.redirect('/');
});

module.exports = router;