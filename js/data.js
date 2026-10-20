const people = [
  { name: "Sara Ahmed",     age: 24, city: "Cairo" },
  { name: "Omar Hassan",    age: 31, city: "Alexandria" },
  { name: "Mona Khalil",    age: 28, city: "Giza" },
  { name: "Youssef Nabil",  age: 19, city: "Cairo" },
  { name: "Laila Mansour",  age: 45, city: "Luxor" },
  { name: "Karim Fathy",    age: 37, city: "Aswan" },
  { name: "Hana Samir",     age: 22, city: "Alexandria" },
  { name: "Tarek Adel",     age: 52, city: "Giza" }
];

const tableBody = document.getElementById("tableBody");
const searchBox = document.getElementById("search");
const emptyMessage = document.getElementById("empty");

let sortKey = null;      // "name", "age" or null
let sortAsc = true;

function render() {
  const query = searchBox.value.trim().toLowerCase();

  // 1. filter
  let rows = people.filter(p =>
    p.name.toLowerCase().includes(query) ||
    String(p.age).includes(query) ||
    p.city.toLowerCase().includes(query)
  );

  // 2. sort (on a copy, so the original array stays untouched)
  if (sortKey) {
    rows = rows.slice().sort((a, b) => {
      const result = sortKey === "age"
        ? a.age - b.age
        : a.name.localeCompare(b.name);
      return sortAsc ? result : -result;
    });
  }

  // 3. build the rows with JavaScript
  tableBody.innerHTML = "";
  for (const p of rows) {
    const tr = document.createElement("tr");
    for (const value of [p.name, p.age, p.city]) {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }
  emptyMessage.hidden = rows.length > 0;
}

function sortBy(key) {
  // clicking the same button again reverses the order
  sortAsc = (sortKey === key) ? !sortAsc : true;
  sortKey = key;
  render();
}

searchBox.addEventListener("input", render);   // filters while typing
document.getElementById("sortName").addEventListener("click", () => sortBy("name"));
document.getElementById("sortAge").addEventListener("click", () => sortBy("age"));

render();