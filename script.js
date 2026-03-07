const username = document.getElementById("username-input");
const password = document.getElementById("password-input");

function submitLoginForm() {
  if (username.value == "admin" && password.value == "admin123") {
    window.location.href = "main.html";
  } else {
    window.alert("Password didn't matched");
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
  const issuesCardContainer = document.getElementById("issues-card-container");
  issuesCardContainer.innerHTML = "";
  issues.forEach((e) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card shadow-md bg-white h-full">
          <div class="border-b-2 border-gray-300 p-4">
            <div class="flex justify-between items-center mb-3">
              <div class="status-img">
                <img class="w-6 h-6" src="assets/Open-Status.png" alt="" />
              </div>
              <p
                class="w-20 py-1 text-center rounded-full text-xs bg-[#FEECEC] text-[#EF4444]"
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
            <p class="mb-2">#1 by john_doe</p>
            <p>1/15/2024</p>
          </div>
        </div>
    `;
    issuesCardContainer.appendChild(card);
  });
}

async function getAllIssues() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayData(data.data);
}

getAllIssues();
