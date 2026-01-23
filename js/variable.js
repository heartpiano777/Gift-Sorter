const BackCvs= document.getElementById("backgroundcvs");
const BackCtx = BackCvs.getContext("2d");
const CharaCvs= document.getElementById("characvs");
const CharaCtx = CharaCvs.getContext("2d");

const ScreenFilter = document.getElementById("screen-filter");
const TitleArea = document.getElementById("title-area");
const title_en = document.getElementById("title_en");
const title_ja = document.getElementById("title_ja");
const AboutArea = document.getElementById("about-area");
let AboutTextArea = document.getElementById("about-text-area");

const TimeText = document.getElementById("time-text");
const game_area = document.getElementById("game-area");

const true_SE = new Audio("materials/SE/クイズ正解5.mp3");
const false_SE = new Audio("materials/SE/ビープ音4.mp3");
const btn_SE = new Audio("materials/SE/決定ボタンを押す2.mp3");
const bgm = new Audio("materials/bgm/christmasnomachi.mp3");

const language = document.getElementById('toggle');

let returnbtn = document.getElementById("return");

let random = "";

const charaimgs = [5,6,11,14,15];

let Q_toyslist = 0;
const toyslist = ["stuffed-animal","crayon","wooden-blocks","jump-rope",
        "keyboard-instrument","book","ball","mini-car"];
const boxlist = ["green","light-blue","orange","pink","white"];
const toyslist_ja = ["くまのぬいぐるみ","クレヨン","つみ木","なわとび","けんばん楽器","本","ボール","ミニカー"];
const boxlist_ja = ["みどり","みずいろ","オレンジいろ","ピンクいろ","しろ"];

let result = [0,0];
let looped = 0;
let time = 0;

let timer = 0;
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

const comment_ja = ["サンタクロースとトナカイは、あなたに手伝ってもらえて喜んでいます。"+
                    "サンタクロースはあなたに「君ならもっとできる。また手伝ってくれないかい？」と、キラキラした目で言いました。"+
                    "トナカイも「頑張って！」という顔をしています。"+
                    "あなたはまた頑張ることにしました。"+
                    "もう少しで素敵なクリスマスを迎えられそうですね。",

                    "サンタクロースとトナカイは、あなたに手伝ってもらえて「とても助かったよ！」と喜んでいます。"+
                    "サンタクロースはあなたに「思った通りだ、君に頼んでよかった」と、優しい目で言いました。"+
                    "トナカイはすっかりあなたと仲良くなり、ニンジンがほしいという顔をしています。"+
                    "あなたはサンタクロースとトナカイの顔を見て、手伝ってよかったと思いました。"+
                    "そして、もう少し頑張っても良いかなと思いました。"+
                    "素敵なクリスマスを迎えられそうです。",

                    "サンタクロースとトナカイは、あなたに手伝ってもらえて「とても助かったよ！　君がこんなにも仕事が速いなんて！」と感激しています。"+
                    "サンタクロースはあなたに「君は想像以上だ、君に頼んで本当によかった」と、嬉し涙を流しながら言いました。"+
                    "実はサンタクロースは、プレゼントの仕分けに本当に苦労していました。"+
                    "ですが、プレゼントをお願いするかわいいよいこたちのためには、何としてでもクリスマスまでにプレゼントを仕分けしないといけないと思っていたのです。"+
                    "サンタクロースは何度もあなたに感謝し、なんとお土産にお菓子とプレゼントまでくれました！"+
                    "トナカイは、サンタクロースの機嫌が良いとたくさんニンジンをもらえると思い、鼻歌を歌っています。"+
                    "あなたはサンタクロースとトナカイの様子を見て、本当に手伝ってよかったと思いました。お土産ももらえたし、こちらまで幸せになりました。"+
                    "これで素敵なクリスマスになること間違いなしです！"
                    ];