var submitUrl = document.querySelector("#submit-url");
var urlInput = document.querySelector("#url-input")
var chartCon = document.querySelector("#comments-likes-chart")

// Make sure the client is loaded before calling this method.
function getComments(videoID) {
  fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoID}&key=AIzaSyBQM1YK0xl9l3Bvy2OntNplW7gTx9RZkGs`).then(function(response) {
    if (response.ok) {
      response.json()
      .then(function(data) {
        console.log(data)
      })
    } else {
      console.log("response not ok")
    }
  })
}

function getVideoStats(videoID) {
  fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoID}&key=AIzaSyBQM1YK0xl9l3Bvy2OntNplW7gTx9RZkGs`).then(function(response) {
    if (response.ok) {
      response.json()
      .then(function(data) {
        getChart(data)
      })
    } else {
      console.log("response not ok")
    }
  })
}

function getChart(videoData) {

  fetch("https://quickchart.io/chart/create", {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({
      "backgroundColor": "transparent",
      "width": 500,
      "height": 300,
      "format": "png",
      "chart": `{type:'doughnut',data:{labels:['Comments','Likes','Views'],datasets:[{data:[120,30000,800000]}]},options:{plugins:{doughnutlabel:{labels:[{text:'550',font:{size:20}},{text:'total'}]}}}}`
    })
  }).then(function(response) {
    if(response.ok) {
      response.json()
      .then(function(data) {
        displayChart(data.url);
      })
    } else {console.log("response not ok")}
  })
}

function displayChart(chartUrl) {
  var newImg = document.createElement("img");
  newImg.id = "chart-image";
  console.log(chartUrl)
  newImg.setAttribute("src", chartUrl);
  chartCon.appendChild(newImg);
}

submitUrl.addEventListener("click", function getVideoID(event) {
  event.preventDefault();
  console.log(urlInput.value.split('=')[1])
  // getVideoStats(urlInput.value.split('=')[1])
  getChart("data")});

