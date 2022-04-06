let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let chim = new Image();
let nen = new Image();
let san = new Image();
let ongtren = new Image();
let ongduoi = new Image();

chim.src = "hinhanh/chim.png";
nen.src = "hinhanh/nen.png";
san.src = "hinhanh/san.png";
ongtren.src = "hinhanh/ongtren.png";
ongduoi.src = "hinhanh/ongduoi.png";

let bay = new Audio();
let diem = new Audio();

bay.src = "music/bay.mp3";
diem.src = "music/diem.mp3";

let khoangcach = 120;
let constant;
let cX = 15;
let cY = 160;
let roi = 1.8;
let score = 0;

document.addEventListener("keydown", moveUp);
function moveUp() {
    cY -= 25;
    bay.play();
}
let ong = [];
ong[0] = {
    x: cvs.width,
    y: 0
};
function draw() {
    ctx.drawImage(nen, 0, 0);
    for (var i = 0; i < ong.length; i++) {
        constant = ongtren.height + khoangcach;
        ctx.drawImage(ongtren, ong[i].x, ong[i].y);
        ctx.drawImage(ongduoi, ong[i].x, ong[i].y + constant);
        ong[i].x--;
        if (ong[i].x == 125) {
            ong.push({
                x: cvs.width,
                y: Math.floor(Math.random() * ongtren.height) - ongtren.height
            });
        }
        if (cX + chim.width >= ong[i].x && cX <= ong[i].x + ongtren.width && (cY <= ong[i].y + ongtren.height || cY + chim.height >= ong[i].y + constant) || cY + chim.height >= cvs.height - san.height) {
            location.reload();
        }
        if (ong[i].x == 5) {
            score++;
            diem.play();
        }
    }
    ctx.drawImage(san, 0, cvs.height - san.height);
    ctx.drawImage(chim, cX, cY);
    cY += roi;
    ctx.fillStyle = "#000";
    ctx.font = "30px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}
draw();