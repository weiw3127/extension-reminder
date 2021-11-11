console.log('CHECKING: extension ready to go');

//add all checking points here
const rightAnswer = {
  'MainTitle' : [
    "MainTitle-LevelOne0",
    "MainTitle-LevelOne1-LevelTwo0",
    "MainTitle-LevelOne1-LevelTwo1",

    "MainTitle-LevelOne2-LevelTwo0",
    "MainTitle-LevelOne2-LevelTwo1",
    "MainTitle-LevelOne2-LevelTwo2",
    "MainTitle-LevelOne2-LevelTwo3",
    "MainTitle-LevelOne2-LevelTwo4-LevelThree0",
    "MainTitle-LevelOne2-LevelTwo4-LevelThree1",
    "MainTitle-LevelOne2-LevelTwo5-LevelThree0",
    "MainTitle-LevelOne2-LevelTwo6-LevelThree0",
    "MainTitle-LevelOne2-LevelTwo6-LevelThree1",

    "MainTitle-LevelOne3-LevelTwo0",
    "MainTitle-LevelOne3-LevelTwo1",
    "MainTitle-LevelOne3-LevelTwo2-LevelThree0",
    "MainTitle-LevelOne3-LevelTwo2-LevelThree1",
    "MainTitle-LevelOne3-LevelTwo2-LevelThree2",
    "MainTitle-LevelOne3-LevelTwo3-LevelThree0",
    "MainTitle-LevelOne3-LevelTwo3-LevelThree1",
    "MainTitle-LevelOne3-LevelTwo3-LevelThree2",
    "MainTitle-LevelOne3-LevelTwo3-LevelThree3",
    "MainTitle-LevelOne3-LevelTwo3-LevelThree4-LevelFour0",
    "MainTitle-LevelOne3-LevelTwo3-LevelThree4-LevelFour1",
    "MainTitle-LevelOne3-LevelTwo4-LevelThree0-LevelFour0",
    "MainTitle-LevelOne3-LevelTwo4-LevelThree1-LevelFour1",

    "MainTitle-LevelOne4-LevelTwo0-LevelThree0",
    "MainTitle-LevelOne4-LevelTwo0-LevelThree1",
    "MainTitle-LevelOne4-LevelTwo0-LevelThree2",
    "MainTitle-LevelOne4-LevelTwo0-LevelThree3",
    "MainTitle-LevelOne4-LevelTwo1-LevelThree0",
    "MainTitle-LevelOne4-LevelTwo1-LevelThree1",
    "MainTitle-LevelOne4-LevelTwo1-LevelThree2",
    "MainTitle-LevelOne4-LevelTwo1-LevelThree3",
    "MainTitle-LevelOne4-LevelTwo2-LevelThree0",
    "MainTitle-LevelOne4-LevelTwo2-LevelThree1",
    "MainTitle-LevelOne4-LevelTwo3-LevelThree0",
    "MainTitle-LevelOne4-LevelTwo3-LevelThree1",
    "MainTitle-LevelOne4-LevelTwo3-LevelThree2",
    "MainTitle-LevelOne4-LevelTwo3-LevelThree3",
    "MainTitle-LevelOne4-LevelTwo4-LevelThree0",
    "MainTitle-LevelOne4-LevelTwo4-LevelThree1"]
};

// checking point link; reference at header
const guidelineLink = {
  'MainTitle': 'checking_point_reference',
}

// change the data structure into tree form
//"MainTitle-LevelOne1-name", "MainTitle-LevelOne1-url"
const treeBuild = (resultArr) => {
  let treeResult = [];
  resultArr.reduce((outerDict, path) => {
      path.split('-').reduce((innerDict, name) => {
          let temp = (innerDict.children = innerDict.children || []).find(q => q.name === name);
          if (!temp) innerDict.children.push(temp = { name });
          return temp;
      }, outerDict);
      return outerDict;
  }, { children: treeResult });
  return treeResult
};

// helper function for hinterBuild; making the tree structure
const htmlBuild = (treeNode, path) => {
  let starterY = 0;
  for (each of treeNode){
    if(each.children){
      path += `<li><span class="caret" style="display:inline-block; transform:translateX(${starterY}px)">${each.name}</span>`
      path += `<ul class="nested" style="transform:translateX(${starterY+20}px)">`;
      path = htmlBuild(each.children, path);
    } else {
      path += `<li class='strike'>${each.name}</li>`
    }
  }
  path += '</ul></li>'
  return path;
}

