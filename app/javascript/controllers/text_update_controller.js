import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="text-update"
export default class extends Controller {
  static targets = ["form", "formContainer", "name"]

  connect() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").getAttribute("content")
    //console.log("Connecting to text-update");
    // console.log(this.formTarget.action);
    // console.log(this.nameTarget.value);
  }

  update() {
    // console.log("Updating text-update");
    fetch(this.formTarget.action , {
      method: "PATCH",
      headers: { "Accept": "application/json", "X-CSRF-Token": this.csrfToken },
      body: new FormData(this.formTarget)
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      let name = document.getElementById("note-name"); // children[0].children[0];
      let updateTime = document.getElementById("note-date");
      name.innerText = `${data.name}`;
      updateTime.innerText = `${data.updated_at.strftime("%B %-d, %Y")}`
    })
    
  }
}
