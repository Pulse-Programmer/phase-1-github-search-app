document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#github-form");
  const ulUser = document.querySelector("#user-list");
  const ulRepo = document.querySelector("#repos-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputQuery = e.target.search.value;

    fetch(`https://api.github.com/search/users?q=${inputQuery}`)
      .then((res) => res.json())
      .then((data) => {
        data.items.forEach((record) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <p>${record.login}</p>
            <img src="${record.avatar_url}"/>
            <a href="${record.url}">User Profile</a>
            <hr>
            `;
          ulUser.appendChild(li);
        });
      })
      .catch((error) => alert(error.message));

    ulUser.addEventListener("click", (e) => {
      while (ulRepo.firstChild) {
        ulRepo.removeChild(ulRepo.firstChild);
      }
      let clickedUser = e.target.firstElementChild.textContent;

      fetch(`https://api.github.com/users/${clickedUser}/repos`)
        .then((res) => res.json())
        .then((item) => {
          item.forEach((record) => {
            const li = document.createElement("li");
            li.textContent = record.name;
            ulRepo.appendChild(li);
          });
        })
        .catch((error) => alert(error.message));
    });
    form.reset();
  });
});
