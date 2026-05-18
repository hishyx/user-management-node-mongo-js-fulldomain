const container = document.querySelector("#user-list");
const rows = Array.from(document.querySelectorAll(".dashboard-box"));
const backdrop = document.getElementById("modal-backdrop");
const totalUsers = document.getElementById("total-users");
const emptyState = document.getElementById("empty-state");
const paginationSummary = document.getElementById("pagination-summary");
const paginationControls = document.getElementById("pagination-controls");
const pageNumbers = document.getElementById("page-numbers");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");

let pendingDeleteUserId = null;
let currentPage = 1;
const rowsPerPage = 5;

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.style.display = "block";
  if (backdrop) backdrop.classList.add("is-open");
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.style.display = "none";

  const hasOpenModal = document.querySelector(".modal.is-open");
  if (!hasOpenModal && backdrop) backdrop.classList.remove("is-open");
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => closeModal(modal));
  pendingDeleteUserId = null;
}

async function deleteUser(userId) {
  const res = await fetch("/admin/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
    }),
  });

  if (!res.ok) {
    console.error("Delete failed");
    return;
  }

  location.reload();
}

if (totalUsers) {
  totalUsers.textContent = rows.length;
}

if (container && emptyState && rows.length === 0) {
  emptyState.style.display = "block";
}

function renderPagination() {
  if (!paginationControls || !pageNumbers || !prevPageButton || !nextPageButton) {
    return;
  }

  const pageCount = Math.ceil(rows.length / rowsPerPage);

  if (rows.length === 0) {
    paginationControls.style.display = "none";
    if (paginationSummary) paginationSummary.textContent = "No results to show";
    return;
  }

  paginationControls.style.display = pageCount > 1 ? "flex" : "none";
  currentPage = Math.min(currentPage, pageCount);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, rows.length);

  rows.forEach((row, index) => {
    const isVisible = index >= startIndex && index < endIndex;
    row.style.display = isVisible ? "table-row" : "none";
  });

  if (paginationSummary) {
    paginationSummary.textContent = `Showing ${startIndex + 1}-${endIndex} of ${rows.length} users`;
  }

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === pageCount;

  pageNumbers.innerHTML = "";

  for (let page = 1; page <= pageCount; page += 1) {
    const pageButton = document.createElement("button");
    pageButton.type = "button";
    pageButton.textContent = page;
    pageButton.className = page === currentPage ? "active-page" : "";
    pageButton.setAttribute("aria-label", `Go to page ${page}`);
    pageButton.addEventListener("click", () => {
      currentPage = page;
      renderPagination();
    });

    pageNumbers.appendChild(pageButton);
  }
}

if (prevPageButton) {
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderPagination();
    }
  });
}

if (nextPageButton) {
  nextPageButton.addEventListener("click", () => {
    const pageCount = Math.ceil(rows.length / rowsPerPage);
    if (currentPage < pageCount) {
      currentPage += 1;
      renderPagination();
    }
  });
}

renderPagination();

const closeButton = document.getElementById("close-button");
const userEditPopup = document.getElementById("user-edit-wrapper");

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("editButton")) {
    event.stopPropagation();

    document.getElementById("edit-name-box").value = target.dataset.name;
    document.getElementById("edit-email-box").value = target.dataset.email;

    const roleSelect = document.getElementById("role");
    if (roleSelect) {
      roleSelect.value = target.dataset.role;
    }

    document.getElementById("idInput").value = target.dataset.id;
    openModal(userEditPopup);
  }

  if (target.classList.contains("deleteButton")) {
    event.stopPropagation();
    pendingDeleteUserId = target.dataset.id;
    openModal(document.getElementById("delete-confirm-wrapper"));
  }
});

if (closeButton) {
  closeButton.addEventListener("click", () => closeModal(userEditPopup));
}

const creationCloseButton = document.getElementById("create-close-button");
const userCreatePopup = document.getElementById("create-user-wrapper");
const addUserButton = document.getElementById("add-button");

if (creationCloseButton) {
  creationCloseButton.addEventListener("click", () => closeModal(userCreatePopup));
}

if (addUserButton) {
  addUserButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openModal(userCreatePopup);
  });
}

const cancelDeleteButton = document.getElementById("cancel-delete-button");
const confirmDeleteButton = document.getElementById("confirm-delete-button");

if (cancelDeleteButton) {
  cancelDeleteButton.addEventListener("click", () => {
    closeModal(document.getElementById("delete-confirm-wrapper"));
    pendingDeleteUserId = null;
  });
}

if (confirmDeleteButton) {
  confirmDeleteButton.addEventListener("click", () => {
    if (pendingDeleteUserId) deleteUser(pendingDeleteUserId);
  });
}

if (backdrop) {
  backdrop.addEventListener("click", closeAllModals);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllModals();
  }
});
