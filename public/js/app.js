console.log("client you are a bitch");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //   console.log(search.value);

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageThree.textContent = "";

  fetch("/weather?address=" + search.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.details;
        messageThree.textContent = data.details1;
      }
    });
  });
});
