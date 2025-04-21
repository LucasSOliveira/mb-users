let toastList = [];

export default function createToast(params = {}) {
  const {
    message = "Sucesso!",
    type = "success",
    duration = 3000,
    icon = type === "error" ? "error" : type === "warning" ? "warning" : "check_circle",
  } = params;

  const toastIndex = toastList.length + 1;
  let toastContainer = document.getElementById("toast-container");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toastHTML = `
    <div id="toast-el-${toastIndex}" class="toast toast--${type}">
      <i class="material-symbols-outlined toast__icon">${icon}</i>
      <span class="toast__text">${message}</span>
    </div>
  `;
  toastList.push(toastIndex);

  const tempDiv = document.createElement("div");
  tempDiv.id = `temp-div-${toastIndex}`;
  tempDiv.innerHTML = toastHTML;

  toastContainer.appendChild(tempDiv);

  // Importa o CSS dinamicamente
  import("./toast.scss").then(() => {
    setTimeout(() => {
      const toastElementOut = document.getElementById(`toast-el-${toastIndex}`);
      toastElementOut?.classList.add("fade-out");

      setTimeout(() => {
        tempDiv.remove();
        toastList = toastList.filter((item) => item !== toastIndex);
      }, 2000);
    }, duration);
  });
}