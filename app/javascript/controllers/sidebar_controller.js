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
      // console.log(window.location.href.slice(-5))

    // TEMPORARY Solution for highlighting page nav
      let urlEnd = window.location.href.slice(-4)
      // console.log(urlEnd)
      // document.getElementById(urlEnd).classList.add("active");

      switch (window.location.href.endsWith(urlEnd)) {
        case urlEnd === "edit":
          document.getElementById(urlEnd).classList.add("active");
          break;
        case urlEnd === "otes":
          document.getElementById("notes").classList.add("active");
          break;
        case urlEnd === "html":
          document.getElementById("graph").classList.add("active");
          break;
        case urlEnd === "/new":
          document.getElementById("new").classList.add("active");
          break;
        case urlEnd === "ders":
          document.getElementById("folders").classList.add("active");
          break;
      }
    //   {

    //   // document.getElementById("edit").classList.add("active");
    //   console.log("yes")
    // }
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
