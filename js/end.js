import { TitleArea,AboutArea,AboutTextArea,game_area,returnbtn,result,ReAboutTextArea } from './variables.js';
import { returnbtnclick } from './main.js';

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

export const end = () => {        
    AboutTextArea.remove();
    AboutArea.insertAdjacentHTML('afterbegin','<div id="about-text-area"></div>');
    ReAboutTextArea();
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