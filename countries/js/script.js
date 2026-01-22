const main = document.querySelector('.main');
const search = document.querySelector('.search');
const btnSort = document.querySelector('.btn');
const regionSelect = document.querySelector('.region');
const moonBtn = document.getElementById("moon");
const sunBtn = document.getElementById("sun");


let countryData = [];
// Fetch countries
fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,area,languages,currencies,timezones')
    .then(response => response.json())
    .then(data => {
        countryData = data;
        renderCountry(data);


    });
// Render countries
function renderCountry(data) {
    main.innerHTML = '';
    data.forEach(item => {
        const fragment = document.createDocumentFragment();
        const box = document.createElement('div');
        box.classList.add('box');
        const image = document.createElement('img');
        image.src = item.flags.png;
        image.alt = item.flags.alt || item.name.common;
        const title = document.createElement('h2');
        title.classList.add('title');
        title.textContent = ` Country Name: ${ item.name.common }`;
        const region = document.createElement('h4');
        region.classList.add('region');
        region.textContent = `Region: ${item.region}`;
        fragment.append(image, title, region);
        box.appendChild(fragment);
        main.appendChild(box);
    });
    console.log(data);

}
// Search country
search.addEventListener('input', () => {
    const value = search.value.toLowerCase();
    const searchData = countryData.filter(item =>
        item.name.common.toLowerCase().includes(value)
    );
    renderCountry(searchData);
});
// Filter by region
regionSelect.addEventListener('change', () => {
    const value = regionSelect.value;
    if (value === "ALL") {
        renderCountry(countryData)
    } else {
        const filterData = countryData.filter((item) => item.region === value);
        renderCountry(filterData);
    }
})

btnSort.addEventListener("click", () => {
    const sortedName = countryData.sort((a, b) => {
        if (a.name.common > b.name.common) {
            return 1
        } else if (a.name.common < b.name.common) {
            return -1
        }
    })
    renderCountry(sortedName);
});
moonBtn.addEventListener("click", () => {
    sunBtn.style.display = "block";
    moonBtn.style.display = "none";
    sunBtn.style.color = "white"
    document.querySelector("body").classList.add("dark");
});
sunBtn.addEventListener("click", () => {
    sunBtn.style.display = "none";
    moonBtn.style.display = "block";
    sunBtn.style.color = "black"
    document.querySelector("body").classList.remove("dark");
});


// local storagega saqlash 
moonBtn.addEventListener("click", () => {
    localStorage.setItem("theme", "dark");
});

sunBtn.addEventListener("click", () => {
    localStorage.setItem("theme", "light");
});
window.addEventListener("load", () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark");
        sunBtn.style.display = "block";
        moonBtn.style.display = "none";
    } else {
        sunBtn.style.display = "none";
        moonBtn.style.display = "block";
    }
});