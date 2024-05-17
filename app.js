require('dotenv').config(); // .env 파일 읽어서 process.env에 추가
const express = require('express'); // express 모듈
const morgan = require('morgan'); // morgan(로그) 모듈
const path = require('path'); // 경로 설정 모듈
const session = require('express-session'); // 세션 모듈

// cors
const cors = require('cors'); // cors 모듈, 다른 출처의 resource 를 공유
let corsOptions = {
    origin: process.env.CLIENT_URL, // 프론트 주소에서 리소스 긁어오기
    credentials: true // 헤더에 인증정보를 포함
}

const fs=require('fs')
//이미지 업로드 폴더 생성
try{
    fs.readdirSync('public/uploads');
}catch(err){
    console.error('폴더가 없어서 생성합니다.')
    fs.mkdirSync('public/uploads')
}

// passport
const passport = require('passport'); // 패스포트 모듈
const passportConfig = require('./passport'); // 패스포트 설정 (자체)
passportConfig();

const apiRouter = require('./routes'); // 라우터 경로 설정 (자체)
const { sequelize } = require('./models'); // 시퀄라이즈 모델 설정
sequelize.sync({ force: true }) // 서버 실행 시 MySQL과 연동
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

const app = express();
app.set('port', process.env.PORT || 8000); // .env PORT 주소 읽거나 못 읽으면 8000번으로 보내기

// middleware
app.use(
    cors(corsOptions), // cors 실행
    morgan('dev'), // 'dev' 로그 형식: :method :url :status :response-time ms - :res[content-length]
    express.static(path.join(__dirname, 'public')), // express에서 static 파일 경로 지정
    express.json(), // JSON request parsing
    express.urlencoded({ extended: false }), // POST body의 encoding된 data 해석 후 req.body에 넣어줌
    // false면 querystring을 node 내장 모듈로, true면 외부 qs 모듈 사용해서 data 해석
    session({
        resave: false, // 세션에 수정 사항 없더라도 다시 저장할지
        saveUninitialized: false, // 세션에 저장할 내역 없더라도 처음부터 세션 생성할지
        secret: process.env.COOKIE_SECRET, // 쿠키 서명 보안
        cookie: {
            httpOnly: true, // client에서는 cookie 확인 못하게 할 건지
            secure: false, // https가 아닌 환경에서도 사용 가능한지
        },
    }),
    // passport
    passport.initialize(), // 여기 아래 2개가 로그인에 필요한것
    passport.session(),
);

// router
// 스켈레톤처럼 v1로 우선 지정
app.use('/v1', apiRouter);

// 오류 처리
// 404 관리
app.use((req, res, next) => {
    const err = new Error(`없는 경로 [${req.method} ${req.url}]`); // 전송 방식과 위치
    err.status = 404;
    next(err); // next 호출하면 연결을 닫고 request 처리 X
})

// 서버 에러 관리
app.use((err, req, res, next) => {
    console.error(err);
    // res.locals.message = err.message;
    // res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 베껴온 코드, 이해 필요
    res.status(err.status || 500 ).json({
        code: err.status || 500,
        message: err.message || '서버 에러 발생'
    });
})

app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')}번 포트에서 서버 실행`);
})