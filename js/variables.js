    export const CharaCvs= document.getElementById("characvs");
    export const CharaCtx = CharaCvs.getContext("2d");
    export const ScreenFilter = document.getElementById("screen-filter");

    export const TitleArea = document.getElementById("title-area");
    export const AboutArea = document.getElementById("about-area");
    export let AboutTextArea = document.getElementById("about-text-area");
    export const ReAboutTextArea = () => {
        AboutTextArea = document.getElementById('about-text-area');
    }
    export const SaveAboutTextArea = document.querySelector("#about-text-area").outerHTML;

    export let isFeatureEnabled = false;
    export function setIsFeatureEnabled() {
        isFeatureEnabled = !isFeatureEnabled;
    }

    export const TimeText = document.getElementById("time-text");
    export const game_area = document.getElementById("game-area");
    export let returnbtn = document.getElementById("return");

    export let result = [0,0];
    export const resultadd = (num) => {
        result[num]++;
    };

