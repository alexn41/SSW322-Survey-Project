var count = 1
var answers = 1
var key = "wenew"

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

    console.log("a")

    for(let x=0;x<elements.length;x++) {
        if (elements[x].name.charAt(1) == "a") {
            console.log(elements[x].name)
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
    var encrypted = encrypt(result, key)
    const blob = new Blob([encrypted], {type: 'text/plain'});
    const anchor = document.createElement('a');

    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'survey.txt'; 
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(anchor.href);
}

function encrypt(text, key) {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const textChar = text.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);

    // Shift character code and wrap within Unicode range
    const encryptedChar = (textChar + keyChar) % 65535;

    result += String.fromCharCode(encryptedChar);
  }

  // Encode to base64 for safe transport
  return btoa(result);
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

function importForm() {

    var form = document.getElementById("form");
    var doc = document.getElementById("import");
    var evil_text = String(doc.value);
    console.log(evil_text)
    if(evil_text.length == 0) {
        return;
    }
    var text = decrypt(evil_text, key)
    form.replaceChildren();
    var data = text.split("|")
    var count = 1
    for(let s=0;s<data.length;s++) {
        var segment = data[s].split(",")
        var true_len = segment[0].length - String(count).length
        switch(true_len) {
            case 2: // text input question or any answer
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
            case 3: // mult. question
                var number = document.createElement("label");
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
}