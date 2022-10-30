"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchBar = document.querySelector("input");
const listContain = document.querySelector(".listContain");
const unorderedList = document.querySelector('ul');
const message = document.querySelector(".message");
message.textContent = "Loading";
function displayItems(data) {
    unorderedList.innerHTML = "";
    data.forEach((element) => {
        const listItem = document.createElement('li');
        listItem.textContent = element.name;
        unorderedList.appendChild(listItem);
    });
}
function filterItems(data) {
    return data.filter((element) => {
        return (element.name.toLowerCase().includes(searchBar.value.toLowerCase()));
    });
}
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('https://hp-api.herokuapp.com/api/characters');
            const data = yield res.json();
            message.textContent = "";
            displayItems(data);
            searchBar.addEventListener("keyup", (e) => {
                const filtered = filterItems(data);
                displayItems(filtered);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
getData();
