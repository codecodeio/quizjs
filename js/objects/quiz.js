"use strict";//enable strict mode (ECMAScript 5)

function Quiz() {
    MasterBean.call(this, arguments);

    //Public Variables
    this.currentQuestion = 0;

    this.allQuestions = [];
}
app.inheritPrototype(Quiz, MasterBean);

Quiz.prototype.incrementCurrentQuestion = function () {
    this.currentQuestion++;
};
Quiz.prototype.decrementCurrentQuestion = function () {
    this.currentQuestion--;
};

Quiz.prototype.createQuestionPage = function(){
    
    var pageNode = window.setPage();

    if(this.allQuestions.length > 0){
        pageNode.on("click",this.eventHandler);

        this.allQuestions[this.currentQuestion].num = this.currentQuestion + 1;
        if(this.currentQuestion > 0){
            this.allQuestions[this.currentQuestion].displayBackButton = true;
        } else {
            this.allQuestions[this.currentQuestion].displayBackButton = false;
        }
        Handlebars.registerHelper("alreadySelected",function(idx){
            if(window.quiz.allQuestions[window.quiz.currentQuestion].answer == idx){
                return "checked";
            }
            else {
                return "";
            }
        });
        var context = this.allQuestions[this.currentQuestion];
        var rendered_html = render('question', context);
        window.loadPage(pageNode,rendered_html);
    }
    else {
        window.loadPage(pageNode,"Questions not available at this time :(");
    }
}

Quiz.prototype.createResultsPage = function(){
    
    var pageNode = window.setPage();
    var context = {grade: this.calculateGrade()};
    var rendered_html = render('results', context);
    window.loadPage(pageNode,rendered_html);
}

Quiz.prototype.eventHandler = function(){
    switch(event.target.id){
        case "choices-submit":
            event.preventDefault();
            
            var submitButtonNode = $(this).find("#choices-submit");
            var formNode = submitButtonNode.closest("form");
            var selectedNode = formNode.find("input:checked");
            var selected = selectedNode.val();
            var inputNodes = formNode.find("input");

            if(!selected){
                formNode.parent().find("#notice").remove();
                formNode.after('<p id="notice" class="text-danger">You must select an answer!</p>');
            }
            else {
                window.quiz.allQuestions[window.quiz.currentQuestion].answer = selected;
                formNode.parent().find("#notice").remove();

                var thisNode;
                inputNodes.each(function(){
                    thisNode = $(this);
                    thisNode.attr("disabled","disabled");
                    if(thisNode.val() == selected){
                        if(window.quiz.allQuestions[window.quiz.currentQuestion].correctAnswer == thisNode.val()){
                            selectedNode.closest("div").addClass("text-success");
                            formNode.parent().find("#notice").remove();
                            formNode.after('<p id="notice" class="text-success">Yay, that is correct :)</p>');
                            submitButtonNode.addClass("btn-success");
                        }
                        else {
                            selectedNode.closest("div").addClass("text-danger");
                            formNode.parent().find("#notice").remove();
                            formNode.after('<p id="notice" class="text-danger">Sorry, that is incorrect :(</p>');
                            submitButtonNode.addClass("btn-warning");
                        }
                    }
                });
                
                
                submitButtonNode.removeClass("btn-default");
                submitButtonNode.attr("id","choices-next");
                submitButtonNode.html("Continue");
            }
            break;
        case "choices-next":
            event.preventDefault();
            
            if (window.quiz.currentQuestion+1 < window.quiz.allQuestions.length) {
                window.quiz.incrementCurrentQuestion();
                window.quiz.createQuestionPage();

            } else {
                window.quiz.createResultsPage();
            }
            break;
        case "back-btn":
            event.preventDefault();
            
            if (window.quiz.currentQuestion > 0) {
                window.quiz.decrementCurrentQuestion();
                window.quiz.createQuestionPage();
            }
            break;
    }  
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
