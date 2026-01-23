const end = () => {        
    AboutTextArea = document.getElementById("about-text-area");
    AboutTextArea.remove();
    if(language.checked == true){
        AboutArea.insertAdjacentHTML('afterbegin','<div id="about-text-area"></div>');
        AboutTextArea = document.getElementById("about-text-area");
        AboutTextArea.insertAdjacentHTML('beforeend','<h2>result</h2>');
        AboutTextArea.insertAdjacentHTML('beforeend','<h3>Correct count: '+result[0]+'   InCorrect count: '+result[1]+'</h3>');
    }else{
        AboutArea.insertAdjacentHTML('afterbegin','<div id="about-text-area"></div>');
        AboutTextArea = document.getElementById("about-text-area");
        AboutTextArea.insertAdjacentHTML('beforeend','<h2>結果</h2>');
        AboutTextArea.insertAdjacentHTML('beforeend','<h3>せいかい数: '+result[0]+'　まちがえた数: '+result[1]+'</h3>');
    }
    
    let comment_num = 0;
    if(result[0] <= 15){
        if(language.checked == true){
            comment_num = comment[0];
        }else{
            comment_num = comment_ja[0];
        }
    }else if(result[0] >15&&result[0] <= 25){
       if(language.checked == true){
            comment_num = comment[1];
        }else{
            comment_num = comment_ja[1];
        }
    }else{
        if(language.checked == true){
            comment_num = comment[2];
        }else{
            comment_num = comment_ja[2];
        }
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