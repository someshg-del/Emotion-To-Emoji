prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'png',
    png_quality: 90
});
Webcam.attach('#camera');
camera = document.getElementById("camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("results").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}
console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/lV7WJaBkv/model.json", modelLoaded);

function modelLoaded() {
    console.log("model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction Is " + prediction_1;
    speak_data_2 = "and The second Prediction Is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "HAPPY") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if (results[0].label == "SAD") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if (results[0].label == "ANGRY") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }





        if (results[1].label == "HAPPY") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }

        if (results[1].label == "SAD") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }

        if (results[1].label == "ANGRY") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}