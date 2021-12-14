var submitUrl = document.querySelector("#submit-url");
var urlInput = document.querySelector("#url-input")

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
        console.log(data)
      })
    } else {
      console.log("response not ok")
    }
  })
}

submitUrl.addEventListener("click", function getVideoID(event) {
  event.preventDefault();
  console.log(urlInput.value.split('=')[1])
  getVideoStats(urlInput.value.split('=')[1])});

