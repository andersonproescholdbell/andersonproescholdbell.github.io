//switches tabs by setting visibility
function openTab(tabName) {
  var i, tabcontent, tabbutton;
  tabcontent = document.getElementsByClassName("tabcontent");
  tabbutton = document.getElementsByClassName("tabButton");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabbutton[i].style.backgroundColor = "#2196F3";
  }
  document.getElementById(tabName).style.display = "block";
  document.getElementById(tabName+"btn").style.backgroundColor = "#90CAF9";
  document.cookie = "activeTab=" + tabName;
}

//sees which tab was the last used by user so it can be opened by default next time
function lastActive() {
  let cooks = document.cookie.split(';');
  var lastActive;
  for (let i = 0; i < cooks.length; i++) {
    while (cooks[i].charAt(0) === ' ') {
      cooks[i] = cooks[i].substr(1);
    }
    if (cooks[i].startsWith("activeTab")) {
      lastActive = cooks[i];
    }
  }

  if (typeof lastActive !== "undefined") {
    try {
      lastActive = String(lastActive);
      lastActive = lastActive.split('=');
      lastActive = lastActive[1];
    }
    catch(err) {
      lastActive = "tfDiv";
    }
  }
  else {
    lastActive = "tfDiv";
  }

  var tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(lastActive).style.display = "block";
  document.getElementById(lastActive+"btn").style.backgroundColor = "#90CAF9";
  document.cookie = "activeTab=" + lastActive;
}
