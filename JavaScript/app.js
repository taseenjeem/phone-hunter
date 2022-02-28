// --------------JS event handler of searched phones--------------

const searchByName = () => {
    const searchedPhones = document.getElementById('searched-phones');
    searchedPhones.innerHTML = '';

    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;

    if (searchValue == '') {
        document.getElementById('warning-massage').style.display = 'block';
    } else {
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data))

        document.getElementById('warning-massage').style.display = 'none';
    }
}

const displayPhones = (phones) => {
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';

    const searchedPhones = document.getElementById('searched-phones');

    for (const phone of phones.data) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mx-auto mt-3 rounded-3" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top img-fluid p-5" alt="...">
             <div class="card-body">
                 <h5 class="card-title">Model : ${phone.phone_name}</h5>
                    <h5 class="card-text">Brand : ${phone.brand}</h5>
                    <a href="#" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">More detail</a>
                </div>
        </div>
        `
        div.classList.add('col-lg-4')
        searchedPhones.appendChild(div);
    }
}


// --------------JS event handler of showing details about phone--------------


const phoneDetails = (details) => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data))
}

const displayPhoneDetails = (info) => {
    const header = document.getElementById('header');
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="card mx-auto mb-3 rounded-3 my-4" style="max-width: 940px;">
        <div class="row g-0">
            <div class="col-md-4">
                 <img src="${info.data.image}" class="img-fluid rounded-start p-3" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${info.data.name}</h5>
                    <p class="card-text"><span class="fw-bold">Storage :</span> ${info.data.mainFeatures.storage}</p>
                    <p class="card-text"><span class="fw-bold">Sensors :</span> ${info.data.mainFeatures.sensors}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
    `
    header.appendChild(div);
}