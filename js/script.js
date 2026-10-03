// ============================================================
// 1. HTML elements ko variables me store karo
// ============================================================
const rawDataInput = document.getElementById("rawData");
const separateBtn = document.getElementById("separateBtn");
const sampleBtn = document.getElementById("sampleBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");
const message = document.getElementById("message");

const resultBody = document.getElementById("resultBody");
const nameList = document.getElementById("nameList");
const phoneList = document.getElementById("phoneList");
const emailList = document.getElementById("emailList");
const variableView = document.getElementById("variableView");

const totalCount = document.getElementById("totalCount");
const phoneCount = document.getElementById("phoneCount");
const emailCount = document.getElementById("emailCount");
const missingCount = document.getElementById("missingCount");

// ============================================================
// 2. Patterns (Regex) - inse email aur phone pehchante hain
// ============================================================
const EMAIL_PATTERN = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const PHONE_PATTERN = /\+?\d[\d\s()-]{8,}\d/;
const LABEL_PATTERN = /\b(name|naam|phone|mobile|mob|ph|contact|email|e-mail|mail)\b\s*[:.=-]?/gi;

const SAMPLE_DATA = `Rahul Sharma, 9876543210, rahul.sharma@gmail.com
Priya Singh | priya.singh@yahoo.com | +91 98765 43211
Name: Amit Kumar  Phone: 98123-45678  Email: amit@outlook.com
sana khan sana.khan@gmail.com
Vikas Yadav 9988776655
neha.gupta@company.in`;

// ============================================================
// 3. Main data variables - yahi separated data rakhte hain
// ============================================================
let contacts = [];
let names = [];
let phones = [];
let emails = [];

// ============================================================
// 4. Helper functions
// ============================================================

// Phone se sirf digits nikalo aur ek format me karo
function cleanPhone(rawPhone) {
    let digits = rawPhone.replace(/\D/g, "");

    // "0091..." ko "91..." bana do
    if (digits.startsWith("00")) {
        digits = digits.slice(2);
    }

    if (digits.length === 12 && digits.startsWith("91")) {
        return "+91 " + digits.slice(2);
    }
    if (digits.length === 11 && digits.startsWith("0")) {
        return digits.slice(1);
    }
    if (digits.length >= 10 && digits.length <= 13) {
        return digits;
    }
    return "";
}

