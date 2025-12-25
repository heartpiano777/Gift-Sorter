export let true_SE, false_SE, btn_SE, bgm,backimage;

function loadSound(src){
    return new Promise((resolve,reject) => {
        const sound = new Audio();
        sound.src = src;
        sound.addEventListener('canplaythrough', () => resolve(sound), { once: true });
        sound.addEventListener('error', () => reject(new Error(`サウンド読み込み失敗: ${src}`)), { once: true });
    });
}

function loadImage(src){
    return new Promise((resolve,reject) => {
        let image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`画像の読み込み失敗: ${src}`));
    });
}

export async function loadallMaterials(){
    try {
        [true_SE, false_SE, btn_SE, bgm, backimage,] = await Promise.all([
            loadSound("materials/SE/クイズ正解5.mp3"),
            loadSound("materials/SE/ビープ音4.mp3"),
            loadSound("materials/SE/決定ボタンを押す2.mp3"),
            loadSound("materials/bgm/christmasnomachi.mp3"),
            loadImage("materials/background/christmas_room07.png")
        ]);
    }catch(error){
        console.error("エラーが発生",error);
    }
}

loadallMaterials();