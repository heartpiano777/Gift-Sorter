let isFeatureEnabled = false;

let lan_save = true;

let dropped_toy_id = "";
const drag_and_drop = () =>{
    const toysPNG = document.querySelectorAll(".toysPNG");
    toysPNG.forEach(t_item => {
        t_item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData("text/plain", e.target.id);
        });
    });

    const BoxWebp = document.querySelectorAll(".true-area-div");
    BoxWebp.forEach(b_item => {
        b_item.addEventListener('dragover', function(e){
            e.preventDefault();
        });
    
        b_item.addEventListener('drop', function(e){
            e.preventDefault();
            dropped_toy_id = e.dataTransfer.getData("text/plain");
            if(b_item.id==Q_toyslist["box"]&&Q_toyslist[dropped_toy_id]>0){
                Q_toyslist[dropped_toy_id]-=1;
                result[0]++;
                true_SE.currentTime = 0;
                true_SE.play();

                const not_0 = Object.values(Q_toyslist).filter(value => value !== 0);
                if(not_0.length == 1){
                    const box = document.getElementById(Q_toyslist["box"]+"box");
                    if (box) {
                        box.src = 'materials/animation/ani_'+Q_toyslist["box"]+'box.webp';
                        ScreenFilter.style.visibility = "visible";
                        CharaCvs.style.visibility = "visible";
                        CharaCvs.classList.add("characvs_ani");
                        looped = 1;
                        setTimeout(reset, 2000);
                    }
                }
            }else{
                result[1]++;
                false_SE.currentTime = 0;
                false_SE.play();
            }
        });
    });
}

const timer_event = () => {
    time -= 1;
    TimeText.textContent = time;
     if (time == 0) {
        clearInterval(timer);
        end();
    }
}

isFeatureEnabled = !isFeatureEnabled;
window.onload = function(){
    title_en.style.display = "none";
    abouttext(true);
    language.addEventListener('change', () => {
        if (language.checked) {            
            title_ja.style.display = "none";
            title_en.style.display = "block";
        } else {
            title_en.style.display = "none";
            title_ja.style.display = "block";
        }
    });
    game_area.style.display = "none";
    let image = new Image();
    image.src = 'materials/background/christmas_room07.png';
    image.onload = function(){
        BackCtx.drawImage(image, 0, 0, 1792, 1024, 0, 0, 1200, 675); 
    };
    const startbtn = document.getElementById("start");
    startbtn.addEventListener('click', function(){//ゲームの内容をセットする
        time = 5;
        TitleArea.style.display = "none";
        game_area.style.visibility ="visible";
        game_area.style.display = "block";
        looped = 0;
        reset();
        bgm.loop = true;
        bgm.currentTime = 0;
        bgm.play();
        timer = setInterval(timer_event, 1000);
        btn_SE.currentTime = 0;
        btn_SE.play();
    });

    const aboutbtn = document.getElementById("about");
    aboutbtn.addEventListener('click', function(){
        abouttext();
        TitleArea.style.display = "none";
        AboutArea.style.display = "block";
        returnbtn.style.display = "block";
        btn_SE.currentTime = 0;
        btn_SE.play();
    });
    returnbtn.addEventListener('click', function(){
        returnbtnclick(0);
    });
}

const returnbtnclick = (num) => {
    TitleArea.style.display = "block";
    AboutArea.style.display = "none";
    returnbtn.style.display = "none";
    ScreenFilter.style.visibility = "visible";
    if(isFeatureEnabled == false){
        bgm.pause();
    }
    if(num == 1){
        AboutTextArea = document.getElementById("about-text-area");
        AboutTextArea.remove();
        abouttext(true);
    }
    btn_SE.currentTime = 0;
    btn_SE.play();
}

const abouttext = (first) => {
    //alert(lan_save);
    //alert(language.checked);
    if(!lan_save == language.checked || first == true){
        lan_save = language.checked;
        if(language.checked == true){
            AboutTextArea.remove();
            AboutArea.insertAdjacentHTML('afterbegin','<div id="about-text-area"></div>');
            AboutTextArea = document.getElementById("about-text-area");
            AboutTextArea.insertAdjacentHTML('beforeend','<h2>story</h2>');
            AboutTextArea.insertAdjacentHTML('beforeend','<p class="about-text">It’s just before Christmas at Santa Claus’s house. Santa and his reindeer are very busy sorting all the presents. '
                            +'You’ve been asked by Santa to help with the sorting. '
                            +'Let’s start organizing the presents one after another!</p>');
            AboutTextArea.insertAdjacentHTML('beforeend','<h2>How to Play</h2>');
            AboutTextArea.insertAdjacentHTML('beforeend','<p class="about-text">You will be given three pieces of information as a task: the type of toy, '
                            +'the number of toys, and the color of the present box. Drag and drop the toys according to the task and place them into the present box!'
                            +'Once you’ve placed all the toys inside, the present box will be wrapped, and Santa will be delighted! The time limit is 60 seconds.'
                            +"Let’s sort as many presents as we can within the time limit."
                        +'</p>');
        }else{
            AboutTextArea.remove();
            AboutArea.insertAdjacentHTML('afterbegin','<div id="about-text-area"></div>');
            AboutTextArea = document.getElementById("about-text-area");
            AboutTextArea.insertAdjacentHTML('beforeend','<h2>おはなし</h2>');
            AboutTextArea.insertAdjacentHTML('beforeend','<p class="about-text">'
                +'クリスマス前のサンタクロースの家。サンタクロースとトナカイはプレゼントの仕分けで大忙しです。'
                +'あなたはサンタクロースに頼まれて、プレゼントの仕分けを手伝うことになりました。'
                +'どんどんプレゼントを仕分けしていこう！</p>');
            AboutTextArea.insertAdjacentHTML('beforeend','<h2>あそびかた</h2>');
            AboutTextArea.insertAdjacentHTML('beforeend','<p class="about-text">'
                +'おもちゃの種類、数、プレゼントボックスの色の三つの情報がお題として出されます。'
                +'お題の通りにおもちゃをドラッグアンドドロップして、プレゼントボックスに入れよう！'
                +'おもちゃをすべて入れられたら、プレゼントボックスがラッピングされて、サンタクロースが喜ぶよ！'
                +'制限時間は60秒。'
                +'制限時間内でできるだけたくさんのプレゼントを仕分けしよう。</p>');
        }
    }
}