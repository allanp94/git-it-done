var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUsersRepos = function (user) {
  var apiURL = "https://api.github.com/users/" + user + "/repos";
  fetch(apiURL)
    .then(function (response) {
      console.log(response.ok);
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to github");
    });
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();

  if (username) {
    getUsersRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "NO repositories found.";
    return;
  }

  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    //create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEL = document.createElement("span");
    statusEL.classList = "flex-row align-center";

    //check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEL.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEL.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEL);

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
