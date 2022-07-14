import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="sidebar"
export default class extends Controller {
  static targets = ["sidebarDiv", "profileDetails"];
  connect() {
    // if(document.body.clientWidth > 600){
    //   if (sessionStorage.sideBarClasses.includes('close')) {
    //     this.sidebarDivTarget.classList.add('close');
    //   }
    //   else{
    //     this.profileDetailsTarget.classList.add('profile-transition');
    //     this.sidebarDivTarget.classList.add('transition');
    //   }
    // }else{
    //   // Class transition makes the sidebar open and close smoothly
    //   // But in small screen when class transition exists it opens the entire sidebar and close every time refreshed
    //   this.sidebarDivTarget.classList.add('close');
    //   if (sessionStorage.sideBarClasses.includes('small-screen')){
    //     this.sidebarDivTarget.classList.add('small-screen');
    //   }
    // }
    if (document.body.clientWidth < 600) {
      this.sidebarDivTarget.classList.add('close');
      this.sidebarDivTarget.classList.add('small-screen');
    }
  }

  // Toggle part not in feature

  // toggleClose() {
  //   if(document.body.clientWidth > 600){
  //     this.sidebarDivTarget.classList.toggle('close');
  //     this.sidebarDivTarget.classList.add('transition');
  //     this.profileDetailsTarget.classList.add('profile-transition');
  //   }else{
  //     this.sidebarDivTarget.classList.toggle('small-screen');
  //     // Transition added here to make the smallscreen sidebar to toggle smoothly
  //     this.sidebarDivTarget.classList.add('transition');
  //   }
  //   // let you store key/value pairs in the browser in the client side
  //   // Its used here to decide whether to leave the sidebar open/close when navigating through pages
  //   sessionStorage.sideBarClasses = this.sidebarDivTarget.classList;
  // }
}
