song = "";
leftWristY = 0;
rightWristY = 0;
leftWristX = 0;
rightWristX = 0;
scoreLeftWrist = 0;
numberLeftWrist = 0;
removeDecimalLeftWrist = 0;
decibelVolume = 0;

scoreRightWrist = 0;
function setup() {
    canvas = createCanvas(500, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded");
}

function draw() {
    image(video, 0, 0, 500, 450);
    stroke('#FF0000');
    fill('#FF0000');
    if(scoreLeftWrist > 0.2) {
        numberLeftWrist = Number(leftWristY);
        removeDecimalLeftWrist = floor(numberLeftWrist);
        decibelVolume = removeDecimalLeftWrist / 500;
        song.setVolume(decibelVolume);
        document.getElementById("txtVolume").innerHTML = "Volume " + decibelVolume;
        circle(leftWristX, leftWristY, 20);
    }

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY , 20);
        if(rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            document.getElementById("txtSpeed").innerHTML = "Speed " + 0.5;
        }

        if(rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("txtSpeed").innerHTML = "Speed " + 1;
        }

        if(rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("txtSpeed").innerHTML = "Speed " + 1.5;
        }

        if(rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("txtSpeed").innerHTML = "Speed " + 2;
        }

        if(rightWristY > 400 && rightWristY <= 500) {
            song.rate(2.5);
            document.getElementById("txtSpeed").innerHTML = "Speed " + 2.5;
        }
    }

}

function preload() {
    song = loadSound('music.mp3');
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist Y = " + leftWristY + " " + "Right Wrist Y = " + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("Left Wrist X = " + leftWristX + " " + "Right Wrist X = " + rightWristX);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}