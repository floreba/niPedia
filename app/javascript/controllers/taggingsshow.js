function displayReferences() {
  const references = document.getElementById("references");
  const tagshow = document.getElementById("tagshow");
  if (references.style.display === "none") {
    references.style.display = "block";
    tagshow.innerHTML = "expand_more";

  } else {
    references.style.display = "none";
    tagshow.innerHTML = "expand_less";
  }
}
