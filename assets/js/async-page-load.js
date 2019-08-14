window.onload = function() {
    // Make links load asynchronously
    document.body.addEventListener("click", function(event) {
      if (event.target.tagName !== "A")
        return;
  
      // History API needed to make sure back and forward still work
      if (history === null)
        return;
  
      event.preventDefault();
  
      // External links should instead open in a new tab
      var newUrl = event.target.href;
      var domain = window.location.origin;
      if (typeof domain !== "string" || newUrl.search(domain) !== 0) {
        window.open(newUrl, "_blank");
      } else {
        loadPage(newUrl);
        history.pushState(null /*stateObj*/, "" /*title*/, newUrl);
      }
    });
  }

  function loadPage(newUrl) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState !== XMLHttpRequest.DONE)
        return;
  
      var newDocument = httpRequest.responseXML;
      if (newDocument === null)
        return;
  
      var newContent = httpRequest.responseXML.getElementById("mainContent");
      if (newContent === null)
        return;
  
      document.title = newDocument.title;
  
      var contentElement = document.getElementById("mainContent");
      contentElement.replaceWith(newContent);
    }
  
    httpRequest.responseType = "document";
    httpRequest.open("GET", newUrl);
    httpRequest.send();
  };