import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="text-update"
export default class extends Controller {
  static targets = ["content"]

  connect() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").getAttribute("content")
    console.log("Connecting to text-update");
    console.log(this.contentTarget.action);
  }

  update() {
    console.log("Updating text-update");
    fetch(this.contentTarget.action, {
      method: "PATCH",
      headers: { "Accept": "application/json", "X-CSRF-Token": this.csrfToken },
      body: new FormData(this.contentTarget)
    })
    .then(response => console.log(response))
    console.log(this.contentTarget);
  }
}
