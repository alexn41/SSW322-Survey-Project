function headerload(){
    const element = document.getElementById("surveytakerheader")
    var surveys = 0

    if(surveys == 0){
        element.textContent = "There are no surveys to take. Try making or importing a survey!";
    } else {
        element.textContent = "Take a Survey"
    }
}
