//Delete user

document.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("changeButtons")) return;

  const userId = event.target.dataset.id;

  if (event.target.classList.contains("deleteButton")) {
    const res = await fetch("/user/delete", {
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

  const editButton = document.getElementsByClassName("changeButtons")[0];

  //Setting input box values

  document.getElementById("edit-name-box").value = editButton.dataset.name;
  document.getElementById("edit-email-box").value = editButton.dataset.email;

  if (editButton.dataset.role == "user") {
    document.getElementsByTagName("option")[0].selected = true;
  } else {
    document.getElementsByTagName("option")[1].selected = true;
  }

  document.getElementById("idInput").value = editButton.dataset.id;

  //Events over popup box

  closeButton.addEventListener("click", () => {
    userEditPopup.style.display = "none";
  });

  editButton.addEventListener("click", (e) => {
    e.stopPropagation();
    userEditPopup.style.display = "block";
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
