"use strict";
console.log("Index.ts");
let sales = 123456789;
let course = 'TypeScript';
let is_published = true;
let level;
level = 1;
level = "a";
function render(document) {
    console.log(document);
}
let numbers = [1, 2, 3];
let array = [];
numbers[0] = 1;
let user = [1, "Daniel"];
;
let mySize = 2;
console.log(mySize);
function calculateTax(income, year) {
    if ((year || 3000) < 2023) {
        return income * 2;
    }
    return income;
}
calculateTax(1);
function calculateTax2(income = 100) {
    return income * 2;
}
calculateTax2();
let employeeTest = { id: 1 };
let employee1 = { id: 1, name: "Daniel", retire: (date) => {
        console.log(date);
    } };
let employee = {
    id: 1,
    name: "Javi",
    details: {
        details: "A detail",
        moreDetails: "Another detail"
    }
};
function peso(weight) {
    if (typeof weight === 'number') {
        return weight;
    }
    else {
        return parseInt(weight);
    }
}
peso(10);
peso("10");
let textBox = {
    drag: () => { console.log("Drag"); },
    resize: () => { console.log("Rezie"); }
};
let one = 1;
let twoOrThree = 3;
let quantity = 100;
function greetTest(name) {
    console.log(name.toUpperCase());
}
function greet(name) {
    if (name) {
        console.log(name.toUpperCase());
    }
    else {
        console.log("Hola!");
    }
}
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(0);
console.log(customer === null || customer === void 0 ? void 0 : customer.birthday);
let log = (message) => console.log(message);
log === null || log === void 0 ? void 0 : log("Hola!");
//# sourceMappingURL=index.js.map