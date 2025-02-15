console.log("linked")
let user_score=document.getElementById("user-score");
let comp_score=document.getElementById("comp-score");
let mess_to_display=document.getElementById("message");
let time=document.getElementById("time");
let button=document.getElementById("pick-button");
let click=document.getElementById("click");

let userscore=0;
let compscore=0;
let seconds=0;

    
const gen_compchoice=()=>{
        let options=["rock","paper","scissors"]
        let randomchoice=Math.floor(Math.random()*3);
        return options[randomchoice];
}

function random_generator(size){
        let random_index=Math.floor(Math.random()*size);
        return random_index;
}
function comp_details(){
    let comp_options=["The computer outsmarted you this time. Next round's your chance!",
                "The computer's tactics won. Reflect and revise for the next challenge.",
                "A setback now, but keep pushing forward. Victory awaits!",
                "Computer played well. Improve your strategy.",
                "Computer's choice wins. Next round's yours!"
            ];

            let index=random_generator(comp_options.length);
            return comp_options[index];
}
function user_details(){
    let user_options=["Well done! Let's see if you can win again!",
                    "Great job! Ready for another round?",
                    "Victory is yours! Play again for more fun!",
                    "You're on fire! How about another round?",
                    "Fantastic win! Keep the streak going!"
            ];
            let index=random_generator(user_options.length);
            return user_options[index];
}
function drawgame(){
     mess_to_display.style.display="inline";
     mess_to_display.innerHTML="It's a tie! The competition was fierce. Let's go for another round!";
     mess_to_display.style.backgroundColor="orange";
}
const game=(comp_selected)=>{
    mess_to_display.style.display="inline";
    console.log(comp_selected)
    if(comp_selected){
        compscore++;
        comp_score.innerHTML=compscore;
        mess_to_display.innerHTML=comp_details();
        mess_to_display.style.backgroundColor="red"
    }
    else{
        userscore++;
        user_score.innerHTML=userscore;
        mess_to_display.innerHTML=user_details();
        mess_to_display.style.backgroundColor="green"
    }
       
}
const playgame=(userchoice)=>{
    let compchoice=gen_compchoice();
    if(compchoice==userchoice){
        drawgame();
    }
    else{
        let comp_selected=true;
        if(compchoice=="rock"){
            //scissors,paper
            comp_selected=((userchoice==="paper")?false:true);
        }
        else if(compchoice=="paper"){
            //scissors,rock
            comp_selected=userchoice==="scissors"?false:true;
        }
        else{
             //paper,rock
             comp_selected=userchoice==="rock"?false:true;
        }
        game(comp_selected)
    }
}
const stoptimer=(set_timer)=>{
        winner=false;
        if(parseInt(compscore) == parseInt(userscore)){
            window.location.href="drawgame.html";
        }
        else{
            winner=(parseInt(compscore) > parseInt(userscore)) ? true : false;
            if(winner){
                    window.location.href="compwin.html";
            }
                
            else{
                window.location.href="userwin.html";
            }
        }
        clearInterval(set_timer)
}

button.addEventListener('click',()=>{
    button.style.display="None";
    let secs=0;
    let set_timer=setInterval(()=>{
        incre_timer();
    },1000);
    
    function incre_timer(){
       if((secs.toString().length)===1){
           secs="0"+secs;
           //here secs in string type
       }
        time.innerHTML="00"+':'+secs
        secs=parseInt(secs);  //secs converted to int 
        secs=secs+1; //if string secs=0  1 will be appended at end 01 like this
        if(secs=='15')
            stoptimer(set_timer);
    }
    
    const choices=document.querySelectorAll(".choice");
    choices.forEach((selectedchoice)=>{
            selectedchoice.addEventListener("click",()=>{
                    const userchoice=selectedchoice.getAttribute("id")
                    playgame(userchoice);
            });
    });
    
    
});
