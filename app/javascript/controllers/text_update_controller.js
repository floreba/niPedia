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
      let name = this.formContainerTarget.parentNode.children[0];
      let updateTime = this.formContainerTarget.parentNode.children[1];
      name.innerText = `Edit your Note: ${data.name}`;
      updateTime.innerText = `Updated at ${data.updated_at}`
    })
    
  }
}
