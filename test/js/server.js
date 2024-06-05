const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const url = 'mongodb+srv://bangjuyeon:ju83094548@cluster0.qaw8x8g.mongodb.net/study'; // 데이터베이스 이름 포함
const app = express();
app.use(express.static('public'));
// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // views 디렉터리 설정



// MongoDB 연결
mongoose.connect(url).then(() => {
    console.log('MongoDB에 연결되었습니다.');
}).catch(err => {
    console.error('MongoDB 연결 실패:', err);
});

const db = mongoose.connection;










//main
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

//문의하기
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../contact.html'));
});



// 뉴스db
app.get('/news', async (req, res) => {
    try {
        const newsCollection = db.collection('news');
        const result = await newsCollection.find().toArray();
        console.log(result);
        res.render('news', { posts: result });
    } catch (error) {
        console.error('데이터 조회 실패:', error);
        res.status(500).send('데이터 조회 실패');
    }
});

// 복지
app.get('/welfare', async (req, res) => {
    try {
        const welfareCollection = db.collection('welfare');
        const result = await welfareCollection.find().toArray();
        console.log(result);
        res.render('welfare', { posts: result });
    } catch (error) {
        console.error('데이터 조회 실패:', error);
        res.status(500).send('데이터 조회 실패');
    }
});

// 일db
app.get('/work', async (req, res) => {
    try {
        const workCollection = db.collection('work');
        const result = await workCollection.find().toArray();
        console.log(result);
        res.render('work', { posts: result });
    } catch (error) {
        console.error('데이터 조회 실패:', error);
        res.status(500).send('데이터 조회 실패');
    }
});



// 지도db
app.get('/map', async (req, res) => {
    try {
        const mapCollection = db.collection('map');
        const result = await mapCollection.find().toArray();
        console.log(result);
        res.render('map', { posts: result });
    } catch (error) {
        console.error('데이터 조회 실패:', error);
        res.status(500).send('데이터 조회 실패');
    }
});






app.listen(8080, () => {
    console.log('8080번 포트에서 서버가 실행 중입니다.');
});
