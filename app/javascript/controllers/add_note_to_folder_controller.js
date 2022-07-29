import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="add-note-to-folder"
export default class extends Controller {
  connect() {
    console.log("Connecting...");
    const csrfToken = document.querySelector("meta[name=csrf-token]").getAttribute("content")
  }

  add_note(){
    fetch("/folders/25" , {
      method: "PATCH",
      headers: { "Accept": "application/json", "X-CSRF-Token": this.csrfToken },
      body: new FormData()
    })
  }
}
