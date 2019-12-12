/**
 * 词库
 */
var words = [
    "1建设清洁美丽世界，习主席这些话字字珠玑",
    "1垃圾分类分出首饰",
    "1不和同事吃饭被批",
    "1秋瓷炫求婚于晓光",
    "1乐视体育被吊执照",
    "1言承旭拍片被围观",
    "1迪拜酋长王妃出逃",
    "1黄晓明辟谣离婚",
    "1基因编辑清除HIV",
    "1史上最贵离婚生效",
    "1上海下放户籍审批",
    "1河北高温红色预警",
    "1灵魂拷问，Monica真的18岁吗",
    "1成哥到底有几个女朋友",
    "1母驴为何半夜惨叫？老尼姑的门为何夜夜被敲？是人性的扭曲还是道德的沦丧？请看今晚焦点访谈——成哥的传奇人生",
];
var divTip = document.querySelector(".container .tip");
var ul = document.querySelector(".container .tip ul");
var txt = document.querySelector(".container input");
var chooseIndex = -1;

function showDivTip() {
    divTip.style.display = "block";
}

function hideDivTip() {
    divTip.style.display = "none";
}

function search() {
    var val = txt.value;
    if (!val) {
        hideDivTip();
        return;
    }
    var strs = words.filter(str => str.includes(val));
    if (strs.length === 0) {
        hideDivTip();
        return;
    }
    chooseIndex = -1;
    createLis(strs, val);
    showDivTip();
}

function createLis(strs, key) {
    var frag = document.createDocumentFragment();
    strs.forEach(item => {
        var li = document.createElement("li");
        li.title = item;
        li.innerHTML = item.replace(new RegExp(`${key}`, "g"), function ($) {
            return `<span class="key">${$}</span>`;
        });
        frag.appendChild(li);
    })
    ul.innerHTML = "";
    ul.appendChild(frag);
}

var timer;

txt.onfocus = search;

txt.oninput = function () {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(search, 500)
}

txt.onkeydown = function (e) {
    var len = ul.children.length;
    if (e.key === "ArrowDown") {
        chooseIndex++;
        if (chooseIndex > len - 1) {
            chooseIndex = len - 1;
        }
        setChoose();
        setScroll("down");
        return false;
    }
    else if (e.key === "ArrowUp") {
        chooseIndex--;
        if (chooseIndex < 0) {
            chooseIndex = 0;
        }
        setChoose();
        setScroll("up");
        return false;
    }
    else if (e.key === "Enter") {
        confirmIndex();
        return false;
    }
}

function confirmIndex() {
    var li = ul.children[chooseIndex];
    if (!li) {
        return;
    }
    txt.value = li.innerText;
    hideDivTip();
}

function setScroll(direction) {
    var li = ul.children[chooseIndex];
    if (direction === "down") {
        var visibleTop = li.offsetTop + li.clientHeight;
        if (visibleTop > 300) {
            divTip.scrollTop = visibleTop - 300;
        }
    }
    else {
        if (li.offsetTop - divTip.scrollTop < 0) {
            divTip.scrollTop = li.offsetTop;
        }
    }
}

function setChoose() {
    var li = ul.querySelector("li.hover")
    if (li) {
        li.classList.remove("hover");
    }
    li = ul.children[chooseIndex];
    li.classList.add("hover");
}

divTip.onmouseover = function (e) {
    if (e.target.tagName === "LI") {
        chooseIndex = Array.from(ul.children).indexOf(e.target);
        setChoose();
    }
}

divTip.onclick = function (e) {
    if (e.target.tagName === "LI") {
        confirmIndex();
    }
}

txt.onblur = function () {
    hideDivTip();
}