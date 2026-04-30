var answers = [];
var state;
var key = "wenew"
var count = 1;

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
    var evil_text = String(doc.value);
    if(evil_text.length == 0) {
        return;
    }
    var text = decrypt(evil_text, key)
    form.replaceChildren();
    var data = text.split("|")
    count = 1;
    for(let s=0;s<data.length;s++) {
        var segment = data[s].split(",")
        var true_len = segment[0].length - String(count).length
        switch(true_len) {
            case 2: // text input question or any answer
                if(segment[0].charAt(1) == "q") { // text input question
                    var number = document.createElement("label");
                    number.id = "#l"+count;
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
            case 3: // mult. question
                var number = document.createElement("label");
                number.id = "#l"+count;
                number.for = "#q"+count;
                var text = document.createTextNode("Question "+count+": "+segment[1]);
                number.appendChild(text);
                form.appendChild(number);
                form.appendChild(document.createElement("br"));

                state = segment[0].charAt(3); // stores multiple choice or answer
                break;
            case 4: // mult. option
                if(state == "c") { //multiple choice option

                    var question = document.createElement("input");
                    question.type = "radio";
                    question.name = "#q"+count+"x0";
                    question.id = "#q"+count+"x"+segment[0].charAt(4);
                    question.value = segment[1];
                    form.appendChild(question);

                    var number = document.createElement("label");
                    number.id = "#l"+count+"x"+segment[0].charAt(4);
                    number.for = "#q"+count+"x"+segment[0].charAt(4);
                    var text = document.createTextNode(segment[1]);
                    number.appendChild(text);
                    form.appendChild(number);
                    form.appendChild(document.createElement("br"));
                    break;

                } else { //multiple answer option

                var question = document.createElement("input");
                question.type = "checkbox";
                question.name = "#q"+count+"x"+segment[0].charAt(4);
                question.id = "#q"+count+"x"+segment[0].charAt(4);
                question.value = segment[1];
                form.appendChild(question);

                var number = document.createElement("label");
                number.id = "#l"+count+"x"+segment[0].charAt(4);
                number.for = "#q"+count+"x"+segment[0].charAt(4);
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
    console.log(form);
}

function decrypt(encodedText, key) {
  let text = atob(encodedText);
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const textChar = text.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);

    // Reverse the shift
    let decryptedChar = textChar - keyChar;
    if (decryptedChar < 0) decryptedChar += 65535;

    result += String.fromCharCode(decryptedChar);
  }

  return result;
}

function scoreForm() {

    var form = document.getElementById("form");
    var elements = form.children;
    var q_num = 1;
    var correct = 0;
    var response;
    var check = 0;
    var search;
    var lab;
    var ans_count = [];


    // if all answers are empty, skip scoring process
    for(let x=0;x<answers.length;x++) {
        if(answers[x] != "") {
            check += 1;
        }
    }
    if(check == 0) {
        var score = document.getElementById("score");
        score.innerText = "Survey submitted!";
        return;
    }

    // count how many inputs are in each question
    for(let x=0;x<elements.length;x++) {
        if(elements[x].tagName == "INPUT") {
            var h = elements[x].id.charAt(2);
            ans_count[h] += 1;
        }
    }

    // iterate through form, find each input and determine if the answer is correct
    for(let x=0;x<elements.length;x++) {
        if(elements[x].tagName == "INPUT") {
            switch(elements[x].type) {
                case "text": // text input question
                    response = elements[x].value;
                    search = "#l"+q_num;
                    console.log(search)
                    lab = document.getElementById(search);
                    if(answers[q_num-1] != "") {
                        if(response == answers[q_num-1]) {
                         correct += 1;
                            lab.textContent += " [O]"
                        } else {
                            lab.textContent += " [X]"
                        }
                    }
                    q_num++;
                    break;
                case "radio": // multiple choice question
                    if(elements[x].checked) {
                        search = "#l"+q_num+"x"+elements[x].id.charAt(4);
                        console.log(search)
                        lab = document.getElementById(search);
                        if(answers[q_num-1] != "") {
                            if(lab.textContent == answers[q_num-1]) {
                                correct += 1;
                                lab.textContent += " [O]"
                            } else {
                                lab.textContent += " [X]"
                            }
                        }
                    }
                    if(ans_count[q_num] <= 1) {
                        q_num++;
                    } else {
                        ans_count[q_num] -= 1;
                    }
                    break;
                case "checkbox": // multiple answer question
                    var mult_answers = answers[q_num-1].split(";")
                    search = "#l"+q_num+"x"+elements[x].id.charAt(4);
                    console.log(search)
                    lab = document.getElementById(search);
                    if(elements[x].checked) {
                        for(y=0;y<mult_answers.length;y++) {
                            if(lab.textContent == answers[q_num-1]) {
                            correct += (1/mult_answers.length);
                            lab.textContent += " [O]";
                            }
                        }
                    } else {
                        for(y=0;y<mult_answers.length;y++) {
                            lab.textContent += " [X]";
                        }
                    }
                    if(ans_count[q_num] <= 1) {
                        q_num++;
                    } else {
                        ans_count[q_num] -= 1;
                    }
                    break;
            }
        }
    }
    
    console.log("Correct: "+correct)
    console.log("Total: "+check)
    var final = (correct/check) * 100;
    final = final.toFixed(2);
    var score = document.getElementById("score");
    score.innerText = "Survey submitted! Your score is: "+final+"%";

}