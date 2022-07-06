import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="sidebar"
export default class extends Controller {
  static targets = ["sidebarDiv"];
  connect() {
    console.log( document.body.clientWidth);
    if(document.body.clientWidth > 600){
      console.log(this.sidebarDivTarget)
      this.sidebarDivTarget.classList.remove('close');
      this.sidebarDivTarget.classList.add('transition');

    }else{
      this.sidebarDivTarget.classList.add('close');
    }
  }

  toggleClose() {
    if(document.body.clientWidth > 600){
      this.sidebarDivTarget.classList.toggle('close');
    }else{
      this.sidebarDivTarget.classList.toggle('small-screen');
    }
  }
}
