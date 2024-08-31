const container = document.querySelector(".container");
const label = document.querySelector("label[for='jumlahUang']");
const data = {
  nama: document.getElementById("name"),
  waktu: document.getElementById("waktu"),
  jumlahUang: document.getElementById("jumlahUang"),
  bunga: document.getElementById("return"),
};

let n = 0;

container.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    if (e.target.id === "month") {
      e.target.classList.add("active");
      e.target.nextElementSibling.classList.remove("active");
      n = 12;

      if (e.target.className == "button active") {
        label.innerHTML = "Target investasi / bulan";
      } else {
        label.innerHTML = "Target investasi";
      }
    } else if (e.target.id === "year") {
      e.target.classList.toggle("active");
      e.target.previousElementSibling.classList.remove("active");
      n = 1;

      if (e.target.className == "button active") {
        label.innerHTML = "Target investasi / tahun";
      } else {
        label.innerHTML = "Target investasi";
      }
    }
  }
});

// bunga /= 100;
// console.log(bunga);

const hitung = document.getElementById("calc");

hitung.addEventListener("click", function () {
  hitung.classList.add("active");

  let result =
    +data.jumlahUang.value *
    (((1 + +data.bunga.value / 100 / n) ** (n * +data.waktu.value) - 1) /
      (+data.bunga.value / 100 / n)) *
    (1 + +data.bunga.value / 100 / n);

  result = Math.floor(result);

  const formatedResult = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(result);

  const title = document.querySelector(".title");
  title.innerHTML = "Halo, " + data.nama.value;

  const section = document.querySelector("section");
  section.setAttribute("class", "result");

  const ul = document.querySelector("ul");
  section.removeChild(ul);

  const resultTitle = document.createElement("p");
  const newTitleText = document.createTextNode(
    "Perkiraan jumlah tabungan investasi anda dalam jangka waktu " +
      data.waktu.value +
      " tahun sebesar : "
  );

  resultTitle.appendChild(newTitleText);
  section.appendChild(resultTitle);

  const showResult = document.createElement("p");
  const finalResult = document.createTextNode(formatedResult);
  showResult.appendChild(finalResult);
  section.appendChild(showResult);

  container.removeChild(hitung);
});
