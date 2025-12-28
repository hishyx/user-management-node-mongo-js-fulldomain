//Delete user

document.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("changeButtons")) return;

  const userId = event.target.dataset.id;

  if (event.target.classList.contains("deleteButton")) {
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
});

//Checking if there is users in list

const container = document.querySelector("#user-list");

const hasDashboardBox = container.querySelector(".dashboard-box") !== null;

//Edit user popup

if (hasDashboardBox) {
  const closeButton = document.getElementById("close-button");

  const userEditPopup = document.getElementById("user-edit-wrapper");

  // Delegated Event Listener for Edit Buttons
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("editButton")) {
      e.stopImmediatePropagation();
      const btn = e.target;
      const userEditPopup = document.getElementById("user-edit-wrapper");

      // Populate form
      document.getElementById("edit-name-box").value = btn.dataset.name;
      document.getElementById("edit-email-box").value = btn.dataset.email;
      
      // select role safely
      const roleSelect = document.getElementById("role");
      if(roleSelect) {
          roleSelect.value = btn.dataset.role;
      }

      document.getElementById("idInput").value = btn.dataset.id;

      // Show popup
      userEditPopup.style.display = "block";
    }
  });

  // Events over popup box

  closeButton.addEventListener("click", () => {
    userEditPopup.style.display = "none";
  });


  document.addEventListener("click", (e) => {
    if (userEditPopup.style.display == "block") {
      if (userEditPopup.contains(e.target)) return;

      document.getElementById("user-edit-wrapper").style.display = "none";
    }
  });
}

//User creation

const creationCloseButton = document.getElementById("create-close-button");

const userCreatePopup = document.getElementById("create-user-wrapper");

const addUserButton = document.getElementById("add-button");

creationCloseButton.addEventListener("click", () => {
  userCreatePopup.style.display = "none";
});

addUserButton.addEventListener("click", (e) => {
  e.stopPropagation();
  userCreatePopup.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (userCreatePopup.style.display == "block") {
    if (userCreatePopup.contains(e.target)) return;

    userCreatePopup.style.display = "none";
  }
});
