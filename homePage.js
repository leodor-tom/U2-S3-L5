const URL = "https://striveschool-api.herokuapp.com/api/product/";
let productID = "";

const getData = async () => {
  try {
    const row = document.querySelector(".row");

    const resp = await fetch(URL, {
      headers: {
        authorization:
          " bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjA2MmMwMzRmZjAwMTQwM2Y1MmEiLCJpYXQiOjE2OTI5NTM4ODQsImV4cCI6MTY5NDE2MzQ4NH0.QrpJRH0-n4UpBx8hQNsIH-X-QH2qmpPx79RT17sP1R8 ",
      },
    });
    if (!resp.ok) {
      if (resp.status === 401) {
        throw new Error("opps! not permitted 401");
      }
      if (resp.status === 404) {
        throw new Error(" opps! page not found 404");
      }
      if (resp.status === 500) {
        throw new Error("opps! general server error 500");
      }
    }

    const product = await resp.json();
    product.forEach(product => {
      productID = product._id;
      console.log(productID);
      const loading = document.querySelector(".spinner-border");
      loading.classList.add("d-none");
      row.innerHTML += `<div class="card">
        <img src="${product.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#infoModal">
          scopri di più
        </button>
        </div>
      </div>`;
      const infoTitle = document.getElementById("infoTitle");
      const infoImg = document.getElementById("infoImg");
      const infoBrand = document.getElementById("infoBrand");
      const infoDesc = document.getElementById("infoDesc");
      const infoPrice = document.getElementById("infoPrice");
      const infoID = document.getElementById("infoID");

      infoTitle.innerHTML = `${product.name}`;
      infoID.innerHTML = `id: ${product._id}`;
      infoBrand.innerHTML = `${product.brand}`;
      infoDesc.innerHTML = `${product.description}`;
      infoPrice.innerHTML = `${product.price} €`;
      console.log(productID);
    });
  } catch (error) {
    const errTle = document.getElementById("errorModalTitle");
    const errMsg = document.getElementById("errorModalContent");
    errTle.innerHTML = `Bad Luck`;
    errMsg.innerHTML = `${error.message}`;
    const myModal = new bootstrap.Modal(document.getElementById("errorModal"), {});

    myModal.toggle();
  }
};

window.onload = () => {
  getData();
};

const handleLink = () => {
  window.location.assign("./backOffice.html?product=" + productID);
};
