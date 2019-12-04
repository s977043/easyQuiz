// 配列をランダムにする
Array.prototype.shuffle = function() {
    var i = this.length;
    while(i){
        var j = Math.floor(Math.random()*i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

//初期設定
function setReady() {
    count = 0; //問題番号
	ansers = new Array(); //解答記録
    qa.shuffle();
	//最初の問題
	quiz();
}

//問題表示
function quiz() {
	var s, n;
	//問題
	document.getElementById("text_q").innerHTML = (count + 1) + "問目：" + qa[count][0];
	//選択肢
	s = "";
	for (n=1;n<=q_sel;n++) {
		if (qa[count][n] != "") {
			s += "【<a href='javascript:anser(" + n + ")'>" + n + "：" + qa[count][n] + "</a>】";
		}
	}
	document.getElementById("text_s").innerHTML = s;
}

//解答表示
function anser(num) {
    var limit = 10;
    var max_count;
    var s;
    if (qa.length > limit) {
        max_count = limit;
    } else{
        max_count = qa.length;
    }

	s = (count + 1) + "問目：";
	//答え合わせ
	if (num == qa[count][q_sel + 1]) {
		//正解
		ansers[count] = "○";
	} else {
		ansers[count] = "×";
	}
	s += ansers[count] + qa[count][num];
	document.getElementById("text_a").innerHTML = s;

	//次の問題を表示
	count++;
	//if (count < qa.length) {
    if (count < max_count) {
		quiz();
	} else {
		//終了
		s = "<table border='2'><caption>成績発表</caption>";
		//1行目
		s += "<tr><th>問題</th>";
		//for (n=0;n<qa.length;n++) {
        for (n=0;n<max_count;n++) {

            s += "<th>" + (n+1) + "</th>";
		}
		s += "</tr>";
		//2行目
		s += "<tr><th>成績</th>";
		//for (n=0;n<qa.length;n++) {
        for (n=0;n<max_count;n++) {
			s += "<td>" + ansers[n] + "</td>";
		}
		s += "</tr>";
		s += "</table>";
		document.getElementById("text_q").innerHTML = s;
        //次の選択肢
        s = "";
		//s += "【<a href='javascript:history.back()'>前のページに戻る</a>】";
		s += "【<a href='javascript:setReady()'>同じ問題を最初から</a>】";
		//s += "【<a href=''>次の問題に進む</a>】";
		document.getElementById("text_s").innerHTML = s;
	}
}
