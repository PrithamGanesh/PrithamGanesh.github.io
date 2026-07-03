window.addEventListener("load", function () {
  document.body.classList.remove("is-preload");

  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
