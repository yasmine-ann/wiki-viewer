var controller = {
  init: function init() {
    controller.setupListener();
    controller.setupRandomListener();

  },

  getArticle: function getArticle() {
    var inputValue = $("#search-box").val();
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=info|extracts&exsentences=1&exintro&explaintext&exlimit=max&inprop=url&generator=search&format=json&gsrsearch=";
    url += inputValue;

    $.ajax({
      url: url,
      dataType: 'jsonp'
    })
    .done(function(data) {
      var wikiData = data.query.pages;
      view.clearEntries();
      view.renderResults(wikiData);
    });
  },

  getRandomArticle: function getRandomArticle() {
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=info|extracts&exsentences=1&exintro&explaintext&exlimit=1&inprop=url&generator=random&grnnamespace=0&grnlimit=1&format=json"

    $.ajax({
      url: url,
      dataType: 'jsonp'
    })
    .done(function(data) {
      var randomWikiData = data.query.pages;
      view.clearEntries();
      view.renderResults(randomWikiData);

    });
  },

  setupListener: function setupListener() {
    $("#search-button").click(function searchClick() {
      console.log("CLICK!");
      controller.getArticle();

    });
  },

  setupRandomListener: function setupRandomListener() {
    $("#search-random").click(function randomClick() {
      console.log("Random Click!");
      controller.getRandomArticle();
    });
  }

}

var view = {
  renderEntry: function renderEntry(title, fullURL, extract) {
    var titleHTML = '<div class="resultEntry"><h2 class="result-title"><a href="' + fullURL + '">' + title + '</a></h2>';
    var extractHTML = '<p>' + extract + '</p></div>';
    $(".container-main-articles").append(titleHTML + extractHTML);
  },

  renderResults: function renderResults(dataObj) {
    for(var x in dataObj) {
      view.renderEntry(dataObj[x]["title"], dataObj[x]["fullurl"], dataObj[x]["extract"]);
    }
  },

  clearEntries: function clearEntries() {
    $(".container-main-articles").empty();
  }

}

controller.init();
