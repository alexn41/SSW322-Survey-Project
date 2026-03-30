var count = 1

function addTextQuestion() {

    var form = document.getElementById("form");

    var number = document.createElement("label");
    var question = document.createElement("input");
    var answer = document.createElement("input");


    number.for = "q"+count;
    var text = document.createTextNode("Question "+count);
    number.appendChild(text)

    question.type = "text";
    question.name = "q"+count;
    question.id = "q"+count;
    question.placeholder = "Enter Question";

    answer.type = "text";
    answer.name = "a"+count;
    answer.name = "a"+count;
    answer.placeholder = "Enter Answer";

    form.appendChild(number);
    form.appendChild(document.createElement("br"));
    form.appendChild(question);
    form.appendChild(document.createElement("br"));
    form.appendChild(answer);

    // Optional: Add a line break for better formatting
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    count++;
}

function addMultChoiceQuestion() {
    // 1. Get the container element where the new input will be added
    var form = document.getElementById("form");

    // 2. Create a new <input> element
    var question = document.createElement("input");
    var answer = document.createElement("input");

    // 3. Set the attributes for the input element
    question.type = "text";
    question.name = "dynamicInput[]";
    question.placeholder = "Enter Question";

    answer.type = "text";
    answer.name = "dynamicInput[]";
    answer.placeholder = "Enter Answer";

    // 4. Append the new input element to the container
    form.appendChild(question);
    form.appendChild(answer);

    // Optional: Add a line break for better formatting
    form.appendChild(document.createElement("br"));
    count++;
}

function addMultAnswerQuestion() {
        // 1. Get the container element where the new input will be added
    var container = document.getElementById("container");

    // 2. Create a new <input> element
    var input = document.createElement("input");

    // 3. Set the attributes for the input element
    input.type = "text"; // Specifies it's a text input box
    input.name = "dynamicInput[]"; // Assigns a name for form submission
    input.placeholder = "Enter text"; // Adds a placeholder
    // You can add other attributes like id, class, etc.
    // input.className = "my-class";

    // 4. Append the new input element to the container
    container.appendChild(input);

    // Optional: Add a line break for better formatting
    container.appendChild(document.createElement("br"));
}