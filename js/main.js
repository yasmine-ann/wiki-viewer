var model = {

}

var controller = {
  init: function init() {
    controller.setupListener();

  },

  getArticle: function getArticle() {
    var inputValue = $("#search-box").val();
    console.log(inputValue);
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=info|extracts&exsentences=1&exintro&explaintext&exlimit=max&inprop=url&generator=search&format=json&gsrsearch=";
    url += inputValue;

    console.log(url);

    $.ajax({
      url: url,
      dataType: 'jsonp'
    })
    .done(function(data) {
      var wikiData = data;
      console.log(wikiData);
    });
  },

  setupListener: function setupListener() {
    $("#search-button").click(function searchClick() {
      console.log("CLICK!");
      controller.getArticle();

    });
  }

}

var view = {

}

controller.init();
