console.clear()

let currentDate = new Date();
let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

var csv = "Domain,Subdomain,Time\n";

function record() {
    

    chrome.storage.local.get(["location"], function(result) {
      if (result["location"] != undefined) {
        chrome.storage.local.get(null, function(result) {
        result.location.push(location.hostname)
        chrome.storage.local.set({["location"]: result.location});
        result.subdomain.push(location.href)
        chrome.storage.local.set({["subdomain"]: result.subdomain});
        result.time.push(time)
        chrome.storage.local.set({["time"]: result.time});
    }); 
    }
    else {
        chrome.storage.local.set({["location"]: [location.hostname]});
        chrome.storage.local.set({["subdomain"]: [location.href]});
        chrome.storage.local.set({["time"]: [time]});
    }
  });
  console.log(time)
  };


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  record()
});

document.addEventListener('DOMContentLoaded', function() {
//create a user-defined function to download CSV file
  var csv_btn = document.getElementById("exportCsv")
  csv_btn.addEventListener("click", function() {  

    chrome.storage.local.get(null, function(result) {
      console.log(result);
      for (let i = 0; i < result.time.length; i++) {
        csv += [result.location[i], result.subdomain[i], result.time[i]].join(',');
        csv += "\n";
      };
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
      hiddenElement.target = '_blank';  
      //provide the name for the CSV file to be downloaded  
      hiddenElement.download = 'test.csv';  
      hiddenElement.click(); 
    });
    chrome.storage.local.clear()
  }, false);
}, false);
