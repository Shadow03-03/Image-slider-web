document.getElementById("fileUpload").addEventListener("change", previewImage);
document.getElementById("uploadBtn").addEventListener("click", uploadImage);

function previewImage() {
  const file = document.getElementById("fileUpload").files[0];
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.createElement("img");
    img.src = e.target.result;
    img.style.maxWidth = "300px";
    document.getElementById("preview").innerHTML = "";
    document.getElementById("preview").appendChild(img);
  };
  reader.readAsDataURL(file);
}

async function uploadImage() {
  const fileInput = document.getElementById("fileUpload");
  if (fileInput.files.length === 0) {
    alert("Please select a file first.");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      alert("Upload successful!");
      document.getElementById("preview").innerHTML = "";
      fileInput.value = "";
    } else {
      alert("Upload failed.");
    }
  } catch (error) {
    alert("Error uploading file: " + error.message);
  }
}
