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