// Name me se labels, symbols aur extra spaces hatao
function cleanName(rawName) {
    let name = rawName
        .replace(LABEL_PATTERN, " ")
        .replace(/[^A-Za-zऀ-ॿ.' ]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    // "rahul sharma" -> "Rahul Sharma"
    return name.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

// Ek line ko { name, phone, email } object me todo
function separateLine(line) {
    let name = line;
    let phone = "";
    let email = "";

    // Step A: email dhundo (pehle email, taaki uske andar ke numbers phone na ban jaye)
    const emailMatch = name.match(EMAIL_PATTERN);
    if (emailMatch) {
        email = emailMatch[0].toLowerCase();
        name = name.replace(emailMatch[0], " ");
    }

    // Step B: phone dhundo
    const phoneMatch = name.match(PHONE_PATTERN);
    if (phoneMatch) {
        phone = cleanPhone(phoneMatch[0]);
        if (phone) {
            name = name.replace(phoneMatch[0], " ");
        }
    }

    // Step C: jo bacha woh name hai
    name = cleanName(name);

    return { name: name, phone: phone, email: email };
}

// Text ko HTML list me dikhao
function fillList(listElement, items) {
    listElement.innerHTML = "";

    if (items.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Kuch nahi mila";
        li.style.color = "var(--muted)";
        listElement.appendChild(li);
        return;
    }

    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        listElement.appendChild(li);
    });
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
}

// ============================================================
// 5. Screen par result dikhao
// ============================================================
function renderTable() {
    resultBody.innerHTML = "";

    if (contacts.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 4;
        cell.className = "empty";
        cell.textContent = "Abhi koi data nahi hai.";
        row.appendChild(cell);
        resultBody.appendChild(row);
        return;
    }

    contacts.forEach((contact, index) => {
        const row = document.createElement("tr");
        const values = [index + 1, contact.name, contact.phone, contact.email];

        values.forEach((value) => {
            const cell = document.createElement("td");
            if (value === "") {
                cell.textContent = "Missing";
                cell.className = "missing";
            } else {
                cell.textContent = value;
            }
            row.appendChild(cell);
        });

        resultBody.appendChild(row);
    });
}

function renderVariables() {
    if (contacts.length === 0) {
        variableView.textContent = "let contacts = [];";
        return;
    }

    const contactLines = contacts
        .map((c) => `    { name: ${JSON.stringify(c.name)}, phone: ${JSON.stringify(c.phone)}, email: ${JSON.stringify(c.email)} }`)
        .join(",\n");

    variableView.textContent =
        `let contacts = [\n${contactLines}\n];\n\n` +
        `let names  = ${JSON.stringify(names)};\n` +
        `let phones = ${JSON.stringify(phones)};\n` +
        `let emails = ${JSON.stringify(emails)};`;
}

function renderAll() {
    renderTable();
    fillList(nameList, names);
    fillList(phoneList, phones);
    fillList(emailList, emails);
    renderVariables();

    totalCount.textContent = contacts.length;
    phoneCount.textContent = phones.length;
    emailCount.textContent = emails.length;
    missingCount.textContent = contacts.filter((c) => !c.name || !c.phone || !c.email).length;
}

// ============================================================
// 6. Main function - button click par chalta hai
// ============================================================
function separateData() {
    const rawText = rawDataInput.value.trim();

    if (rawText === "") {
        showMessage("Pehle kuch data paste karo.", "error");
        return;
    }

    // Har line ko alag karo, khaali lines hatao
    const lines = rawText.split("\n").filter((line) => line.trim() !== "");

    contacts = lines.map(separateLine);
    names = contacts.map((c) => c.name).filter((value) => value !== "");
    phones = contacts.map((c) => c.phone).filter((value) => value !== "");
    emails = contacts.map((c) => c.email).filter((value) => value !== "");

    renderAll();
    showMessage(`${contacts.length} contacts successfully separate ho gaye!`, "success");
}

// ============================================================
// 7. Extra features: Copy, Download CSV, Clear
// ============================================================
function copyText(text) {
    if (text === "") {
        showMessage("Copy karne ke liye kuch nahi hai.", "error");
        return;
    }

    navigator.clipboard
        .writeText(text)
        .then(() => showMessage("Copy ho gaya!", "success"))
        .catch(() => showMessage("Copy nahi ho paya. Manually select karke copy karo.", "error"));
}

function downloadCSV() {
    if (contacts.length === 0) {
        showMessage("Download karne ke liye pehle data separate karo.", "error");
        return;
    }

    // CSV me comma/quote safe rakhne ke liye har value ko quotes me rakho
    const toCell = (value) => `"${String(value).replace(/"/g, '""')}"`;

    const rows = [["Name", "Phone", "Email"]];
    contacts.forEach((c) => rows.push([c.name, c.phone, c.email]));

    const csvText = rows.map((row) => row.map(toCell).join(",")).join("\n");
    const blob = new Blob(["﻿" + csvText], { type: "text/csv;charset=utf-8" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "contacts.csv";
    link.click();
    URL.revokeObjectURL(link.href);

    showMessage("contacts.csv download ho gaya!", "success");
}

function clearAll() {
    rawDataInput.value = "";
    contacts = [];
    names = [];
    phones = [];
    emails = [];
    renderAll();
    showMessage("Sab clear ho gaya.", "success");
}

// ============================================================
// 8. Events - button click hone par kya chalega
// ============================================================
separateBtn.addEventListener("click", separateData);
clearBtn.addEventListener("click", clearAll);
downloadBtn.addEventListener("click", downloadCSV);

sampleBtn.addEventListener("click", () => {
    rawDataInput.value = SAMPLE_DATA;
    separateData();
});

// Ctrl + Enter (Mac par Cmd + Enter) se bhi separate ho jaye
rawDataInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        separateData();
    }
});

document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
        const lists = { names: names, phones: phones, emails: emails };
        copyText(lists[button.dataset.copy].join("\n"));
    });
});

// Page khulte hi empty lists dikhao
renderAll();
