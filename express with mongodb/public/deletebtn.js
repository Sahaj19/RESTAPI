let delBtn = document.querySelectorAll(".delete_btn");

delBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    let confirmation = confirm("Are you sure?");
    if (confirmation) {
      btn.closest("form").submit();
    }
  });
});
