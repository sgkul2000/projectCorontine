function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
}


var player_name = getUrlVars()['name'];
playername = player_name.split(' ').join('+');
var redirect_url = 'something'






const questionElement = document.getElementById('questionHead');
let shuffledQs, currentIndex;
const asnwerElement = document.getElementById('answerElement');
const nextButton = document.getElementById('nextBtn')
var score = 0;


function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
}





const questions = [
    {
    question : 'what is Shreesh\'s middle name?',
    answers: [
        { text: 'Girish', correct: false},
        {text: 'Gururaj', correct: true},
        {text: 'Giriraj', correct: false},
        {text: 'Gaurav', correct: false}
    ]
    },
    {
        question : 'Where would Shreesh not like to go right now?',
        answers: [
            { text: 'Kitchen', correct: false},
            { text: 'Mars', correct: false},
            { text: 'Italy', correct: true},
            { text: 'Singapore', correct: false}
        ]
    },
    {
        question : 'Which brand defines Shreesh?',
        answers: [
            { text: 'Adidas', correct: false},
            { text: 'HP', correct: false},
            { text: 'OnePlus', correct: true},
            { text: 'Nike', correct: false}
        ]
    },
    {
        question : 'Which is Shreesh\'s favorite fruit?',
        answers: [
            { text: 'Banana', correct: false},
            { text: 'Orange', correct: false},
            { text: 'Mango', correct: false},
            { text: 'Watermelon', correct: true}
        ]
    },
    {
        question : 'Which mode of transport does Shreesh prefer?',
        answers: [
            { text: 'Bike', correct: true},
            { text: 'Private Plane', correct: false},
            { text: 'Car', correct: false},
            { text: 'Ship', correct: false}
        ]
    },
    {
        question : 'Shreesh is which of these?',
        answers: [
            { text: 'Cat person', correct: false},
            { text: 'Dog person', correct: true},
            { text: 'Bird person', correct: false},
            { text: 'Pet hater', correct: false}
        ]
    },
    {
        question : 'Which of these is Shreesh\'s favorite?',
        answers: [
            { text: 'Tollywood', correct: false},
            { text: 'Bollywood', correct: false},
            { text: 'Hollywood', correct: true},
            { text: 'Sandalwood', correct: false}
        ]
    },
    {
        question : 'Where is Shreesh from?',
        answers: [
            { text: 'Vijaypura', correct: false},
            { text: 'Bagalkot', correct: true},
            { text: 'Belgaum', correct: false},
            { text: 'Mars', correct: false}
        ]
    },
    {
        question : 'Which of these is Shreesh\'s phone number',
        answers: [
            { text: '9606698912', correct: true},
            { text: '8762224572', correct: false},
            { text: '9606998912', correct: false},
            { text: '8762324572', correct: false}
        ]
    },
    {
        question : 'Which of these places has Shreesh not been to?',
        answers: [
            { text: 'Macau', correct: false},
            { text: 'Dubai', correct: false},
            { text: 'Bangkok', correct: true},
            { text: 'Singapore', correct: false}
        ]
    },
    {
        question : 'Which is shreesh\'s favorite sport?',
        answers: [
            { text: 'Cricket', correct: false},
            { text: 'Football', correct: true},
            { text: 'Badminton', correct: false},
            { text: 'Table Tennis', correct: false}
        ]
    },
    {
        question : 'Which is shreesh\'s favorite esport?',
        answers: [
            { text: 'PUBG Mobile', correct: false},
            { text: 'Shadowgun Legends', correct: false},
            { text: 'Call of Duty Mobile', correct: true},
            { text: 'FIFA Football', correct: false}
        ]
    },
    {
        question : 'Which is shreesh\'s favorite sportsman?',
        answers: [
            { text: 'Ronaldo', correct: false},
            { text: 'Virat Kholi', correct: false},
            { text: 'Roger Federer', correct: false},
            { text: 'Messi', correct: true}
        ]
    }
];


shuffledQs= questions.sort(() => Math.random() - .5);
currentIndex = 0;
nextButton.addEventListener('click', () =>{
    if(nextButton.innerText == 'Next Question'){
        currentIndex++;
        setQuestionNext();
    }
});
setQuestionNext();

function setQuestionNext(){
    resetState();
    document.getElementById('queno').innerText = 'Question ' + (currentIndex+1).toString()+' of 10:';
    showQuestion(shuffledQs[currentIndex]);
}

function showQuestion(question){
    questionElement.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('col-xs-12','col-md-5','btn','btn-lg','w-100','btn-outline-secondary','options');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerElement.appendChild(button);
    })
}

function resetState(){
    nextButton.classList.add('noDisplay');
    while(answerElement.firstChild){
        asnwerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e){
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    if(selectButton.dataset.correct){
        score=score + 1;
        redirect_url = '/result?name='+playername+'&score='+score.toString();
        selectButton.classList.add('btn-success');
        selectButton.classList.remove('btn-outline-secondary');
    } else {
        selectButton.classList.remove('btn-outline-secondary');
        selectButton.classList.add('btn-danger');
        Array.from(answerElement.children).forEach(button => {
            if(button.dataset.correct){
                button.classList.add('btn-success');
                button.classList.remove('btn-outline-secondary');
            }
        }) ;
    }
    if( 10 > currentIndex+1){
        nextButton.classList.remove('noDisplay');
    } else{
        nextButton.classList.remove('noDisplay');
        nextButton.innerText = 'Check Results';
        // alert(score + ' is the score');
        
    }
    // setStatus()
    // Array.from(answerElement.children).forEach(button => {
    //     if(button.dataset.correct == true){
        //         alert('true')
    //     }
    //     setStatus(button, button.dataset.correct)
    // })
}





$(document).ready(function(){
    $('#nextBtn').click(function(){
        if( $('#nextBtn').text() == 'Check Results' ){
            
            
            // alert('in here');
            $.ajax({
                data : {
                    Name : player_name ,
                    Score :  score
                },
                type : 'POST',
                url : '/result/process'
                }).done(function(data){
                if(data){
                    window.location.replace(redirect_url);
                }
                });
        }
    });
    
});
