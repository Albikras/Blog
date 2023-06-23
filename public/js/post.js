const sumbitReview = async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  console.log(title);
  console.log(content);

  if (title && content) {
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert("failed to create review");
    }
  }
};

document.querySelector(".submitPost").addEventListener("submit", sumbitReview);

const delBtn = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("failed to delete");
    }
  }
};

document.querySelector(".deleting").addEventListener("click", delBtn);

