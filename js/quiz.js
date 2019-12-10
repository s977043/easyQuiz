let q_sel = 3; //選択肢の数
let count; //問題番号
let ansers = new Array(); //解答記録

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

// 初期設定
function initialSetting(){
	var select = document.getElementById('genre');
	select.onchange = function()
	{
		// 選択されているoption要素を取得する
		var selectedItem = this.options[ this.selectedIndex ];
		console.log( "選択：" + selectedItem.value );
		if (selectedItem.value != ""){

			// 表示の制御
			document.getElementById('select_genre').style.display = "none";
			document.getElementById('quiz').style.visibility = "visible";
			document.getElementById('txt_genre').insertAdjacentHTML('afterbegin',selectedItem.text);
			loadDat( selectedItem.value , function() {
				console.log('script loaded');
				// クイズの準備
				quizReady();
			});

		}
	}
}

// 外部データの読み込み
function　loadDat(num ,callback){
	var done = false;
	var script = document.createElement("script")
	script.type = "text/javascript";
	script.src = "./js/quiz_" + num + ".dat";
	document.body.appendChild(script);
	console.log( script.src );

    // 読み込みが終わったら処理を行う
    script.onload = script.onreadystatechange = function() {
		console.log( this.readyState );
        if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
            done = true;
            callback();
            // 読み込んだ後に形跡を削除する
            script.onload = script.onreadystatechange = null;
            if ( script.parentNode ) {
				document.body.removeChild( script );
				console.log( "remove script" );
            }
        }
    };
  };

// クイズの開始処理
function quizReady() {
	count = 0; //問題番号初期化
    qa.shuffle();
	//最初の問題
	quizDisplay();
}

//問題表示
function quizDisplay() {
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
		quizDisplay();
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
		s += "【<a href='javascript:location.reload()'>ジャンルを選び直す</a>】";
		s += "【<a href='javascript:quizReady()'>同じ問題を最初から</a>】";
		//s += "【<a href=''>次の問題に進む</a>】";
		document.getElementById("text_s").innerHTML = s;
	}
}
