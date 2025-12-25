let random = "";

const toyslist = ["stuffed-animal","crayon","wooden-blocks","jump-rope",
            "keyboard-instrument","book","ball","mini-car"];
const boxlist = ["green","light-blue","orange","pink","white"];

export  let Q_toyslist = 0;

export const game_setting = () => {
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

export const text_setting = () => {
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