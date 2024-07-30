
    import { GameObject } from "./gameObject.js";
    
    // paper(t=1) => rock(t=2) => scissors(t=3) =>

    const startButton = document.getElementById("startButton");
    const slider = document.getElementById("slider");
    let getSliderVal = slider.value;

    const canvas = document.getElementById("mainCanvas");
    const ctx = canvas.getContext("2d");
    const deltaT = 100;
    const entities = [];
    const detectionR = 100;
    const conversionR = 30;

    let interval;

    slider.oninput = function() {
        sliderVal.innerHTML = this.value;
    }

    function startGame() {
        startButton.disabled = true;
        entities.length = 0;
        
        let numOfPlayers = slider.value;
        spawnPlayers(numOfPlayers);
        
        interval = setInterval(render, deltaT);
    }

    function spawnPlayers(players)
    {

        let n = players / 3;

        for(let i = 0; i < n; i++) {
            let tempObj = new GameObject(Math.random() * canvas.width, Math.random() * canvas.height, 1);
            entities.push(tempObj);
        }
        for(let j = 0; j < n; j++) {
            let tempObj = new GameObject(Math.random() * canvas.width, Math.random() * canvas.height, 2);
            entities.push(tempObj);
        }
        for(let k = 0; k < n; k++) {
            let tempObj = new GameObject(Math.random() * canvas.width, Math.random() * canvas.height, 3);
            entities.push(tempObj);
        }
    }

    function checkWin() {
        let msg;
        let paperWin = entities.every((i) => i.t == 1);
        let rockWin = entities.every((i) => i.t == 2);
        let scissorsWin = entities.every((i) => i.t == 3);

        if (paperWin == true) {
           return msg = "Paper";
        } else if (rockWin == true) {
           return msg = "rock";
        }else if (scissorsWin == true) {
           return msg = "Scissors"
        } else {
            return;
        }
    }

    function calcDistance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    function handleUpdate()
    {
        entities.forEach(function(e) {
            let targets = [];
            let threats = [];
            let currentTarget = undefined;
            let currentThreat = undefined;
            let d;
            let d1;
            let low = Number.POSITIVE_INFINITY;
            let ranX = Math.floor(Math.random() * canvas.width);
            let ranY = Math.floor(Math.random() * canvas.height);

            if (e.t == 1){
                targets = entities.filter((i) => i.t == 2);
                threats = entities.filter((j) => j.t == 3);
            }
            else if (e.t == 2) {
                targets = entities.filter((i) => i.t == 3);
                threats = entities.filter((j) => j.t == 1);
            }
            else if (e.t == 3) {
                targets = entities.filter((i) => i.t == 1);
                threats = entities.filter((j) => j.t == 2);
            }

            if (targets.length != 0) {
                for (var i = targets.length-1; i>=0; i--) {
                    d = calcDistance(e.x, e.y, targets[i].x, targets[i].y)

                    if (d < low) {
                        low = d;
                    }
                    if (d == low) {

                       currentTarget = targets[i];
                    }
                }
            } else {
                currentTarget = undefined;
            }

            if (threats.length !=0) {
                for (var i = threats.length-1; i>=0; i--) {
                    d1 = calcDistance(e.x, e.y, threats[i].x, threats[i].y)

                    if (d1 < low) {
                        low = d1;
                    }
                    if (d1 == low) {

                       currentThreat = threats[i];
                    }
                }
            } else {
                currentThreat = undefined;
            }


            if (currentThreat != undefined) {
                if (calcDistance(e.x, e.y, currentThreat.x, currentThreat.y) < detectionR) {
                    e.moveAway(currentThreat.x, currentThreat.y)
                }
            }
            if (currentTarget != undefined) {
                if (calcDistance(e.x, e.y, currentTarget.x, currentTarget.y) < detectionR) {
                        e.moveTowards(currentTarget.x, currentTarget.y)
        
                        if (calcDistance(e.x, e.y, currentTarget.x, currentTarget.y) < conversionR) {
                            currentTarget.t = e.t;
                        }
                }
                else {
                    e.moveTowards(ranX, ranY);
                }
            
            } else {
                e.moveTowards(ranX, ranY);
            }

            //console.log(e.t);
            //console.log(targets);
            //console.log(currentTarget);
            
            e.draw(ctx);
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16px serif'
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle"; 
        let winMsg = checkWin();

        handleUpdate();

        if(winMsg != undefined){
            ctx.font = '32px serif'
            ctx.fillStyle = "white";
            ctx.fillText(`${winMsg} Wins!`, canvas.width / 2, canvas.height / 2);
            startButton.disabled = false;
            clearInterval(interval);
        }
    }
    sliderVal.innerHTML = getSliderVal;
    
    startButton.addEventListener("click", startGame);
    




