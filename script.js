const canvas = document.querySelector('.canvas');

//Grid Slider Implementation
const gridSizeSelector = document.querySelector('.gridSlider')
gridSizeSelector.addEventListener('change', createGrid)

//Buttons 
const resetBtn = document.querySelector('.resetBtn')
resetBtn.addEventListener('click', resetCanvas)

const gridBtn = document.querySelector('.gridBtn');
gridBtn.addEventListener('click', gridLines);

const colorPicker = document.querySelector('.colorPickerBtn');
colorPicker.addEventListener('change', selectColor);

const randomColorBtn = document.querySelector('.randomColorBtn'); 
randomColorBtn.addEventListener('click', getRandomColor);

const graidentBtn = document.querySelector('.gradientBtn')
graidentBtn.addEventListener('click', applyGradient)

const eraserBtn = document.querySelector('.eraserBtn')
eraserBtn.addEventListener('click', erase)


//Function to Create the Grid 
function createGrid() {
    //reset canvas 
    canvas.innerHTML= '';
    //create new grid based on Slider Value 
    const gridSlider = document.querySelector('.gridSlider');
    const grideSliderText = document.querySelector('#gridSizeText');
    grideSliderText.innerText = gridSlider.value; 
    const gridSize = gridSlider.value; 
    const pixelsPerRow = gridSize; 
    let totalPixels = gridSize * gridSize;
   for (i = 0; i < totalPixels ; i++){
//Create a Div Element 
const newPixel = document.createElement('div'); 
//Modify Class Name 
newPixel.className = 'drawingPixel'
// Append the newPixel to displayGrid 
canvas.appendChild(newPixel); 
// Set Pixel width and height 
newPixel.style.width = (800/ `${pixelsPerRow}`) + "px"
newPixel.style.height = (800/ `${pixelsPerRow}`) + "px"
newPixel.style.backgroundColor = "#FFFFFF"
// Add Event Listener for BOTH mousedown and mouseover IF mousebutton is pressed
newPixel.addEventListener('mousedown', paint);
newPixel.addEventListener('mouseover', e => {
    if (e.buttons == 1) paint(e);
})};
}

//Toggle Grid lines 
let gridToggle = "active"

function gridLines (){
    if (gridToggle === "active"){
    let gridLines = document.querySelectorAll('.drawingPixel');
        for(grid of gridLines){
            grid.className = "drawingPixel-gridOff"; 
        } gridToggle = "inactive";
    } else if (gridToggle === "inactive"){
        let gridLines = document.querySelectorAll('.drawingPixel-gridOff');
        for(grid of gridLines){
                  grid.className = "drawingPixel"; 
            } gridToggle = "active";
        };
}

// Intialize Toggles

let selectColorToggle; 
let randomColorToggle; 
let gradientToggle; 
let eraserToggle; 

// GET Random Color 
function getRandomColor(){
    let range = "0123456789ABCDEF"
    let color = "#"
    for( let i = 0; i < 6; i++){
      color += range[Math.floor(Math.random() * 16)]; 
    }
    selectColorToggle = "inactive"; 
    randomColorToggle = "active"; 
    gradientToggle = "inactive";
    eraserToggle = "inactive";
    return color;   
}

// APPLY Gradient which increases when overlapped

let currentOpacity = ''

function applyGradient(e){
    //TOGGLE gradient style function 
    gradientToggle = "active"
    selectColorToggle = "inactive"; 
    randomColorToggle = "inactive"; 
    eraserToggle = "inactive"
    
   // CONFIRM that the target is a drawingPixel
    if (e.target.className === "drawingPixel" || e.target.className === "drawingPixel-gridOff"){
        //SET current targets opacity value to a variable 
        if (currentOpacity === '' || e.target.style.opacity === ''){
            currentOpacity = 10
            e.target.style.opacity = currentOpacity * .01;
        } else if(currentOpacity >= 10 && currentOpacity <= 100){
            //SET Tracker based on the the targets current opacity value 
            opacityTracker = e.target.style.opacity * 100;
            // MODIFY the current Opacity Variable via the Opacity Tracker and increment it's by 10
            currentOpacity = opacityTracker + 10;
            e.target.style.opacity = currentOpacity * .01;
        }}; 
}

// SELECT Color 
let selectedColor;  

function selectColor(){
    selectedColor = colorPicker.value; 
    selectColorToggle = "active"; 
    randomColorToggle = "inactive"; 
    gradientToggle = "inactive";
    eraserToggle = "inactive";
    return selectedColor; 
}


//Eraser Function  
function erase() {
    eraserToggle = "active";
    selectColorToggle = "inactive"; 
    randomColorToggle = "inactive"; 
    gradientToggle = "inactive";  
}


//Apply/Paint Colour Selection 

function paint(e) {
    if(selectColorToggle === "active"){
    e.target.style.backgroundColor = selectedColor;
    e.target.style.opacity = '';    
    } else if(randomColorToggle === "active"){
        e.target.style.backgroundColor = getRandomColor();
        e.target.style.opacity = '';    
    } else if (gradientToggle === "active"){
        e.target.style.backgroundColor = "#000000";
        applyGradient(e);
     } else if(eraserToggle === "active"){
        e.target.style.backgroundColor = "#FFFFFF"; 
        e.target.style.opacity = ''; 
     }
       else {
        e.target.style.backgroundColor = "#000000"; 
    }
}


//Reset Canvas Function 
function resetCanvas(){
    createGrid();
}

createGrid()

