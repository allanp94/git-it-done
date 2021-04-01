var issueContainerEl = document.getElementById("issues-container");

var getRepoIssues = function (repo) {
  var apiURL =
    "https://api.github.com/repos/" + repo + "/issues?directions=asc";
  fetch(apiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);
      });
    } else {
      alert("there was a problem with your request.!");
    }
  });
};

var displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  for (var i = 0; i < issues.length; i++) {
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    issueEl.appendChild(titleEl);

    var typeEl = document.createElement("span");

    //check if the issue is an actual issue or pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    issueEl.appendChild(typeEl);

    issueContainerEl.appendChild(issueEl);
  }
};

getRepoIssues("allanp94/run-buddy-website");
