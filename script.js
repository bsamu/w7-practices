/*
function functionName(parameter) {
    parameter === "argumentum as a string";
}
functionName("argumentum as a string");


const argument = "argumentum as a string";

const functionName = function (parameter) {
    parameter === "argumentum as a string";
}
functionName(argument);

const functionName = () => {

}
functionName();
*/

const inputElement = (type, id, label, req = "") => {
    // console.log(req);
    return `
        <div class="${type}">
            <label for="${id}">${label}</label>
            <input type="${type}" id="${id}" name="${id}" ${req}>
        </div>
    `
}
const selectElement = (type, id, label, selectOptions) => {
    let optionElements = "";
    for (const option of selectOptions) {
        optionElements += `
            <option>${option}</option>
        `;
    }
    return `
        <div>
            <label>${label}</label>
            <${type} id="${id}" name="${id}">
                ${optionElements}
            </${type}>
        </div>
    `
}
const title = (titleOfForm) => {
    return `
        <h2>
            ${titleOfForm}
        </h2>
    `
}
/*
const formElement = '<form id="form">' + inputElement("text", "firstName", "Keresztneved") + inputElement("file", "profilePicture", "Profilképed") + inputElement("email", "personalEmail", "Email címed") + inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni?") + inputElement("checkbox", "terms", "Elfogadod-e a felhasználási feltételeket?") + selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"]) + '<button>Ok</button>' + '</form>'
*/

/*
const nameData = {
    type: "text",
    name: "firstName",
    label: "Keresztneved"
} //Így is lehet 1. inputElementet megadni
*/

const processCountries = async () => {
    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const countryArr = await countryRes.json();
    console.log(countryArr[0].name.official);
    // 1. Kell egy üres tömb
    let cOffNArr = [];
    // 2. for ciklussal végigmenni a countryArr-on és minden ország name.officialjét üres tömbbe rakni
    for (const iterator of countryArr) {
        const offName = iterator.name.official;
        cOffNArr.push(offName);
    }
    // for (let i = 0; i < countryArr.length; i++) {
    //     const element = countryArr[i];
    //     const offName = element.name.official;
    //     cOffNArr.push(offName);
    // }
    console.log(cOffNArr);
    // 3. returnolni a tömböt
    return cOffNArr;
    // 4. végeredmény: legördülő menüben országok listáját kapjuk
}

const temp = processCountries();
console.log(temp);
// processCountries();

// const anotherSelectFields = {
//     type: "select",
//     name: "countries",
//     label: "Ország",
//     options: ["Canada", "Jamaica"]
//     // options: processCountries()
//     // options: cOffNArr
// }

const anotherSelectFields = async () => {
    return {
        type: "select",
        name: "countries",
        label: "Ország",
        options: await processCountries()
    }
}

const anotherFormFields = [
    {
        type: "text",
        name: "street",
        label: "Közterület neve",
    },
    {
        type: "text",
        name: "houseNumber",
        label: "Házszám",
    },
    {
        type: "number",
        name: "zipCode",
        label: "Irányítószám",
    },
    {
        type: "text",
        name: "city",
        label: "Település neve",
    }
]

const selectFields = {
    type: "select",
    name: "where",
    label: "Hol hallottál rólunk?",
    options: ["internetről", "ismerőstől", "egyéb"]
};

const formFields = [
    {
        type: "text",
        name: "firstName",
        label: "Keresztneved"
    },
    {
        type: "file",
        name: "profilePicture",
        label: "Profilképed"
    },
    {
        type: "email",
        name: "personalEmail",
        label: "Email címed",
        required: "required"
    },
    {
        type: "checkbox",
        name: "newsletter",
        label: "Szeretnél-e hírlevelet kapni?"
    },
    {
        type: "checkbox",
        name: "terms",
        label: "Elfogadod-e a felhasználási feltételeket?"
    }
]

/*
const formElement = `
    <form id="form">
        ${title("Adatlap")}
        ${inputElement(nameData.type, nameData.name, nameData.label)}
        ${inputElement("file", "profilePicture", "Profilképed")}
        ${inputElement("email", "personalEmail", "Email címed", "required")}
        ${inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni?")}
        ${inputElement("checkbox", "terms", "Elfogadod-e a felhasználási feltételeket?")}
        ${selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"])}
        <button>Ok</button>
    </form>
`;
*/

const formElement = (ffs, id, sel) => {
    let toForm = "";
    for (const ff of ffs) {
        toForm += inputElement(ff.type, ff.name, ff.label, ff.required)
    }
    return `
    <form id="${id}">
        ${title("Adatlap")}
        ${toForm}
        ${selectElement(sel.type, sel.name, sel.label, sel.options)}
        <button id="gomb">Ok</button>
    </form>
`;
}

const formSubmit = (event) => {
    event.preventDefault();
    // console.log(event);
    const et = event.target;
    et.classList.add("submitted");
    const etValue = et.querySelector(`select[name="where"]`).value;
    console.log(etValue);
}

const inputEvent = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    // console.log(event);
    // const fName = document.getElementsByName("firstName")[0].name;
    const fName = document.querySelector(`input[name="firstName"]`);
    const tryForm = fName.closest("#form");
    // const tryForm = event.target.closest("#form"); //ua, mint felette sor
    console.log(tryForm);
    // console.log(fName);
    if (event.target.getAttribute("name") === "firstName") {
        document.getElementById("inputValueContent").innerHTML = event.target.value;
    }

    if (event.target.getAttribute("name") === "profilePicture") {
        console.log(event.target.files[0].name);

        const image = URL.createObjectURL(event.target.files[0]);
        document.getElementById("inputValueContent").insertAdjacentHTML("beforeend", `
        <img src="${image}">
        `);
        console.log(image);
    }
}

async function loadEvent() {
    const waitAnotherSelectFields = await anotherSelectFields();
    const root = document.getElementById("root");
    root.insertAdjacentHTML("beforeend", formElement(formFields, "form", selectFields));
    root.insertAdjacentHTML("beforeend", formElement(anotherFormFields, "form2", waitAnotherSelectFields));
    root.insertAdjacentHTML("beforeend", `
        <div id="inputValueContent"></div>
    `);

    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);

    const inputList = form.querySelectorAll("input");
    for (const input of inputList) {
        input.addEventListener("input", inputEvent)
    }
}

window.addEventListener("load", loadEvent);