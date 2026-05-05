let state;
let key = "wenew"
let count = 1;
let currentQuestion = null;
let currentType = null;

function headerload(){
    const element = document.getElementById("surveytakerheader")
    let surveys = 0

    if(surveys == 0){
        element.textContent = "There are no surveys to take. Try making or importing a survey!";
    } else {
        element.textContent = "Take a Survey"
    }
}

function importForm() {

    let form = document.getElementById("form");
    let doc = document.getElementById("import");
    let evil_text = String(doc.value);
    if(evil_text.length == 0) {
        return;
    }
    let text = decrypt(evil_text, key)
    form.replaceChildren();
    let data = text.split("|")
    count = 1;
    for(let s=0;s<data.length;s++) {
        let segment = data[s].split(",")
        let true_len = segment[0].length - String(count).length
        switch(true_len) {
            case 1: // text input question or any answer
                if(segment[0].charAt(0) == "q") { // text input question
                    let qDiv = document.createElement("div");
                    qDiv.classList.add("question");
                    qDiv.dataset.type = "text";

                    let number = document.createElement("label");
                    number.innerText = "Question " + count + ": " + segment[1];

                    qDiv.appendChild(number);
                    qDiv.appendChild(document.createElement("br"));

                    let question = document.createElement("input");
                    question.type = "text";
                    question.name = "q"+count;
                    question.id = "q"+count;

                    qDiv.appendChild(question);

                    form.appendChild(qDiv);

                    currentQuestion = qDiv;
                    currentType = "text";
                    break;
                }
                else { // answer
                    if (currentQuestion) {
                        currentQuestion.dataset.answer = segment[1];
                    }
                    count++;
                    form.appendChild(document.createElement("br"));
                    break;
                }
            case 2: // mult. question
                let qDiv = document.createElement("div");
                qDiv.classList.add("question");

                let number = document.createElement("label");
                number.innerText = "Question " + count + ": " + segment[1];

                qDiv.appendChild(number);
                qDiv.appendChild(document.createElement("br"));

                form.appendChild(qDiv);

                currentQuestion = qDiv;

                state = segment[0].charAt(2);

                if (state == "c") {
                    currentQuestion.dataset.type = "radio";
                } else {
                    currentQuestion.dataset.type = "checkbox";
                }
                form.appendChild(document.createElement("br"));
                break;
            case 3: // mult. option
                if(state == "c") { //multiple choice option

                    let question = document.createElement("input");
                    question.type = "radio";
                    question.name = "q"+count+"x0";
                    question.id = "q"+count+"x"+segment[0].charAt(3);
                    question.value = segment[1];
                    currentQuestion.appendChild(question);

                    let number = document.createElement("label");
                    number.id = "l"+count+"x"+segment[0].charAt(3);
                    number.for = "q"+count+"x"+segment[0].charAt(3);
                    let text = document.createTextNode(segment[1]);
                    number.appendChild(text);
                    currentQuestion.appendChild(number);
                    currentQuestion.appendChild(document.createElement("br"));
                    break;

                } else { //multiple answer option

                let question = document.createElement("input");
                question.type = "checkbox";
                question.name = "q"+count+"x"+segment[0].charAt(3);
                question.id = "q"+count+"x"+segment[0].charAt(3);
                question.value = segment[1];
                currentQuestion.appendChild(question);

                let number = document.createElement("label");
                number.id = "l"+count+"x"+segment[0].charAt(3);
                number.for = "q"+count+"x"+segment[0].charAt(3);
                let text = document.createTextNode(segment[1]);
                number.appendChild(text);
                currentQuestion.appendChild(number);
                currentQuestion.appendChild(document.createElement("br"));
                break;

                }
            default:
                break;
        }
    }

    let submit = document.createElement("button");
    submit.type = "button";
    submit.innerText = "Submit Answers";
    submit.onclick = gradeSurvey;
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

function gradeSurvey() {
  let questions = document.querySelectorAll(".question");
  let score = 0;

  questions.forEach(q => {
    let type = q.dataset.type;
    let correct = q.dataset.answer.trim();

    q.classList.remove("correct", "incorrect", "partial");

    let isCorrect = false;
    let isPartial = false;
    let questionScore = 0; // allows partial credit

    // --- TEXT ---
    if (type === "text") {
      let input = q.querySelector("input[type='text']");
      let user = input.value.trim().toLowerCase();

      if (user === correct.toLowerCase()) {
        isCorrect = true;
        questionScore = 1;
      }

      input.disabled = true;
    }

    // --- RADIO ---
    if (type === "radio") {
      let selected = q.querySelector("input[type='radio']:checked");

      if (selected && selected.value === correct) {
        isCorrect = true;
        questionScore = 1;
      }

      // disable all radios
      q.querySelectorAll("input[type='radio']").forEach(r => r.disabled = true);
    }

    // --- CHECKBOX (partial credit) ---
    if (type === "checkbox") {
      let selected = q.querySelectorAll("input[type='checkbox']:checked");
      let userAnswers = Array.from(selected).map(cb => cb.value);

      let correctAnswers = correct.split(";");

      let points = 0;

      // +1 for correct selections
      userAnswers.forEach(ans => {
        if (correctAnswers.includes(ans)) {
          points++;
        }
      });

      // Clamp to 0 minimum
      if (points < 0) points = 0;

      // Normalize (divide by total correct answers)
      questionScore = points / correctAnswers.length;

      // Fully correct?
      if (questionScore === 1) {
        isCorrect = true;
      } else if (questionScore > 0) {
        isPartial = true;
      }

      // disable all checkboxes
      q.querySelectorAll("input[type='checkbox']").forEach(cb => cb.disabled = true);
    }

    // Add to total score
    score += questionScore;

    // Visual feedback
    if (isCorrect) {
      q.classList.add("correct");
    } else if (isPartial) {
      q.classList.add("partial");
    } else {
      q.classList.add("incorrect");
    }
  });

  alert("Score: " + score.toFixed(2) + " / " + questions.length);
}