
    import { GameObject } from "./gameObject.js";
    
    // paper(t=1) => rock(t=2) => scissors(t=3) =>

    const startButton = document.getElementById("startButton");
    //document.getElementById("startButton").onclick = startGame();
    const slider = document.getElementById("slider");
    let getSliderVal = slider.value;

    const canvas = document.getElementById("mainCanvas");
    const ctx = canvas.getContext("2d");
    const deltaT = 100;
    const numOfPlayers = 30;
    const entities = [];
    const detectionR = 100;
    const conversionR = 30;

    let running = false;

    slider.oninput = function() {
        sliderVal.innerHTML = this.value;
    }

    function startGame() {
        startButton.disabled = true;
        spawnPlayers();
        setInterval(render, deltaT);
    }

    function spawnPlayers()
    {

        let n = numOfPlayers / 3;

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

    function calcDistance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    function handleUpdate()
    {
        entities.forEach(function(e) {
            let targets = [];
            let currentTarget = undefined;
            let d;
            let low = Number.POSITIVE_INFINITY;
            let ranX = Math.floor(Math.random() * canvas.width);
            let ranY = Math.floor(Math.random() * canvas.height);

            if (e.t == 1){
                targets = entities.filter((i) => i.t == 2);
            }
            else if (e.t == 2) {
                targets = entities.filter((i) => i.t == 3);
            }
            else if (e.t == 3) {
                targets = entities.filter((i) => i.t == 1);
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

            if (currentTarget != undefined) {
                if (calcDistance(e.x, e.y, currentTarget.x, currentTarget.y) < detectionR) {
                        e.moveTowards(currentTarget.x, currentTarget.y)
                        e.status = "attacking";
        
                        if (calcDistance(e.x, e.y, currentTarget.x, currentTarget.y) < conversionR) {
                            currentTarget.t = e.t;
                        }
                }
                else {
                    e.moveTowards(ranX, ranY);
                    e.status = "wandering";
                }
            
            } else {
                e.moveTowards(ranX, ranY);
                e.status = "wandering";
            }

            //console.log(e.t);
            //console.log(targets);
            //console.log(currentTarget);
            //console.log(e.status);
            
            e.draw(ctx);
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16px serif'
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle"; 

        handleUpdate();
    }
    sliderVal.innerHTML = getSliderVal;
    startButton.addEventListener("click", startGame);
    




