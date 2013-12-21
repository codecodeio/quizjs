"use strict";//enable strict mode (ECMAScript 5)

function Quiz() {
    MasterBean.call(this, arguments);

    //Public Variables
    this.currentQuestion = 0;

    this.allQuestions = [
        {
            question: "Which JavaScript framework runs on the client and server?",
            choices: ["Meteor", "Angular", "Ember", "Batman", "Backbone"],
            correctAnswer: 0,
            answer: null
        },
        {
            question: "Is Node ready to be a production web server?",
            choices: ["Yes", "No"],
            correctAnswer: 0,
            answer: null
        },
        {
            question: "What is the best way to decouple HTML from JavaScript?",
            choices: ["Underscore.js", "Handlebars.js","Mustache.js","EJS","Dust.js"],
            correctAnswer: 1,
            answer: null
        }
    ];

}
app.inheritPrototype(Quiz, MasterBean);

Quiz.prototype.incrementCurrentQuestion = function () {
    this.currentQuestion++;
};

Quiz.prototype.displayNextQuestion = function () {
    this.displayQuestion();
    this.displayChoices();
};

Quiz.prototype.addQuestionPage = function () {
    var questionPageNode = document.getElementById("questionPage");
    var questionNode = boot.col("questionSection", 12);
    var choicesNode = boot.col("choicesSection", 12);
    questionPageNode.appendChild(questionNode);
    questionPageNode.appendChild(choicesNode);
    EventUtil.addHandler(questionPageNode, "click", this.questionPageEventHandler);

    this.displayNextQuestion();
};

Quiz.prototype.removeQuestionPage = function(){
    var questionPageNode = document.getElementById("questionPage");
    questionPageNode.onclick = null;
    questionPageNode.innerHTML = null;
};

Quiz.prototype.displayQuestion = function(index){
    index = this.currentQuestion;
    var elem = document.getElementById("questionSection");
    var h4Node = document.createElement("h4");
    var questionNode = document.createTextNode(index+1 + ". " + this.allQuestions[index].question);

    h4Node.appendChild(questionNode);

    elem.appendChild(h4Node);
};

Quiz.prototype.displayChoices = function(index){
    index = this.currentQuestion;
    var elem = document.getElementById("choicesSection");

    var choiceMessageNode = document.createElement("div");
    choiceMessageNode.setAttribute("id","choiceMessage");
    elem.appendChild(choiceMessageNode);

    var formNode = boot.form("choices","");

    for(var i=0; i<this.allQuestions[index].choices.length; i++){
        var radioNode = boot.radio("answer",i,this.allQuestions[index].choices[i]);
        formNode.appendChild(radioNode);
    }

    var submitNode = boot.submit("choices-submit","Submit");
    formNode.appendChild(submitNode);

    elem.appendChild(formNode);

    this.set("currentQuestion",index);
};

Quiz.prototype.questionPageEventHandler = function(){
    var event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    switch(target.id){
        case "choices-submit":
            EventUtil.preventDefault(event);
            
            //var answers = $("#choices").find("input");
            var answers = document.body.querySelectorAll("#answer");
            //var formNode = document.getElementById("choicesSection");
            //alert(formNode.elements.length);
            //var answers = formNode.elements[0];
            var selected = DomUtil.selected(answers);

            var messageNode = document.getElementById("choiceMessage");
            messageNode.innerHTML = "";
            //alert(window.quiz.allQuestions[window.quiz.currentQuestion].correctAnswer + " " + selected)
            
            if(selected === null){
                messageNode.appendChild(boot.alert("danger","You must select an answer!"));
            }
            else {
                window.quiz.allQuestions[window.quiz.currentQuestion].answer = selected;

                DomUtil.removeNode("choices-submit");

                if(window.quiz.allQuestions[window.quiz.currentQuestion].correctAnswer === selected){
                    messageNode.appendChild(boot.alert("success","Correct!"));
                }
                else {
                    messageNode.appendChild(boot.alert("warning","WRONG!"));
                }

                var formNode = document.getElementById("choicesSection");
                var buttonNode = boot.button("choices-next","Next","success");
                formNode.appendChild(buttonNode);
            }
            break;

        case "choices-next":
            if (window.quiz.currentQuestion+1 < window.quiz.allQuestions.length) {
                window.quiz.incrementCurrentQuestion();
                window.quiz.resetQuestionPage();
                window.quiz.displayNextQuestion();
            } else {
                window.quiz.loadResultsPage();
            }
            break;
    }  
};

Quiz.prototype.resetQuestionPage = function(){
    var questionNode = document.getElementById("questionSection");
    questionNode.innerHTML = null;
    var choicesNode = document.getElementById("choicesSection");
    choicesNode.innerHTML = null;
};

Quiz.prototype.loadResultsPage = function(){
    window.quiz.removeQuestionPage();

    var headerNode = boot.col("results","12");

    var h4Node = document.createElement("h4");
    var titleNode = document.createTextNode("Quiz Complete!");

    headerNode.appendChild(h4Node);
    h4Node.appendChild(titleNode);

    var grade = this.calculateGrade();

    var summaryNode = boot.col("summary","12");
    var summaryTextNode = document.createTextNode("Grade: " + grade + "%");
    summaryNode.appendChild(summaryTextNode);

    var buttonSectionNode = boot.col("startover","12");
    var anchorNode = boot.anchor("restart","Start Over","primary","index.html");
    buttonSectionNode.appendChild(anchorNode);

    var resultsNode = document.getElementById("resultsPage");
    resultsNode.appendChild(headerNode);
    resultsNode.appendChild(summaryNode);
    resultsNode.appendChild(buttonSectionNode);
};

Quiz.prototype.calculateGrade = function () {
    var numQuestions = this.allQuestions.length;
    var numCorrect = 0;

    for (var i = 0; i < numQuestions; i++) {
        if (this.allQuestions[i].correctAnswer == this.allQuestions[i].answer) {
            numCorrect++;
        }
    }
    var grade = (numCorrect / numQuestions) * 100;

    return udf.math.precise_round(grade);
};