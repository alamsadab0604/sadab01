# Contact Data Separator

Ek simple website jisme aap mixed contact data paste karte ho, aur JavaScript use **Name**, **Phone** aur **Email** me alag-alag variables me separate kar deta hai.

Bana hai sirf **HTML + CSS + JavaScript** se. Koi library nahi chahiye.

---

## Website kya karti hai?

Input (mixed data):

```
Rahul Sharma, 9876543210, rahul.sharma@gmail.com
Priya Singh | priya.singh@yahoo.com | +91 98765 43211
Name: Amit Kumar  Phone: 98123-45678  Email: amit@outlook.com
```

Output (JavaScript variables me):

```js
let contacts = [
    { name: "Rahul Sharma", phone: "9876543210", email: "rahul.sharma@gmail.com" },
    { name: "Priya Singh", phone: "+91 9876543211", email: "priya.singh@yahoo.com" },
    { name: "Amit Kumar", phone: "9812345678", email: "amit@outlook.com" }
];

let names  = ["Rahul Sharma", "Priya Singh", "Amit Kumar"];
let phones = ["9876543210", "+91 9876543211", "9812345678"];
let emails = ["rahul.sharma@gmail.com", "priya.singh@yahoo.com", "amit@outlook.com"];
```

Features:

- Name, Phone, Email ko table me alag-alag dikhata hai
- Jis contact me kuch missing hai, use red "Missing" se mark karta hai
- Names / Phones / Emails ki alag list, har list ka **Copy** button
- **Download CSV** (Excel me khul jaata hai)
- Mobile par bhi sahi dikhti hai (Flexbox se)
- `Ctrl + Enter` (Mac par `Cmd + Enter`) se bhi separate hota hai

---

## Folder structure (sahi format)

```
contact-separator/
├── index.html          ← Page ka structure (HTML)
├── css/
│   └── style.css       ← Design (CSS)
├── js/
│   └── script.js       ← Logic (JavaScript)
├── .vscode/
│   ├── extensions.json ← VS Code ke recommended extensions
│   └── settings.json   ← Auto-format settings
└── README.md           ← Yeh guide
```

**Naming ke rules** (inse galti kam hoti hai):

- Sab file names **small letters** me, bina space ke: `style.css` ✅ `Style 1.css` ❌
- Spelling dhyan se: `styel1.css`, `cssss.css`, `indexx.html` jaise naam baad me confuse karte hain
- Main page ka naam hamesha `index.html` rakho. Live Server aur GitHub Pages yahi file pehle kholte hain
- CSS ko `css/` folder me aur JS ko `js/` folder me rakho

---

## A to Z: VS Code me khud kaise banaye

### Step A: Zaroori cheezein install karo

1. **VS Code** install karo: https://code.visualstudio.com
2. VS Code kholo → left side me **Extensions** icon (4 dabbe wala) → yeh 2 extensions install karo:
   - **Live Server** (Ritwick Dey). Isse website browser me live chalti hai
   - **Prettier - Code formatter**. Isse code apne aap sahi format me ho jaata hai

### Step B: Project folder banao

1. Desktop par ek naya folder banao: `contact-separator`
2. VS Code me **File → Open Folder…** → `contact-separator` select karo
3. Explorer (left side) me upar **New Folder** icon se 2 folders banao: `css` aur `js`

### Step C: File 1, `index.html`

1. Explorer me **New File** → naam `index.html`
2. Is repo ki [`index.html`](index.html) ka code copy karke paste karo

Tip: khaali `index.html` me sirf `!` likho aur `Enter` dabao. VS Code basic HTML structure khud bana deta hai.

Is file me kya hai:

| Part | Kaam |
|---|---|
| `<link rel="stylesheet" href="css/style.css">` | CSS file ko jodta hai |
| `<textarea id="rawData">` | Yahan data paste hota hai |
| `<button id="separateBtn">` | Click karne par data separate hota hai |
| `<tbody id="resultBody">` | Yahan table me result aata hai |
| `<script src="js/script.js">` | JavaScript file ko jodta hai (body ke end me) |

`id` bahut important hai. JavaScript inhi `id` se HTML elements ko pakadta hai.

### Step D: File 2, `css/style.css`

1. `css` folder par right-click → **New File** → `style.css`
2. [`css/style.css`](css/style.css) ka code paste karo

Isme important cheezein:

- `:root { --primary: #4f46e5; }`: colors ko **CSS variables** me rakha hai. Ek jagah color badlo, poori website me badal jayega
- `display: flex;` + `gap` + `flex-wrap: wrap;`: buttons, stat boxes aur 3 lists ko **Flexbox** se line me lagaya hai
- `@media (max-width: 600px)`: mobile ke liye alag design

### Step E: File 3, `js/script.js`

1. `js` folder par right-click → **New File** → `script.js`
2. [`js/script.js`](js/script.js) ka code paste karo

JavaScript 8 hisso me bata hai (file me har hissa comment se marked hai):

1. **HTML elements ko variables me rakhna**: `const separateBtn = document.getElementById("separateBtn");`
2. **Patterns (Regex)**: `EMAIL_PATTERN` aur `PHONE_PATTERN` se email aur phone pehchante hain
3. **Main data variables**: `contacts`, `names`, `phones`, `emails`. Separated data yahin rehta hai
4. **Helper functions**: `cleanPhone()`, `cleanName()`, `separateLine()`
5. **Screen par dikhana**: `renderTable()`, `renderVariables()`, `renderAll()`
6. **Main function**: `separateData()`. Button click par yahi chalta hai
7. **Extra features**: Copy, Download CSV, Clear
8. **Events**: `addEventListener("click", ...)`. Kaunsa button kya karega

