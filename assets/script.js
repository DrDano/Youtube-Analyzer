var submitUrl = document.querySelector("#submit-url");
var urlInput = document.querySelector("#url-input");
var chartCon = document.querySelector("#comments-likes-chart");
var commentCon = document.querySelector("#comments-container");
var totalCommentLikes = 0;

// Make sure the client is loaded before calling this method.
function getComments(videoID) {
  fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoID}&key=AIzaSyBQM1YK0xl9l3Bvy2OntNplW7gTx9RZkGs`).then(function(response) {
    if (response.ok) {
      response.json()
      .then(function(data) {
        console.log(data)
        displayComments(data)
      })
    } else {
      console.log("response not ok")
    }
  })
}

function displayComments(commentData) {
  var commentArr = commentData.items
  for (var i = 0; i < commentArr.length; i++) {
    var newLi = document.createElement("li");
    newLi.id = `comment-${i}`;
    newLi.innerText = commentArr[i].snippet.topLevelComment.snippet.textOriginal;
    totalCommentLikes += parseInt(commentArr[i].snippet.topLevelComment.snippet.likeCount);
    commentCon.appendChild(newLi);
  }
  getVideoStats(urlInput.value.split('=')[1]);
}

function getVideoStats(videoID) {
  fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoID}&key=AIzaSyBQM1YK0xl9l3Bvy2OntNplW7gTx9RZkGs`).then(function(response) {
    if (response.ok) {
      response.json()
      .then(function(data) {
        console.log(data)
        getChart(data)
      })
    } else {
      console.log("response not ok")
    }
  })
}

function getChart(videoData) {
  var comments = videoData.items[0].statistics.likeCount
  var likes = videoData.items[0].statistics.commentCount
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
      "chart": `{type:'doughnut',data:{labels:['Comments','Likes', 'Likes on Comment Threads'],datasets:[{data:[${likes},${comments},${totalCommentLikes}]}]},options:{plugins:{doughnutlabel:{labels:[{text:'${parseInt(comments) + parseInt(likes) + parseInt(totalCommentLikes)}',font:{size:20}},{text:'total'}]}}}}`
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
  newImg.setAttribute("src", chartUrl);
  chartCon.appendChild(newImg);
}

submitUrl.addEventListener("click", function getVideoID(event) {
  event.preventDefault();
  // getVideoStats(urlInput.value.split('=')[1])
  getComments(urlInput.value.split('=')[1]);
});

