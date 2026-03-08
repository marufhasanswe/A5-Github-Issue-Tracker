const username = document.getElementById("username-input");
const password = document.getElementById("password-input");
const issueCounterText = document.getElementById("issues-counter");
let issuesCounter = 0;
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("closed-btn");
const searchInputField = document.getElementById("search-input-field");

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
    span.innerHTML = "";
    span.innerHTML = `
      <span class="inline-block align-middle px-2 py-1 text-xs outline ${label == "bug" ? "text-[#EF4444] bg-[#FEECEC]" : label == "enhancement" ? "bg-[#DEFCE8] text-[#00A96E]" : "bg-[#FFF8DB] text-[#D97706]"} rounded-full font-medium">
      <img src="${label == "bug" ? "assets/bug.png" : label == "enhancement" ? "assets/enhancement.png" : "assets/documentation.png"}" class="inline-block align-middle"/>
       ${label.toUpperCase()}
      </span>
    `;
    div.appendChild(span);
  });
  return div.innerHTML;
}

async function showIssuesModal(id) {
  const myModal = document.getElementById("my_modal_5");
  myModal.showModal();
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  const modalContentContainer = document.getElementById(
    "modal-content-container",
  );
  modalContentContainer.innerHTML = "";
  const modalContent = document.createElement("div");
  modalContent.innerHTML = "";
  modalContent.innerHTML = `
          <h4 class="text-2xl font-bold text-[#1F2937]">
              ${data.data.title}
            </h4>
            <div class="flex items-center gap-2 mt-3">
              <p
                class=" ${data.data.status == "open" ? "bg-[#00A96E]" : "bg-red-400"} text-white text-xs font-medium rounded-full py-1 px-2"
              >
                ${data.data.status}
              </p>
              <p class="text-[4px] text-[#64748B]">
                <i class="fa-solid fa-circle align-bottom"></i>
              </p>
              <p class="text-xs text-[#64748B]">${data.data.author.split("_").join(" ")}</p>
              <p class="text-[4px] text-[#64748B]">
                <i class="fa-solid fa-circle align-bottom"></i>
              </p>
              <p class="text-xs text-[#64748B]">${new Date(data.data.createdAt).toLocaleDateString("en-US")}</p>
            </div>
            <div id="modal-label-container" class="flex gap-1.5 my-6">
              ${getLabel(data.data.labels)}
            </div>
            <p class="text-[#64748B]">
              ${data.data.description}
            </p>
            <div class="bg-[#F8FAFC] rounded-lg p-4 grid grid-cols-2 my-6">
              <div>
                <p class="text-[#64748B] mb-1">Assign:</p>
                <p class="text-[#1F2937] font-semibold">${data.data.assignee ? data.data.assignee.split("_").join(" ") : "Not assigned"}</p>
              </div>
              <div>
                <p class="text-[#64748B] mb-1">Priority</p>
                <p
                  class="${data.data.priority == "high" ? "high" : data.data.priority == "medium" ? "medium" : "low"} outline text-xs font-medium rounded-full py-1 px-4 inline-block"
                >
                  ${data.data.priority}
                </p>
              </div>
            </div>
  
  `;
  modalContentContainer.appendChild(modalContent);
}

function displayData(issues) {
  issuesCounter = issues.length;
  issueCounterText.textContent = issuesCounter;
  const issuesCardContainer = document.getElementById("issues-card-container");
  issuesCardContainer.innerHTML = "";
  issues.forEach((e) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card ${e.status == "open" ? "border-t-3 border-[#00A96E]" : "border-t-3 border-[#A855F7]"} shadow-md bg-white h-full">
          <div class="border-b-2 border-gray-200 p-4" onclick="showIssuesModal(${e.id})">
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

async function searchIssues() {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInputField.value}`,
  );
  const data = await res.json();
  displayData(data.data);
}

getIssues("all");
