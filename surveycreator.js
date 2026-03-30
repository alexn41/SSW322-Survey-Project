var count = 1

function addTextQuestion() {

    var form = document.getElementById("form");

    var number = document.createElement("label");
    var question = document.createElement("input");
    var answer = document.createElement("input");


    number.for = "q"+count;
    var text = document.createTextNode("Question "+count);
    number.appendChild(text);

    question.type = "text";
    question.name = "q"+count;
    question.id = "q"+count;
    question.placeholder = "Enter Question";

    answer.type = "text";
    answer.name = "a"+count;
    answer.id = "a"+count;
    answer.placeholder = "Enter Answer";

    form.appendChild(number);
    form.appendChild(document.createElement("br"));
    form.appendChild(question);
    form.appendChild(document.createElement("br"));
    form.appendChild(answer);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    count++;
}

function addMultChoiceQuestion() {

    var options = document.getElementById("options");
    var n = options.value;

    var number = document.createElement("label");
    var question = document.createElement("input");
    var answer = document.createElement("input");

    number.for = "q"+count;
    var text = document.createTextNode("Question "+count);
    number.appendChild(text);
    form.appendChild(number);
    form.appendChild(document.createElement("br"));

    question.type = "text";
    question.name = "q"+count;
    question.id = "q"+count;
    question.placeholder = "Enter Question";
    form.appendChild(question);
    form.appendChild(document.createElement("br"))

    for(let x=1;x<=n;x++) {
        var question = document.createElement("input");
        question.type = "text";
        question.name = "q"+count+"-"+x;
        question.id = "q"+count+"-"+x;
        question.placeholder = "Enter Option "+x;
        form.appendChild(question);
        form.appendChild(document.createElement("br"));
    }

    answer.type = "text";
    answer.name = "a"+count;
    answer.id = "a"+count;
    answer.placeholder = "Enter Answer";
    form.appendChild(answer);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    count++;
}

function addMultAnswerQuestion() {

    var options = document.getElementById("options");
    var n = options.value;

    var number = document.createElement("label");
    var answer = document.createElement("input");

    number.for = "q"+count;
    var text = document.createTextNode("Question "+count);
    number.appendChild(text);
    form.appendChild(number);
    form.appendChild(document.createElement("br"));

    question.type = "text";
    question.name = "q"+count;
    question.id = "q"+count;
    question.placeholder = "Enter Question";
    form.appendChild(question);
    form.appendChild(document.createElement("br"))

    for(let x=1;x<=n;x++) {
        var question = document.createElement("input");
        question.type = "text";
        question.name = "q"+count+"-"+x;
        question.id = "q"+count+"-"+x;
        question.placeholder = "Enter Option "+x;
        form.appendChild(question);
        form.appendChild(document.createElement("br"));
    }

    answer.type = "text";
    answer.name = "a"+count;
    answer.id = "a"+count;
    answer.placeholder = "Enter Answer";
    form.appendChild(answer);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    count++;
}