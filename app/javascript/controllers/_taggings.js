$(function(){
  let myArray   = ["your_tag"], //define the array that contains the tags
      input     = $(".input"),  // define the only input in the page

      addTag    = (text) => { // the add tag function
      input.before(`<span class='tag' data-value='${text}'>${text}<i class="fas fa-times-circle"></i></span>`);

      charsLengthSpan.html(maxChars); // to reset the max chars after adding the tag
      },

      removeTag = (text, removeStyle = "hard" ) => { //the remove tag function
          var index = myArray.indexOf(text);
          myArray.splice(index, 1); //remove the tag from the array first
          if(removeStyle == "hard") {
              $(".tags-and-input").find(`.tag[data-value='${text}']`).remove(); //then remove the tag from the DOM
          }

          if (removeStyle = "soft") {
              $(".tags-and-input").find(`.tag[data-value='${text}']`).animate({
                  width:   0,
                  padding: 0,
                  margin:  0
              }, 400, function() {
                  $(this).remove();
              });

              input.val(text);
          }

          //calculate the rest of tags length after removing tags
          tagsLengthSpan.html(maxTags - myArray.length);

          //reset the tagsLengthSpan to its normal mode
          $(".container .details .tags-length").removeClass("max");
          tagsLengthSpan.css("color", "#48cae4");
      },


      //define the max and min chars and tags and insert them into spans
      maxChars = 15,
      maxTags  = 8,
      charsLengthSpan = $(".details .char-length span"),
      tagsLengthSpan = $(".details .tags-length span");

      charsLengthSpan.html(maxChars);
      tagsLengthSpan.html(maxTags);

       //generally, focus in the input when open the window directly
       input.focus();

      //change the chars limit depending on typing in the input
      input.on("input", function() {
          if(input.val().length > maxChars) {
              charsLengthSpan.html("0");
              $(".details .char-length").addClass("max");
              charsLengthSpan.css("color", "#df2935");
          } else {
              charsLengthSpan.html(maxChars - input.val().length);
              $(".details .char-length").removeClass("max");
              charsLengthSpan.css("color", "#48cae4");
          }

      });


      //showError function >> slideDown and slideUp the specific error depending on its type at specific duration
      var fadeInError = true;
      function showError(errorType) {
          var duration = 2000;
          if (fadeInError == true) {
              $(`.errors .error.${errorType}`).slideDown(200).delay(duration).slideUp(200);
              fadeInError = false; //to not repeat multi errors if the user make more errors in closest times because this may make a confuse
              returnFadeInErrorToTrueAgain = setTimeout( () => { //must return the fadeInError to true value after the same duration that the existed error takes to slideUp, and this for allowing to show another error after the existed error is slidingUp
                  fadeInError = true;
              }, duration)
          }
      }



      //the errorsTypes function
      function errorsTypes () {
          var currentValue = input.val().trim().replace(/\s|,/, ""),
              pattern = /^[A-Za-z0-9ء-ي_]+$/g;

          input.val(currentValue); //very important to set the new value in the input after replace (whitespaces and ,)

          if (currentValue == "") { //the input value is empty
              showError("empty");
          } else if (!pattern.test(currentValue)) { //the value is not match the pattern
              showError("syntax");
          } else if (/^_/.test(currentValue)) { // the value start with (_)
              showError("underscore");
          } else if (myArray.indexOf(currentValue) != -1) {  // the value is already existed
              showError("already")
          } else if (currentValue.length > maxChars) { //reach the max chars
              showError("max_chars");
          } else if (myArray.length == maxTags) { //reach the max tags
              showError("max_tags");
          } else { //the Mechanism of adding Tags
              if(currentValue.charAt(currentValue.length -1) == "_") {// the value ends with (_)
                  var newValue = currentValue.replace(currentValue.charAt(currentValue.length -1), "");
                  myArray.push(newValue);
                  addTag(newValue);
                  input.focus();
                  tagsLengthSpan.html(maxTags - myArray.length); //calcult

              } else { //the value doesn't end with (_)
                  myArray.push(currentValue);
                  addTag(currentValue);
                  input.val("");
                  input.focus();
                  tagsLengthSpan.html(maxTags - myArray.length); //calculate the rest of tags length after adding tags


              }
          }
      }


      //Using the keydown event with deleting tag to get the correct reuired effect
      var valueLength = 1;
      input.on("keydown", function() {valueLength = $(this).val() == "" ? 0 : 1;})


      //the keys that add and remove tag
      input.on("keyup", function(e) {
          /*Must be keyup event for adding and deleting together ,to show the perfect correct effect, but deleting also need keydown event
          to make the effect correct 100% because if we don't use keydown event with the deleting it will delete the last letter of the
          value that is returned from the deleted tag, {keydown event is already used above with its condition, you only need to check on its condition when you deleting in this function below}*/
          var key = e.keyCode || e.which,
              apostropheKey = key == 188,
              enterKey      = key == 13,
              whitespaceKey = key == 32,
              backspaceKey  = key == 8,
              deleteKey     = key == 46,
              keyCondition;

          //the key that adding tags.
          if(input.val().charCodeAt(0) > 1500) { // if the value of the input start with arabic letter (arabic letters must have ASCII code bigger than 1500) , but (english letters must have ASCII code smaller than 200)
              keyCondition = enterKey || whitespaceKey; // so prevent the apostropheKey from adding value as tag because the key now is an arabic letter not apostropheKey
          } else { // the value start with english leter
              keyCondition = enterKey || whitespaceKey || apostropheKey; // allow now the apostropheKey to add a value as a tag
          }

          /*before adding a tag with the adding key, you must check the erros in the errorsTypes function and if all the conditions
            are checked correctly the errorsTags itself will add the Tag automatically,
            because it has (an adding tags mechanism) > the last result for (else) that refers to adding tag if all conditions are checked correctly*/
          if (keyCondition) {
              errorsTypes();

              if (myArray.length == maxTags) {
                  $(".container .details .tags-length").addClass("max");
                  tagsLengthSpan.css("color", "#df2935");
              }
          }

          //the key that deleting tags
          if(backspaceKey || deleteKey) {
              if (valueLength == 0) {
                  /*check before remove chars by backspace or delete keys that the input value is empty so we can remove the previous tag safely,
                  if the value is not empty there will be a confuse because the backspace or delete keys will delete some characters of the existed tag in the input value,
                  and also delete the previous value in the array, this is very conflict,*/
                  removeTag(myArray[myArray.length - 1], "soft");
              }
          }
      })

      //remove tag if you clicked in the cross sign of the tag
      $(".tags-and-input").on("click", "i", function() {  // (i) is a future element
          removeTag($(this).parent().attr("data-value"), "hard")
      });

      //control the focus shape if clicked the tags container or the tag itself or if (focus and blur of input)
      //if clicked the tags container
      $(".content").on("click", function() {
          input.focus();
      });

      //if focus and blur the input
      input.on({
          focus: function () {
          $(".content").addClass("focus");
          $(".results-errors").fadeOut(400)
          },
          blur: function ()  {
              $(".content").removeClass("focus");
          }
      });

      //if clicked the tags itself
      $(".content").on("click", ".tag", function(e) {
          e.stopPropagation(); //the focus event that happens to the input if we clicked the tags container body , stop it if we clicked the tags itself
      });

      //the results and the results errors when clicked on the add the tags button
      $(".add_tags").on("click", function() {
          if(myArray.length == 0) {
              $(".results-errors").fadeIn(400);
              $(".array").fadeOut();
          } else {
             var result = "The Result is ["

             myArray.forEach((tag, index) => {
               result += `<div class="result"><span class="index">${index}</span><span class="text">${tag}</span></div>`;
             });

             result += "]";
             result += `<span><i class="fas fa-plus"></i></span>`;  //this is a future element

             $('.array').html(result);
              /*use html and don't use prepend , because prepend will not remove the old result and will add the new result with the old one together,
              but html will remove the old result and set the new result instead*/

             $(".array").fadeIn(400);
          };
      });

      //if clicked in the plus sign at the top of the result container
      $(".array").on("click","span", function() { //span is a future element
          $(this).parent().fadeOut(400);
      }) ;

});
