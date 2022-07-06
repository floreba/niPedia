import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="sidebar"
export default class extends Controller {
  static targets = ["sidebarDiv", "profileDetails"];
  connect() {
    // console.log( document.body.clientWidth);
    if(document.body.clientWidth > 600){
      // console.log(this.sidebarDivTarget)
      if (sessionStorage.sideBarClasses.includes('close')) {
        this.sidebarDivTarget.classList.add('close');
        // this.profileDetailsTarget.classList.remove('profile-transition');
        // this.sidebarDivTarget.classList.remove('transition');
      }
      else{
        this.profileDetailsTarget.classList.add('profile-transition');
        this.sidebarDivTarget.classList.add('transition');
      }
    }else{
      this.sidebarDivTarget.classList.add('close');
      if (sessionStorage.sideBarClasses.includes('small-screen')){
        this.sidebarDivTarget.classList.add('small-screen');
      }
      // Class transition makes the sidebar open and close smoothly
      // But in small scree when class transition exists it opens the entire sidebar and close every time refreshed
    }
  }

  toggleClose() {
    if(document.body.clientWidth > 600){
      this.sidebarDivTarget.classList.toggle('close');
      this.sidebarDivTarget.classList.add('transition');
      this.profileDetailsTarget.classList.add('profile-transition');
    }else{
      this.sidebarDivTarget.classList.toggle('small-screen');
      // Transition added here to make the smallscreen sidebar to toggle smoothly
      this.sidebarDivTarget.classList.add('transition');
    }
    sessionStorage.sideBarClasses = this.sidebarDivTarget.classList;
  }
}
