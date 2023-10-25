// function for displaying toggle content 
const toggleDisplay = (id, state) => {
    document.getElementById(id).style.display = state;
}
toggleDisplay('error-message', 'none');
toggleDisplay('spinner-container', 'none');
toggleDisplay('see-all', 'none');
toggleDisplay('display-section', 'none');
// function for loading the fetched api 
const loadPhones = async () => {
    toggleDisplay('spinner-container', 'flex')
    toggleDisplay('see-all', 'none');
    document.getElementById('search-results').textContent = '';
    document.getElementById('display-container').textContent = '';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // handling errors 
    if (searchText == '') {
        toggleDisplay('spinner-container', 'none');
        toggleDisplay('error-message', 'block');
        toggleDisplay('see-all', 'none');
    }
    else {
        toggleDisplay('error-message', 'none');
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        if (data.data.length == 0) {
            toggleDisplay('spinner-container', 'none');
            toggleDisplay('error-message', 'block');
            toggleDisplay('see-all', 'none');
        }
        // calling another function to display the content of api 
        else {
            toggleDisplay('error-message', 'none');
            displayPhones(data.data.slice(0, 20));
            displayPhones2(data.data.slice(21, 197));
        }
    }
    searchField.value = '';
}
// function for displaying the results 
const displayPhones = phones => {
    const searchResults = document.getElementById('search-results');
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
      <div class="card h-100 shadow border-0 p-5 rounded-3">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center text-primary">${phone.phone_name}</h5>
      </div>
      <div class="card-footer bg-yellow border-1 border-secondary d-flex justify-content-between">
      <p class="card-text">${phone.brand}</p>
      <button data-bs-toggle="modal" data-bs-target="#modal" onclick="loadPhone('${phone.slug}')" class="btn btn-success text-white rounded-3">Extra</button>
      </div>
    </div>
      `
        searchResults.appendChild(div);
    })
    toggleDisplay('spinner-container', 'none');
    toggleDisplay('see-all', 'block');
}
const displayPhones2 = phones => {
    const searchResults = document.getElementById('search-results');
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col', 'extra-card');
        div.innerHTML = `
      <div class="card h-100 shadow border-0 p-5 rounded-3">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center text-primary">${phone.phone_name}</h5>
      </div>
      <div class="card-footer bg-white border-1 border-secondary d-flex justify-content-between">
      <p class="card-text">${phone.brand}</p>
      <button data-bs-toggle="modal" data-bs-target="#modal" onclick="loadPhone('${phone.slug}')" class="btn btn-primary text-white rounded-3">Extra</button>
      </div>
    </div>
      `
        searchResults.appendChild(div);
    })
    toggleDisplay('spinner-container', 'none');
}
// getting the api for per phone by their id
const loadPhone = async id => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    displayPhone(data.data);
}
// function for displaying individual phone in display section 
const displayPhone = phone => {
    const displayContainer = document.getElementById('display-container');
    displayContainer.innerHTML = `
    <div class="card border-0">
    <p class="text-end"><button onclick="closeDisplay()" class="btn-close"></button></p>
    <div class="row g-0">
      <div class="col-md-4 col-12">
        <img src="${phone.image}" class="w-100 rounded-start" alt="...">
      </div>
      <div class="col-md-8 col-12">
        <div class="card-body">
          <h3 class="card-title text-primary">${phone.name}</h3>
          <small class="text-secondary fw-bold">Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</small>
          <h5 class="text-info">Features:</h5>
          <p class="text-secondary">${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : ''} | ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : ''} | ${phone.mainFeatures.memory ? phone.mainFeatures.memory : ''} | ${phone.mainFeatures.storage ? phone.mainFeatures.storage : ''}</p>
          <p class="text-secondary"><span class="text-info fw-bold">Sensors:</span> ${phone.mainFeatures.sensors?.join(',') ? phone.mainFeatures.sensors : ''}</p>
          <h5 class="text-info">Others:</h5>
          <p class="text-secondary">WLAN: ${phone.others?.WLAN ? phone.others.WLAN : ''} | Bluetooth: ${phone.others?.bluetooth ? phone.others.bluetooth : ''} | GPS: ${phone.others?.GPS ? phone.others.GPS : ''} | NFC: ${phone.others?.NFC ? phone.others.NFC : ''} | Radio: ${phone.others?.Radio ? phone.others.Radio : ''} | USB: ${phone.others?.USB ? phone.others.USB : ''}</p>
        </div>
      </div>
    </div>
  </div>
    `
    toggleDisplay('display-section', 'flex');
}
const seeAll = () => {
    const extraCards = document.querySelectorAll('.extra-card');
    for (const extraCard of extraCards) {
        extraCard.style.display = 'block';
    }
    toggleDisplay('see-all', 'none');
}
const closeDisplay = () => {
    toggleDisplay('display-section', 'none');
}