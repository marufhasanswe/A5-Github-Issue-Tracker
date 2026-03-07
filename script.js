const username = document.getElementById("username-input");
const password = document.getElementById("password-input");
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", (event) => {
  if (username.value == "admin" && password.value == "admin123") {
    window.location.href = "main.html";
  } else {
    window.alert("Password didn't matched");
  }
});
