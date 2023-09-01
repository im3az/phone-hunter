const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
  // console.log(phones);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);

  const phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before  adding new card
  phoneContainer.textContent = "";
  // console.log(phones.length);

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // console.log("is show all", isShowAll);

  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    // create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    // set innerHTML
    phoneCard.innerHTML = `
      <figure>
        <img src="${phone.image}"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
          <button onclick = "handleShowDetail('${phone.slug}');" class="btn btn-primary">Show details</button>
        </div>
      </div>
      `;
    // append child
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoadingSpinner(false);
};

const handleShowDetail = async (id) => {
  // console.log("show", id);
  // load individual product data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

// display product details
const showPhoneDetails = (phone) => {
  console.log(phone);

  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p class = ""><span>Storage:</span> ${phone?.mainFeatures?.storage}</p>
    <p><span>GPS: </span>${phone?.others?.GPS}</p>
    
  `;

  // show the modal
  show_details_modal_5.showModal();
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

// loadPhone();
