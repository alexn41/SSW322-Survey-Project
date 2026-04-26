var count = 1
var answers = 1

function addTextQuestion() {

    var form = document.getElementById("form");

    var number = document.createElement("label");
    var question = document.createElement("input");
    var answer = document.createElement("input");


    number.for = "#q"+count;
    var text = document.createTextNode("Question "+count);
    number.appendChild(text);

    question.type = "text";
    question.name = "#q"+count;
    question.id = "#q"+count;
    question.placeholder = "Enter Question";

    answer.type = "text";
    answer.name = "#a"+count;
    answer.id = "#a"+count;
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

    var form = document.getElementById("form");

    var options = document.getElementById("options");
    var n = options.value;

    var number = document.createElement("label");
    var question = document.createElement("input");
    var answer = document.createElement("input");

    number.for = "#q"+count;
    var text = document.createTextNode("Question "+count);
    number.appendChild(text);
    form.appendChild(number);
    form.appendChild(document.createElement("br"));

    question.type = "text";
    question.name = "#q"+count+"c";
    question.id = "#q"+count+"c";
    question.placeholder = "Enter Question";
    form.appendChild(question);
    form.appendChild(document.createElement("br"))

    for(let x=1;x<=n;x++) {
        var question = document.createElement("input");
        question.type = "text";
        question.name = "#q"+count+"-"+x;
        question.id = "#q"+count+"-"+x;
        question.placeholder = "Enter Option "+x;
        form.appendChild(question);
        form.appendChild(document.createElement("br"));
    }

    answer.type = "text";
    answer.name = "#a"+count;
    answer.id = "#a"+count;
    answer.placeholder = "Enter Answer";
    form.appendChild(answer);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    count++;
}

function addMultAnswerQuestion() {

    var form = document.getElementById("form");

    var options = document.getElementById("options");
    var n = options.value;

    var number = document.createElement("label");
    var question = document.createElement("input");
    var answer = document.createElement("input");

    number.for = "#q"+count;
    var text = document.createTextNode("Question "+count);
    number.appendChild(text);
    form.appendChild(number);
    form.appendChild(document.createElement("br"));

    question.type = "text";
    question.name = "#q"+count+"a";
    question.id = "#q"+count+"a";
    question.placeholder = "Enter Question";
    form.appendChild(question);
    form.appendChild(document.createElement("br"))

    for(let x=1;x<=n;x++) {
        var question = document.createElement("input");
        question.type = "text";
        question.name = "#q"+count+"-"+x;
        question.id = "#q"+count+"-"+x;
        question.placeholder = "Enter Option "+x;
        form.appendChild(question);
        form.appendChild(document.createElement("br"));
    }

    answer.type = "text";
    answer.name = "#a"+count;
    answer.id = "#a"+count;
    answer.placeholder = "Enter Answer";
    form.appendChild(answer);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    count++;
}

function toggleAnswers() {

    var form = document.getElementById("form");
    var elements = form.children;
    var toggle = document.getElementById("answers");
    var state = toggle.textContent;
    if (state == "Disable Answers") {
        answers = 0
        toggle.textContent = "Enable Answers"
    } else {
        answers = 1
        toggle.textContent = "Disable Answers"
    }

    for(let x=0;x<elements.length;x++) {
        if (answers == 0 && elements[x].name.charAt(1) == "a") {
            elements[x].hidden == true;
        } else if (answers == 0 && elements[x].name.charAt(1) == "a") {
            elements[x].hidden == false;
        }
    }

}

function processForm() {

    var form = document.getElementById("form");
    var elements = form.children;
    var data = [];

    for(let x=0;x<elements.length;x++) {
        if (elements[x].type == 'text') {
            data.push([elements[x].id, elements[x].value])
        }
    }

    var result = data.join('|')
    const blob = new Blob([result], {type: 'text/plain'});
    const anchor = document.createElement('a');

    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'survey.txt'; 
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(anchor.href);
}

function importForm() {

    var form = document.getElementById("form");
    var doc = document.getElementById("import");
    var text = String(doc.value);
    var data = text.split("|")
    var count = 1
    for(let s=0;s<data.length;s++) {
        var segment = data[s].split(",")
        switch(segment[0].length) {
            case 3: // text input question or any answer
                if(segment[0].charAt(1) == "q") {
                    var number = document.createElement("label");
                    number.for = "#q"+count;
                    var text = document.createTextNode("Question "+count);
                    number.appendChild(text);
                    form.appendChild(number);
                    form.appendChild(document.createElement("br"));

                    var question = document.createElement("input");
                    question.type = "text";
                    question.name = "#q"+count;
                    question.id = "#q"+count;
                    question.value = segment[1];
                    form.appendChild(question);
                    form.appendChild(document.createElement("br"))
                    break;
                }
                else {
                    var answer = document.createElement("input");
                    answer.type = "text";
                    answer.name = "#a"+count;
                    answer.id = "#a"+count;
                    answer.value = segment[1];
                    form.appendChild(answer);
                    form.appendChild(document.createElement("br"));
                    form.appendChild(document.createElement("br"));
                    count++;
                    break;
                }
            case 4: // mult. question
                var number = document.createElement("label");
                number.for = "#q"+count;
                var text = document.createTextNode("Question "+count);
                number.appendChild(text);
                form.appendChild(number);
                form.appendChild(document.createElement("br"));

                var question = document.createElement("input");
                question.type = "text";
                question.name = "#q"+count+segment[0].charAt(3);
                question.id = "#q"+count+segment[0].charAt(3);
                question.value = segment[1];
                form.appendChild(question);
                form.appendChild(document.createElement("br"));
                break;
            case 5: // mult. option
                var question = document.createElement("input");
                question.type = "text";
                question.name = "#q"+count+segment[0].charAt(4);
                question.id = "#q"+count+segment[0].charAt(4);
                question.value = segment[1];
                form.appendChild(question);
                form.appendChild(document.createElement("br"));
                break;
            default:
                break;
        }
    }

    
}