Ek line kaise separate hoti hai (`separateLine` function):

```
"Rahul Sharma, 9876543210, rahul@gmail.com"
        │
        ├─ Step A: Email dhundo  → email = "rahul@gmail.com"   (line se hata do)
        ├─ Step B: Phone dhundo  → phone = "9876543210"        (line se hata do)
        └─ Step C: Jo bacha      → name  = "Rahul Sharma"      (comma, space saaf karo)
```

Email pehle isliye nikalte hain taaki `rahul123@gmail.com` jaise email ke andar ke numbers galti se phone na ban jaye.

### Step F: Code ko sahi format me karo

- Manually format: **Mac** par `Shift + Option + F`, **Windows** par `Shift + Alt + F`
- Har save par apne aap format: is repo ki `.vscode/settings.json` me `"editor.formatOnSave": true` already on hai. Bas `Cmd + S` / `Ctrl + S` dabao

### Step G: Website ko live chalao (apne computer par)

1. Explorer me `index.html` par **right-click → Open with Live Server**
   (ya VS Code ke neeche right corner me **Go Live** button dabao)
2. Browser me khulegi: `http://127.0.0.1:5500/index.html`
3. Ab code me kuch bhi badlo aur save karo. Browser apne aap refresh ho jayega
4. **Sample Data** button dabao aur result dekho

### Step H: Internet par live karo (GitHub Pages, free)

Bina koi command chalaye, sirf browser se:

1. **Repo banao:** github.com par login → upar right **+** → **New repository** → naam `contact-separator` → **Public** chuno (free Pages ke liye zaroori) → baaki sab khaali chhodo → **Create repository**
2. **Files upload karo:** naye repo page par **"uploading an existing file"** link dabao → Finder me project folder kholo, andar ka sab kuch select karo (`Cmd + A`) aur drag karo. Isme `index.html`, CSS/JS files (ya `css`, `js` folders) aur `README.md` aa jayenge. Bahar wala project folder khud drag mat karo, warna `index.html` uske andar chali jayegi → neeche **Commit changes**
3. **Pages on karo:** repo me **Settings** → left me **Pages** → **Source**: `Deploy from a branch` → **Branch**: `main` aur `/ (root)` → **Save**
4. **Link kholo:** 1-2 minute baad Pages wale page ko refresh karo. Upar link aayega:
   `https://<aapka-username>.github.io/contact-separator/`

Baad me kuch badalna ho: VS Code me change karo → repo me **Add file → Upload files** se wahi file dobara upload karo → **Commit changes**. 1-2 minute me website update ho jayegi.

---

## Code poora copy karne ka sahi tarika

Haath se select karke copy karne par code aksar aadha reh jaata hai. Isliye:

- **Ek file:** GitHub par file kholo → upar right me **Copy raw file** icon (2 dabbe wala) dabao → VS Code me file ka purana code `Cmd + A` (Windows: `Ctrl + A`) se select karke paste karo
- **Saari files ek saath:** repo page par branch chuno → hare **Code** button → **Download ZIP** → unzip karke folder VS Code me kholo

Check karo ki file poori aayi ya nahi. Har file ka **aakhri hissa** aisa hona chahiye:

| File | Last lines | Lagbhag lines |
|---|---|---|
| `index.html` | `<script src="js/script.js"></script>` `</body>` `</html>` | 124 |
| `css/style.css` | `.buttons .btn { flex: 1 1 100%; }` aur phir `}` | 298 |
| `js/script.js` | `renderAll();` | 298 |

---

## Common galtiyan aur solution

| Problem | Wajah | Solution |
|---|---|---|
| Sirf purple header sundar dikhe, baaki sab plain, aur page "Total Contacts" par khatam | `index.html` aur `style.css` poori copy nahi hui | Upar wale tarike se dono files dobara poori copy karo |
| Ek CSS rule ke baad baaki design kaam na kare | Kahin `}` chhoot gaya hai | VS Code me neeche **Problems** tab (`Cmd + Shift + M`) dekho, red line wali jagah theek karo |
| CSS apply nahi ho raha | `href` ka path galat hai | `href="css/style.css"`. Folder aur file ka naam exactly same ho |
| Button click par kuch nahi hota | `script.js` link nahi hua ya `id` galat hai | `<script src="js/script.js">` body ke end me ho, aur `id` HTML aur JS dono me same ho |
| Error dekhna hai | | Browser me `Cmd + Option + I` (Mac) / `F12` (Windows) → **Console** tab |
| Live Server ka button nahi dikh raha | Extension install nahi hai ya folder open nahi kiya | **File → Open Folder** se poora folder kholo, sirf file nahi |
| GitHub Pages par 404 | `index.html` root me nahi hai (shayad poora folder upload ho gaya) | Repo kholo: files seedhe dikhni chahiye, kisi folder ke andar nahi. Folder ki jagah sirf files upload karo |
| Live site par design/buttons kaam na karein | `style.css` ya `script.js` upload nahi hui, ya naam alag hai | Teeno files repo me hain ya nahi dekho. Naam bilkul wahi ho jo `index.html` me likha hai |
