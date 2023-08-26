const productID = new URLSearchParams(window.location.search).get("product");

const URL = productID
  ? "https://striveschool-api.herokuapp.com/api/product/" + productID
  : "https://striveschool-api.herokuapp.com/api/product/";

window.onload = async () => {
  const cardTitle = document.querySelector(".card-title");
  const submitBtn = document.getElementById("submitBtn");
  const dltBtn = document.getElementById("delete-btn");
  dltBtn.onclick = handleDlt;
  if (productID) {
    cardTitle.innerText = "Edit or delete the product";

    const resp = await fetch(URL, {
      headers: {
        authorization:
          " bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjA2MmMwMzRmZjAwMTQwM2Y1MmEiLCJpYXQiOjE2OTI5NTM4ODQsImV4cCI6MTY5NDE2MzQ4NH0.QrpJRH0-n4UpBx8hQNsIH-X-QH2qmpPx79RT17sP1R8 ",
      },
    });

    if (resp.ok) {
      const { name, description, brand, imageUrl, price } = await resp.json();

      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("brand").value = brand;
      document.getElementById("image").value = imageUrl;
      document.getElementById("price").value = price;

      submitBtn.innerText = "edit product";

      dltBtn.classList.remove("d-none");
    }
  }
};

const handleSubmit = async e => {
  e.preventDefault();

  const myProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("image").value,
    price: document.getElementById("price").value,
  };
  console.log(myProduct);
  try {
    const resp = await fetch(URL, {
      method: productID ? "PUT" : "POST",
      headers: {
        authorization:
          " bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjA2MmMwMzRmZjAwMTQwM2Y1MmEiLCJpYXQiOjE2OTI5NTM4ODQsImV4cCI6MTY5NDE2MzQ4NH0.QrpJRH0-n4UpBx8hQNsIH-X-QH2qmpPx79RT17sP1R8 ",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myProduct),
    });
  } catch (error) {
    console.log(error);
  }
};

const handleDlt = async () => {
  const confirmDlt = document.getElementById("confirmDlt");
  const dltTitle = document.getElementById("dltModalTitle");
  const dltText = document.getElementById("dltModalContent");

  dltTitle.innerHTML = "Delete the product";
  dltText.innerHTML = "are you sure?";
  const myModal = new bootstrap.Modal(document.getElementById("dltModal"), {});
  myModal.toggle();
};

confirmDlt.addEventListener("click", e => {
  const resp = fetch(URL, {
    method: "DELETE",
    headers: {
      authorization:
        " bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjA2MmMwMzRmZjAwMTQwM2Y1MmEiLCJpYXQiOjE2OTI5NTM4ODQsImV4cCI6MTY5NDE2MzQ4NH0.QrpJRH0-n4UpBx8hQNsIH-X-QH2qmpPx79RT17sP1R8 ",
    },
  });
  if (confirmDlt) {
    const myModal = new bootstrap.Modal(document.getElementById("doneModal"), {});
    myModal.toggle();
  }
});
const backHome = () => window.location.assign("./homePage.html");

const confirm = () => {
  const myModal = new bootstrap.Modal(document.getElementById("doneModal"), {});
  myModal.toggle();
};
