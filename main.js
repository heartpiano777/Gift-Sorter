const BackCvs= document.getElementById("backgroundcvs");
const BackCtx = BackCvs.getContext("2d");
const CharaCvs= document.getElementById("characvs");
const CharaCtx = CharaCvs.getContext("2d");

const ScreenFilter = document.getElementById("screen-filter");
const TitleArea = document.getElementById("title-area");
const AboutArea = document.getElementById("about-area");
let AboutTextArea = document.getElementById("about-text-area");
const SaveAboutTextArea = document.querySelector("#about-text-area").outerHTML;

const TimeText = document.getElementById("time-text");
const game_area = document.getElementById("game-area");

let true_SE, false_SE, btn_SE, bgm;

function loadSound(src,id){
    return new Promise((resolve,reject) => {
        const sound = new Audio();
        sound.src = src;
        if(id){
            sound.id = id;
        }
        sound.addEventListener('canplaythrough', () => resolve(sound), { once: true });
        sound.addEventListener('error', () => reject(new Error(`サウンド読み込み失敗: ${src}`)), { once: true });
    });
}

async function loadallSounds(){
    try {
        [true_SE, false_SE, btn_SE, bgm] = await Promise.all([
            loadSound("materials/SE/クイズ正解5.mp3", "true_SE"),
            loadSound("materials/SE/ビープ音4.mp3", "false_SE"),
            loadSound("materials/SE/決定ボタンを押す2.mp3", "btn_SE"),
            loadSound("materials/bgm/christmasnomachi.mp3", "bgm")
        ]);
    }catch(error){
        console.error("サウンドの読み込みでエラーが発生",error);
    }
}

loadallSounds();

let returnbtn = document.getElementById("return");

let random = "";

const charaimgs = [5,6,11,14,15];

let Q_toyslist = 0;
const toyslist = ["stuffed-animal","crayon","wooden-blocks","jump-rope",
        "keyboard-instrument","book","ball","mini-car"];
const boxlist = ["green","light-blue","orange","pink","white"];

let result = [0,0];
let looped = 0;
let time = 0;

let timer = 0;

let isFeatureEnabled = false;

const comment = ["Santa Claus and his reindeer are delighted that you helped them. "+
    "Santa Claus looked at you with sparkling eyes and said,“You can do even more. "+
    "Will you help me again? ”"+
    "The reindeer also looks at you with a face that says, “You can do it!” "+
    "You decided to keep doing your best. "+
    "It looks like you’ll be able to have a wonderful Christmas soon.",

    "Santa Claus and his reindeer are very happy that you helped them, saying, "+
    "“You really saved us!” "+
    "Santa Claus looked at you with gentle eyes and said, "+
    "“Just as I thought. I’m glad I asked you.” "+
    "The reindeer has become good friends with you and looks like he wants a carrot. "+
    "Seeing their faces, you felt truly glad you helped them. "+
    "And you thought that you wouldn’t mind working a little harder. "+
    "It seems you’ll be able to have a wonderful Christmas.",

    "Santa Claus and his reindeer are deeply moved that you helped them, saying, "+
    "“You really saved us! I can’t believe how fast you work!” "+
    "Santa Claus, with tears of joy in his eyes, said, "+
    "“You exceeded my expectations. I’m truly glad I asked you.” "+
    "In fact, Santa Claus had been struggling a lot with sorting the presents. "+
    "But for the good children who were wishing for those gifts, he knew he absolutely had to get everything sorted before Christmas. "+
    "Santa thanked you many times, and even gave you some sweets and a present as a souvenir! "+
    "The reindeer is humming a tune, thinking he’ll get lots of carrots when Santa is in such a good mood. "+
    "Watching Santa and the reindeer, you felt truly glad that you helped them. "+
    "You even got souvenirs, and their happiness made you feel happy too. "+
    "There’s no doubt this will be a wonderful Christmas!"
];

