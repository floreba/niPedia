import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="text-update"
export default class extends Controller {
  static targets = ["form"]

  connect() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").getAttribute("content")
    // console.log("Connecting to text-update");
    console.log(this.formTarget.action);
    console.log(this.formTarget.action);
  }

  add() {
    // console.log("Updating text-update");
    fetch(this.formTarget.action, {
      method: "PATCH",
      headers: { "Accept": "application/json", "X-CSRF-Token": this.csrfToken },
      body: new FormData(this.formTarget)
    })
  }

  update() {
    // console.log("Updating text-update");
    fetch(this.formTarget.action, {
      method: "PATCH",
      headers: { "Accept": "application/json", "X-CSRF-Token": this.csrfToken },
      body: new FormData(this.formTarget)
    })
  }
}
