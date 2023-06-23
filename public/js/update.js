const updateBtn = async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const id = event.target.getAttribute("data-id");
  console.log(id);

  if (title && content) {
    const response = await fetch(`api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to edit post");
    }
  }
};

document.querySelector(".update").addEventListener("click", updateBtn);