const screendraw = () => {
    random = Math.floor(Math.random() * charaimgs.length);
    let charaimage = new Image();
    charaimage.src = 'materials/chara/91537_'+charaimgs[random]+'.png';
    charaimage.onload = function(){

        let widthscale = 300/charaimage.width;
        let heightscale = 300/charaimage.height;
        let scale = 0;
        if(widthscale < heightscale){
            scale = widthscale;
        }else{
            scale = heightscale;
        }
        CharaCtx.clearRect(0,0,300,300);
        CharaCtx.drawImage(charaimage, 0, 0, charaimage.width, charaimage.height, 0, 0, charaimage.width*scale, charaimage.height*scale); 
    };
    CharaCvs.style.visibility = "hidden";
    ScreenFilter.style.visibility = "hidden";
}

const game_setting = () => {
    Q_toyslist = {"stuffed-animal":0, "crayon":0, "wooden-blocks":0,
            "jump-rope":0, "keyboard-instrument":0, "book":0, "ball":0, "mini-car":0};
    let number_random = ";"

    for(let i = 0; i<3; i++){
        random = Math.floor( Math.random() * toyslist.length );
        random = toyslist[random];
        number_random = Math.floor( Math.random() * 3) + 1;
        
        Q_toyslist[random] = number_random;
    }
    random = Math.floor( Math.random() * boxlist.length );
    random = boxlist[random];
    Q_toyslist["box"] = random;
}

const text_setting = () => {
    let Q_text = "";
    const text_array = [];
    for(let i = 0; i<toyslist.length; i++){
        if(!Q_toyslist[toyslist[i]]==0){
            text_array.push(Q_toyslist[toyslist[i]]+" "+toyslist[i]);
        }
    }
    for(let j = 0; j<text_array.length; j++){
        Q_text += text_array[j]+",  ";
    }
    Q_text += "in the "+Q_toyslist["box"]+" box."
    const text = document.getElementById("text");
    text.textContent = Q_text;
}

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

const reset = () => {
    if(looped == 1){
        CharaCvs.classList.remove("characvs_ani");
    }else if(isFeatureEnabled == true){
        drag_and_drop();
        isFeatureEnabled = false;
    }
    game_setting();
    text_setting();
    screendraw();
}

const timer_event = () => {
    time -= 1;
    TimeText.textContent = time;
     if (time == 0) {
        clearInterval(timer);
        end();
    }
}


const end = () => {        
    AboutTextArea = document.getElementById("about-text-area");
    AboutTextArea.remove();
    AboutArea.insertAdjacentHTML('afterbegin','<div id="about-text-area"></div>');
    AboutTextArea = document.getElementById("about-text-area");
    AboutTextArea.insertAdjacentHTML('beforeend','<h2>result</h2>');
    AboutTextArea.insertAdjacentHTML('beforeend','<h3>Correct count: '+result[0]+'</h3>');
    AboutTextArea.insertAdjacentHTML('beforeend','<h3>InCorrect count: '+result[1]+'</h3>');
    let comment_num = 0;
    if(result[0] <= 15){
        comment_num = comment[0];
    }else if(result[0] >15&&result[0] <= 25){
        comment_num = comment[1]
    }else{
        comment_num = comment[2];
    }
    AboutTextArea.insertAdjacentHTML('beforeend','<p class="about-text">'+comment_num+'</p>');
    game_area.style.display = "none";
    TitleArea.style.display = "none";
    AboutArea.style.display = "block";
    returnbtn.style.display = "block";
    returnbtn.addEventListener('click', function(){
        returnbtnclick(1);
    });
}

isFeatureEnabled = !isFeatureEnabled;
window.onload = function(){
    game_area.style.display = "none";
    let image = new Image();
    image.src = 'materials/background/christmas_room07.png';
    image.onload = function(){
        BackCtx.drawImage(image, 0, 0, 1792, 1024, 0, 0, 1200, 675); 
    };
    const startbtn = document.getElementById("start");
    startbtn.addEventListener('click', function(){//ゲームの内容をセットする
        time = 60;
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
        AboutArea.insertAdjacentHTML('afterbegin',SaveAboutTextArea);
    }
    btn_SE.currentTime = 0;
    btn_SE.play();
}