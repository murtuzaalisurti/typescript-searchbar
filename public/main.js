"use strict";
const body = document.querySelector("body");
const searchBar = document.querySelector("input");
const apiDataListContain = document.createElement("div");
const newList = document.createElement('ul');
apiDataListContain.textContent = "Loading";
body.appendChild(apiDataListContain);
searchBar.addEventListener("keyup", (e) => {
    console.log(searchBar.value);
});
fetch('https://hp-api.herokuapp.com/api/characters').then((res) => {
    return res.json();
}).then((data) => {
    apiDataListContain.textContent = "";
    data.forEach((element) => {
        const listItem = document.createElement('li');
        listItem.textContent = element.name;
        newList.appendChild(listItem);
    });
    apiDataListContain.appendChild(newList);
});
