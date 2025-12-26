import * as materials from './materialsset.js';
import * as setting from './setting.js';
import {screendraw} from './screendraw.js';
import { CharaCvs,
        ScreenFilter,TitleArea,AboutArea,AboutTextArea,SaveAboutTextArea,
        isFeatureEnabled,setIsFeatureEnabled,
        TimeText, game_area,returnbtn, 
        ReAboutTextArea} from './variables.js';
import { Q_toyslist } from './setting.js';
import { end } from './end.js';

const BackCvs= document.getElementById("backgroundcvs");
const BackCtx = BackCvs.getContext("2d");

let looped = 0;
let time = 0;
let timer = 0;

const reset = () => {
    if(looped == 1){
        CharaCvs.classList.remove("characvs_ani");
    }else if(isFeatureEnabled == true){
        drag_and_drop();
        setIsFeatureEnabled();
    }
    setting.game_setting();
    setting.text_setting();
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
                resultadd(0);
                materials.true_SE.currentTime = 0;
                materials.true_SE.play();

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
                resultadd(1);
                materials.false_SE.currentTime = 0;
                materials.false_SE.play();
            }
        });
    });
}

setIsFeatureEnabled();
window.onload = async function(){
    await materials.loadallMaterials();
    BackCtx.drawImage(materials.backimage, 0, 0);
    game_area.style.display = "none";

    const startbtn = document.getElementById("start");
    startbtn.addEventListener('click', function(){//ゲームの内容をセットする
        time = 60;
        TitleArea.style.display = "none";
        game_area.style.visibility ="visible";
        game_area.style.display = "block";
        ScreenFilter.style.visibility = "hidden";
        looped = 0;
        materials.bgm.loop = true;
        materials.bgm.currentTime = 0;
        materials.bgm.play();
        timer = setInterval(timer_event, 1000);
        materials.btn_SE.currentTime = 0;
        materials.btn_SE.play();

        reset();
    });

    const aboutbtn = document.getElementById("about");
    aboutbtn.addEventListener('click', function(){
        TitleArea.style.display = "none";
        AboutArea.style.display = "block";
        returnbtn.style.display = "block";
        materials.btn_SE.currentTime = 0;
        materials.btn_SE.play();
    });
    returnbtn.addEventListener('click', function(){
        returnbtnclick(0);
    });
}

export const returnbtnclick = (num) => {
    TitleArea.style.display = "block";
    AboutArea.style.display = "none";
    returnbtn.style.display = "none";
    ScreenFilter.style.visibility = "visible";
    if(isFeatureEnabled == false){
        materials.bgm.pause();
    }
    if(num == 1){
        ReAboutTextArea();
        AboutTextArea.remove();
        AboutArea.insertAdjacentHTML('afterbegin',SaveAboutTextArea);
    }
    materials.btn_SE.currentTime = 0;
    materials.btn_SE.play();
}