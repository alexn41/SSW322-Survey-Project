var answers = [];
var state;

function headerload(){
    const element = document.getElementById("surveytakerheader")
    var surveys = 0

    if(surveys == 0){
        element.textContent = "There are no surveys to take. Try making or importing a survey!";
    } else {
        element.textContent = "Take a Survey"
    }
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
                if(segment[0].charAt(1) == "q") { // text input question
                    var number = document.createElement("label");
                    number.for = "#q"+count;
                    var text = document.createTextNode("Question "+count+": "+segment[1]);
                    number.appendChild(text);
                    form.appendChild(number);
                    form.appendChild(document.createElement("br"));

                    var question = document.createElement("input");
                    question.type = "text";
                    question.name = "#q"+count;
                    question.id = "#q"+count;
                    question.placeholder = "Enter Answer";
                    form.appendChild(question);
                    form.appendChild(document.createElement("br"))
                    break;
                }
                else { // answer
                    answers.push(segment[1])
                    form.appendChild(document.createElement("br"));
                    count++;
                    break;
                }
            case 4: // mult. question
                var number = document.createElement("label");
                number.for = "#q"+count;
                var text = document.createTextNode("Question "+count+": "+segment[1]);
                number.appendChild(text);
                form.appendChild(number);
                form.appendChild(document.createElement("br"));

                state = segment[0].charAt(3); // stores multiple choice or answer
                break;
            case 5: // mult. option
                if(state == "c") { //multiple choice option

                    var question = document.createElement("input");
                    question.type = "radio";
                    question.name = "#q"+count+"0";
                    question.id = "#q"+count+segment[0].charAt(4);
                    question.value = segment[1];
                    form.appendChild(question);

                    var number = document.createElement("label");
                    number.for = "#q"+count+segment[0].charAt(4);
                    var text = document.createTextNode(segment[1]);
                    number.appendChild(text);
                    form.appendChild(number);
                    form.appendChild(document.createElement("br"));
                    break;

                } else { //multiple answer option

                var question = document.createElement("input");
                question.type = "checkbox";
                question.name = "#q"+count+segment[0].charAt(4);
                question.id = "#q"+count+segment[0].charAt(4);
                question.value = segment[1];
                form.appendChild(question);

                var number = document.createElement("label");
                number.for = "#q"+count+segment[0].charAt(4);
                var text = document.createTextNode(segment[1]);
                number.appendChild(text);
                form.appendChild(number);
                form.appendChild(document.createElement("br"));

                break;

                }
            default:
                break;
        }
    }

    var submit = document.createElement("button");
    submit.type = "button";
    submit.innerText = "Submit Answers";
    submit.onclick = scoreForm;
    form.appendChild(submit);

}

function scoreForm() {

    var form = document.getElementById("form");
    var elements = form.children;
    for(let x=0;x<elements.length;x++) {

    }

    var score = document.getElementById("score");
    // score calculation would go here
    score.innerText = "Survey submitted!";

}