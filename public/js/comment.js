const submitComment = async (event) => {
  event.preventDefault();

  const message = document.querySelector("#comment").value.trim();
  const post_id = parseInt(document.location.href.split("/")[4]);
  console.log(message);

  const response = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({ message, post_id }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (response.ok) {
    document.location.reload();
  } else {
    console.log(response.status); // Log the status code
    const errorData = await response.json(); // Parse the response body as JSON
    console.log(errorData); // Log the error
    alert("failed to create comment");
  }
};

document
  .querySelector(".submitComment")
  .addEventListener("submit", submitComment);

