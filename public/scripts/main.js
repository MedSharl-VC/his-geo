
// LOCAL_vars :-

var ans_output = document.querySelectorAll("#A .ans span");
var question = document.querySelector("#Q span");
var ans = document.querySelectorAll("#A .ans");
var scr_output = document.querySelector("header #scr");
var imgs = [];  // IDEA: showup after done and show the progress ;
var snd_btn = new Audio("snd/click-001.wav");
var bg_snd = new Audio("snd/bg-sound.mp3");

var arr = [];
var $ = 0;
var had_ans = false;
var scr = 0;

// Main Classes :-

class Stage {
  constructor(n, obj, timer = null){
    this.name = n;
    this.element = obj;
    this.isTimed = timer==null?false:true;
    if(timer!=null)this.time = timer;
  }

  show () {
    if(this.isTimed == true)setTimeout(() => {
      this.element.style.display = "none";
    },
    this.time
  );
    this.element.style.display = "block";
  }

  hide () {
    this.element.style.display = "none";
  }

  fadeOut () {
      this.element.classList.add("animeFadeOut");
    setTimeout(() => {
      this.element.classList.remove("animeFadeOut");
      this.element.style.display = "none";
    },
    1000
  );
  }

  fadeIn () {
    this.element.style.display = "block";
    this.element.classList.add("animeFadeIn");
    setTimeout(() => {
      this.element.classList.remove("animeFadeIn");
    },
    1000
    );
  }
}

// Main Stages :-

var alertBody = new Stage("alertbox", document.getElementById("alertBack"));
var main_menu = new Stage("main_menu", document.getElementById("stage-01"));
var playing_type_list = new Stage("ptl", document.getElementById("stage-01-01"));
var playground = new Stage("pg", document.getElementsByTagName("main")[0]);

// Asset Funcs :-

function getRdNum(n){
  return Math.floor(Math.random()*(n+1));
}

function arrayResort(a, n){
  let a2 = [];
  a.forEach((item, i) => {
    if(n >= a.length)n=0;
    a2[n]=item;
    n++;
     // QUESTION: how to do it only with math exps ;
  });

  return a2.concat();
}

function getQuizI(){
  return Math.floor(Math.random()*quiz.length);
}

function makeAlert(h, b, time = null) {
  document.getElementById("alert-head").innerText = h;
  document.getElementById("alert-content").innerText = b;
  alertBody.element.children[0].classList.add("animeZoomIn");
  alertBody.show();
}

// Main Funcs :-

function startUp() {
  // NOTE: run when the program  start
  bg_snd.loop = true;
  bg_snd.play();
  main_menu.show();
}

function li_1Func() {
  snd_btn.play();
  main_menu.fadeOut();
  setTimeout(
    () => {
      playing_type_list.fadeIn();
    },
    1010
  )

}

function li_2Func() {
  snd_btn.play();
}

function li_3Func() {
  snd_btn.play();
  makeAlert("حول اللعبة", "المتبسيمنبتكشسبتكيشتهخرىخهصثتىبخكصخثهبتى");

}

function li_4Func() {
  snd_btn.play();
}

function sli_1Func() {
  snd_btn.play();

}

function sli_2Func() {
  snd_btn.play();

}

function playStarts() {
  snd_btn.play();
  playing_type_list.hide();
  playground.show();
  init();
  ask();
}

function gameEnd() {
  snd_btn.play();
}

function init(){

  // initial arr :-

  $ = getQuizI();
  arr.push(quiz[$].a);
  let Num = 1;
  while(Num<4){
    let q_01 = quiz[getQuizI()].a;
    if(q_01 === quiz[$].a || arr.includes(q_01)){
      continue;
    }
    arr.push(q_01);
    Num++;
  }

  arr = arrayResort(arr, getRdNum(3));
  // console.log(arr);

  return arr, $;

  // console.log(arr);
  // console.log($);

}

function ask(){
  question.innerText = quiz[$].q;
  ans_output.forEach((item, i) => {
    item.innerText = arr[i];
  });
  had_ans = false;
  return had_ans;
}

function answor(e) {
  let a;
  // FIXME: color ish ;
  if(e.type == "click")
    a = (e.target.tagName == "B" || e.target.tagName == "SPAN") ? e.target.parentElement : e.target;
  if(e.type == "keydown")
    switch (e.keyCode) {
      case 97:
        a = ans[0];
        break;
      case 98:
        a = ans[1];
        break;
      case 99:
        a = ans[2];
        break;
      case 100:
        a = ans[3];
        break;
      default:
        a = false;
    }

  // console.log(a);
  // console.log(e);
  // console.log(e.target.children[1].innerText);

  if(!had_ans && a)
  {

  arr = [];
  if(a.children[1].innerText == quiz[$].a){
    a.className = "is_ans";
    had_ans = true;
    scr += 10;
    scr_output.innerText = scr;
    setTimeout(()=>{
      a.className = "ans";
      $=0;
      init();
      ask();
    }, 3000);
  }else{
    a.className = "not_ans";
    had_ans = true;
    if(scr-5 < 0){
      scr = 0
    }else {
      scr -= 5;
    }
    scr_output.innerText = scr;
    setTimeout(()=>{
      a.className = "ans";
      $=0;
      init();
      ask();
    }, 3000);

  }
  }

}

// Event Listeners

ans.forEach((item, i) => {
  item.addEventListener("click", answor);
});

this.addEventListener("keydown", answor);

document.getElementById("alertBack").onclick = e => {
  alertBody.hide();
}

// Tests :-

// console.log(ans_output);
// console.log(question);

// init();
// console.log(arr, $, quiz[$].a);

startUp();