// main function for building hinter div
const hinterBuild = (treeResult, thisSchema) => {
  let path = `<div id="mydivheader">
    <button onclick="document.querySelector('#hintDiv').remove()">
      <span aria-hidden="true">×</span>
    </button>
    <button id='guideline'>
      <a href='${thisSchema}' target="_blank" >guideline</a>
    </button>
  </div>
  <ul id="myUL">`
  let newPath = htmlBuild(treeResult, path);
  newPath = newPath.slice(0, -5)
  return newPath;
};

// insert tag
const insertScript = (elementType, elementId, elementInner) => {
  if (document.querySelector('#'+elementId)){
    document.querySelector('#'+elementId).remove();
  }
  let newElement = document.createElement(elementType);
  newElement.id = elementId;
  newElement.innerHTML = elementInner;
  document.body.append(newElement);
}

//JS to insert
const newScript = `document.querySelectorAll('.caret').forEach(item => {
  item.addEventListener('click', ()=>{
    item.parentElement.querySelector(".nested").classList.toggle("active");
    item.classList.toggle("caret-down");
  })
  item.click();
})

document.querySelectorAll('.strike').forEach(item => {
  item.addEventListener('click', ()=>{
    item.classList.toggle('strikethrough');
  })
});


//Make the DIV element draggagle:
dragElement(document.querySelector("#hintDiv"));

function dragElement(element){
let spot0 = 0, spot1 = 0, spot2 = 0, spot3 = 0;
element.onmousedown = dragAction;

function dragAction(e){
  e.preventDefault();
  spot2 = e.clientX;
  spot3 = e.clientY;
  document.onmouseup = stopDragging;
  document.onmousemove = elementMove;
}

function elementMove(e){
  e.preventDefault();
  spot0 = e.clientX - spot2;
  spot2 = e.clientX;
  spot1 = e.clientY - spot3;
  spot3 = e.clientY;
  element.style.top = (element.offsetTop + spot1) + "px";
  element.style.left = (element.offsetLeft + spot0) + "px";
}

function stopDragging(e){
  document.onmouseup = null;
  document.onmousemove = null;
}
}`

//stylesheet to insert
const styleSheet = `@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);

#hintDiv {
  z-index: 10000;
  font-family: 'Noto Sans TC', sans-serif;
  line-height: 1.8;
  position: absolute;
  width: 20%;
  min-width: 250px;
  box-sizing: border-box;
  height: 70vh;
  overflow-y: scroll;
}

#mydivheader {
  padding: 10px;
  cursor: move;
  z-index: 11000;
  background-color: #003049;
  color: #fff;
  position:sticky;
  top: 0;
}

#mydivheader button{
  padding: 5px;
  color: #003049;
  border: none;
  background-color: white;
}

#mydivheader button:first-child{
  position: relative;
  left: 2px;
}
#mydivheader button:last-child{
  position: absolute;
  right: 10px;
}
#mydivheader button:last-child a{
  text-decoration: none;
  color: #003049;
}

.caret {
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  color: #780000;
}

.caret::before {
  content: "▶";
  color: black;
  display: inline-block;
  margin: 0 6px;
  color: #780000;
}

.caret-down::before {
  transform: rotate(90deg);
}

.nested {
  display: none;
}

.active {
  display: block;
}

#hintDiv ul{
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#hintDiv ul li{
  border: 1px solid #ddd;
  margin-top: -1px; /* Prevent double borders */
  background-color: #fdf0d5;
  padding: 2px;
  font-size: 16px;
  color: #003049;
  display: block;
  position: relative;
}

#hintDiv ul li:hover {
  background-color: #eee;
}

.strikethrough {
  text-decoration: line-through;
  color: #003049;
}`

//main function right here; start after receiving message from background
const check = (message, sender, sendResponse) => {
    if(message.txt === "Hello"){
      const treeResult = treeBuild(rightAnswer['MainTitle']);
      const htmlPath = hinterBuild(treeResult, guidelineLink['MainTitle']);

      // insert the reminder
      insertScript('div', 'hintDiv', htmlPath);
      insertScript('script', 'drag', newScript);
      insertScript('style', 'hintCSS', styleSheet);
  }
}

chrome.runtime.onMessage.addListener(check);
