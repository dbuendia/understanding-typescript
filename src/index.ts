console.log("Index.ts")

// Number, String, Boolean
// En estos ejemplos el tipo se podría inferir
let sales: number = 123_456_789;
let course: string = 'TypeScript';
let is_published: boolean = true;

// Any
let level; // Ts infiere que es de tipo any y se podría cambiar de tipo, aunque no es una buena práctica
level = 1;
level = "a";

// Si no le ponemos el tipo al argumento, ts se quejará (a no ser que en tscondig.json pongamos  "noImplicitAny": false)
// Si le ponemos :any al documento, permitimos el tipo any en la función, pero no es una buena práctica
function render(document: any) {
    console.log(document);
}

// Arrays
let numbers: number[] = [1, 2, 3]; // Se podría inferir
let array = []; // Así type is Any Array, pero no dejará que los elementos que se introduzcan sean de distinto tipo:
numbers[0] = 1; // Se convierte en array de números
// numbers[1] = true; // Lanzará error

// Tuples
// Fixed length array where each element has a particular type
// Se suelen usar en key value pairs.
let user: [number, string] = [1, "Daniel"]

// Enums
// Grouped constants

// Por defecto ts asigna 0 al primer valor, luego 1, etc. A no ser que seamos más explícitos:
// Aquí: Medium es 2, Large 3, etc.
const enum Size { Small = 1, Medium, Large };

let mySize: Size = Size.Medium;
console.log(mySize); // 2

// Functions

// Si no especificamos el return el tipo se inferirá, pero es mejor definirlo:
function calculateTax (income: number, year?: number): number {
    // 3. Pero si no le damos un valor default a year, dará un error, ya que podría ser undefined:
    // 4. Para ello se pone entre paréntesis (param || default)
    if ((year || 3000) < 2023) {
        return income * 2;
    }
    return income;
}

// 1. Solo podremos pasar el número de parámetros que hayamos especificado
// 2. A no ser que hagamos el parámetro opcional con ?
calculateTax(1);
// calculateTax(1000, "Hola");
// calculateTax(1000);

// 5. Otra opción es darle el default en la lista de argumentos
function calculateTax2 (income = 100): number {
    return income * 2;
}

calculateTax2(); // 6. No da error porque income es opcional y si no lo pasamos tendrá valor de 100

// Objects

let employeeTest = { id: 1 } // ts infiere que el objeto es tal cual lo hayamos definido aquí
// employeeTest.name = "Daniel"; // No podemos asignar nuevas propiedades a un objeto

let employee1: {
    readonly id: number, // Esta propiedad no se podrá reasignar
    name: string,
    fax?: number // Propiedad opcional
    retire: ((date: Date) => void) // Función que no devolverá nada
    } = { id: 1, name: "Daniel", retire: (date: Date) =>{
        console.log(date);
    }}

    // employee.id = 3; // No se puede reasignar

// Type Aliases
// Permite definir un tipo custom

type Employee = {
    // Métodos que un employee debería tener
    // Si tenemos que crear otros empleados no tendremos que duplicar las tipos
    readonly id: number,
    name: string,
    // Los objetos se pueden anidar
    details: {
        details: string,
        moreDetails: string
    }
}

let employee: Employee = {
    id: 1,
    name: "Javi",
    details: {
        details: "A detail",
        moreDetails: "Another detail"
    }
}

// Union Types

// We can give a variable or param more than one type

function peso(weight: number | string): number {
    // Narrowing:
    if (typeof weight === 'number') {
        return weight;
    } else {
        // Si es un string lo pasamos a number, porque es lo que devuelve la función
        return parseInt(weight);
    }
}

peso(10);
peso("10");

// Intersection Types

// Combinar varios tipos

// 1. Se define un tipo
type Draggable = {
    drag: () => void
};

// 2. Otro tipo
type Resizable = {
    resize: () => void
};

// 3. Creamos un nuevo tipo que combina los dos
type UIWidget = Draggable & Resizable;

// Al crear un objeto de ese tipo tendremos que tener los métodos de ambos.
let textBox: UIWidget = {
    drag: () => { console.log("Drag") },
    resize: () => { console.log("Rezie") }
}
// Literal Types (Exact or specific value)

let one: 1 = 1; // Definimos el tipo 1. Quality sólo podrá ser 1.
let twoOrThree: 2 | 3 = 3; // Quality sólo podrá ser 2 o 3

// También podemos crear un custom alias con los valores posibles, para no hardcodearlos cada vez
type Quantity = 50 | 100;
let quantity: Quantity = 100;

// Nullable Types

function greetTest(name: string) {
    console.log(name.toUpperCase());
}

// No podemos llamar a nuestra función con un valor null o undefined
// greetTest(null);

function greet(name: string | null | undefined) {
    if (name) {
    console.log(name.toUpperCase());
    } else {
        console.log("Hola!")
    }
}

// Optional Property Access Operator 

// Dado un alias:
type Customer = {
    birthday: Date
};

// Dada una función:
// Puede devolver null o un Customer
function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null : { birthday: new Date() }
}

let customer = getCustomer(0); // customer nos devuelve null
// Si intentamos acceder a la propiedad birthday, customer podría ser null, por lo que da error:
// console.log(customer.birthday);
// Tenemos que hacer que sea opcional
console.log(customer?.birthday);


// Optional Element Access Operator
// Useful with arrays

// En lugar de:
// if (customers !== null && customers !== undefined) { customer.[0] }

// Directamente podemos decir:
// customer?.[0]

// Optional call to function

// Imaginemos una función que puede ser cualquier tipo como:
let log: any = (message: string) => console.log(message);

// Si log es null:
log = null;

// Esto fallaría porque log no es una función:
// log("Hola");

// Podemos hacer la llamada opcional en caso de que lo no sea null:
log?.("Hola!");