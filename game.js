let level1 = [
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
]

let level2 = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1]
]
//0 for the wall,1 is space, 2 is rat and 3 is food

let maze_array = level1;
let Level = document.getElementById("level_select");
let maze = document.getElementById("maze-container")
let rat = document.getElementById("rat")
let food = document.getElementById("food")

Level.addEventListener("change", function () {
    let level = Level.value;
    if (level == 1) maze_array = level1;
    if (level == 2) maze_array = level2;

    console.log(level)

    maze.innerHTML = `
    <img src="rat.png" id="rat" width="40px" height="40px">
    <img src="food.png" id="food" width="40px" height="40px">
    `
    
    createMaze();
});





function setRatPosition(x, y) {
    rat.style.top = x + "px";
    rat.style.left = y + "px";
}

function setFoodPosition(x, y, position) {
    food.style.bottom = x + "px"
    if (position == "right") food.style.left = y + "px";
    else food.style.left = y + "px";
}

function createMaze() {

    for (let i = 0; i < maze_array.length; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < maze_array[i].length; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            if (maze_array[i][j] == 0) cell.classList.add("wall");
            if (i == 0 && j == 0) maze_array[i][j] = 2

            row.appendChild(cell);
        }
        maze.appendChild(row);

    }


}

function getRatPosition() {
    let position = [-1, -1]
    for (let i = 0; i < maze_array.length; i++) {

        for (let j = 0; j < maze_array[i].length; j++) {
            if (maze_array[i][j] == 2) { position[0] = i; position[1] = j; }
        }

    }
    console.log(position);
    return position;
}

document.addEventListener("keydown", function (e) {
    let rat = document.getElementById("rat")
    let food = document.getElementById("food")
    let ratleft = rat.offsetLeft;
    let ratTop = rat.offsetTop;
    let foodleft = food.offsetLeft;
    let foodTop = food.offsetTop;
    let ratPosition = getRatPosition();

    if (e.key == "ArrowRight"
        && ratleft < (maze_array.length - 1) * 40
        && maze_array[ratPosition[0]][ratPosition[1] + 1] == 1
    ) {
        ratleft += 40;
        rat.style.left = ratleft + "px"
        maze_array[ratPosition[0]][ratPosition[1]] = 1
        maze_array[ratPosition[0]][ratPosition[1] + 1] = 2

    };

    if (e.key == "ArrowLeft"
        && ratleft > 0
        & maze_array[ratPosition[0]][ratPosition[1] - 1] == 1
    ) {
        ratleft -= 40;
        rat.style.left = ratleft + "px"
        maze_array[ratPosition[0]][ratPosition[1]] = 1
        maze_array[ratPosition[0]][ratPosition[1] - 1] = 2

    };

    if (e.key == "ArrowUp"
        && ratTop > 0
        && maze_array[ratPosition[0] - 1][ratPosition[1]] == 1
    ) {
        ratTop -= 40;
        rat.style.top = ratTop + "px"
        maze_array[ratPosition[0]][ratPosition[1]] = 1
        maze_array[ratPosition[0] - 1][ratPosition[1]] = 2
    };

    if (e.key == "ArrowDown"
        && ratTop < (maze_array.length - 1) * 40
        && maze_array[ratPosition[0] + 1][ratPosition[1]] == 1
    ) {
        ratTop += 40;
        rat.style.top = ratTop + "px"
        maze_array[ratPosition[0]][ratPosition[1]] = 1
        maze_array[ratPosition[0] + 1][ratPosition[1]] = 2
    };

    if (ratleft == foodleft && ratTop == foodTop) alert("You win")

    console.log(ratPosition[1])
    console.log(maze_array)

})