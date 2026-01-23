import * as materials from './materialsset.js';
import { CharaCvs,BackCtx,
        ScreenFilter,TitleArea,AboutArea,AboutTextArea,SaveAboutTextArea,
        isFeatureEnabled,setIsFeatureEnabled,
        TimeText, game_area,returnbtn, 
        ReAboutTextArea,resultadd} from './variables.js';

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