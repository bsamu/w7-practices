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

const inputElement = (type, name, label) => {
    return `
        <div>
            <label>${label}</label>
            <input type="${type}" name="${name}">
        </div>
    `
}
const selectElement = (type, name, label, selectOptions) => {
    let optionElements = "";
    for (const option of selectOptions) {
        optionElements += `
            <option>${option}</option>
        `;
    }
    return `
        <div>
            <label>${label}</label>
            <${type} name="${name}">
                ${optionElements}
            </${type}>
        </div>
    `
}

/*
const formElement = '<form id="form">' + inputElement("text", "firstName", "Keresztneved") + inputElement("file", "profilePicture", "Profilképed") + inputElement("email", "personalEmail", "Email címed") + inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni?") + inputElement("checkbox", "terms", "Elfogadod-e a felhasználási feltételeket?") + selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"]) + '<button>Ok</button>' + '</form>'
*/

const formElement = `
    <form id="form">
        ${inputElement("text", "firstName", "Keresztneved")}
        ${inputElement("file", "profilePicture", "Profilképed")}
        ${inputElement("email", "personalEmail", "Email címed")}
        ${inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni?")}
        ${inputElement("checkbox", "terms", "Elfogadod-e a felhasználási feltételeket?")}
        ${selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"])}
        <button>Ok</button>
    </form>
`;

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
}

function loadEvent() {
    const root = document.getElementById("root");
    root.insertAdjacentHTML("beforeend", formElement);
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