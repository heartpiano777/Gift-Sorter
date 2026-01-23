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
    let boxrandom = boxlist[random];
    Q_toyslist["box"] = boxrandom;
    text_setting(random);
}

const text_setting = (boxcolor) => {
    let Q_text = "";
    const text_array = [];
    if(language.checked == true){
        for(let i = 0; i<toyslist.length; i++){
            if(!Q_toyslist[toyslist[i]]==0){
                text_array.push(Q_toyslist[toyslist[i]]+" "+toyslist[i]);
            }
        }
        for(let j = 0; j<text_array.length; j++){
            Q_text += text_array[j]+",  ";
        }
        Q_text += "in the "+boxlist[boxcolor]+" box."
        const text = document.getElementById("text");
        text.textContent = Q_text;
    }else if(language.checked == false){
            for(let i = 0; i<toyslist.length; i++){
            if(!Q_toyslist[toyslist[i]]==0){
                text_array.push(toyslist_ja[i]+"を"+Q_toyslist[toyslist[i]]+"個");
            }
        }
        for(let j = 0; j<text_array.length; j++){
            Q_text += text_array[j]+",  ";
        }
        Q_text += boxlist_ja[boxcolor]+"のプレゼントボックスに入れてね。";
        const text = document.getElementById("text");
        text.textContent = Q_text;
    }

}

const reset = () => {
    if(looped == 1){
        CharaCvs.classList.remove("characvs_ani");
    }else if(isFeatureEnabled == true){
        drag_and_drop();
        isFeatureEnabled = false;
    }
    game_setting();
    screendraw();
}