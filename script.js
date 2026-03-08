const username = document.getElementById("username-input");
const password = document.getElementById("password-input");
const issueCounterText = document.getElementById("issues-counter");
let issuesCounter = 0;
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("closed-btn");

function submitLoginForm() {
  if (username.value == "admin" && password.value == "admin123") {
    window.location.href = "main.html";
  } else {
    window.alert("Password didn't matched");
  }
}

function tabToggle(status) {
  if (status == "all-btn") {
    openBtn.classList.remove("btn-primary");
    closeBtn.classList.remove("btn-primary");
    allBtn.classList.add("btn-primary");
    getIssues("all");
  }
  if (status == "open-btn") {
    allBtn.classList.remove("btn-primary");
    closeBtn.classList.remove("btn-primary");
    openBtn.classList.add("btn-primary");
    getIssues("open");
  }
  if (status == "closed-btn") {
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closeBtn.classList.add("btn-primary");
    getIssues("closed");
  }
}

function getLabel(labels) {
  const div = document.createElement("div");
  div.innerHTML = "";
  labels.forEach((label) => {
    const span = document.createElement("span");
    span.innerText = "";
    span.innerText = `${label}`;
    span.classList.add(
      "px-2",
      "py-1",
      "text-xs",
      "text-[#EF4444]",
      "bg-[#FEECEC]",
      "rounded-full",
      "font-medium",
    );
    div.appendChild(span);
  });
  return div.innerHTML;
}

function displayData(issues) {
  issuesCounter = issues.length;
  issueCounterText.textContent = issuesCounter;
  const issuesCardContainer = document.getElementById("issues-card-container");
  issuesCardContainer.innerHTML = "";
  issues.forEach((e) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card ${e.status == "open" ? "border-t-3 border-green-500" : "border-t-3 border-purple-500"} shadow-md bg-white h-full">
          <div class="border-b-2 border-gray-200 p-4">
            <div class="flex justify-between items-center mb-3">
              <div class="status-img">
                <img class="w-6 h-6" src="assets/${e.status == "open" ? "Open" : "Closed"}-Status.png" alt="" />
              </div>
              <p
                class="w-20 py-1 text-center rounded-full text-xs ${e.priority == "high" ? "high" : e.priority == "medium" ? "medium" : "low"}"
              >
                ${e.priority}
              </p>
            </div>
            <h3 class="text-sm text-[#1F2937] font-semibold">
              ${e.title}
            </h3>
            <p class="text-xs text-[#64748B] mt-2 mb-3">
              ${e.description}
            </p>
            <div id="labels-container" class="flex flex-wrap gap-1">
              ${getLabel(e.labels)}
            </div>
          </div>
          <div class="p-4 text-xs text-[#64748B]">
            <p class="mb-2">${e.author.split("_").join(" ")}</p>
            <p>${new Date(e.createdAt).toLocaleDateString("en-US")}</p>
          </div>
        </div>
    `;
    issuesCardContainer.appendChild(card);
  });
}

async function getIssues(status) {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  if (status == "all") {
    displayData(data.data);
  }
  if (status == "open") {
    const opens = data.data.filter((e) => e.status == "open");
    displayData(opens);
  }
  if (status == "closed") {
    const closes = data.data.filter((e) => e.status == "closed");
    displayData(closes);
  }
}

getIssues("all");
