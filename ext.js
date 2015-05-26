/*
* @Author: Jakub Korupczynski
* @Date:   2015-05-19 18:45:57
* @Last Modified by:   Jakub Korupczynski
* @Last Modified time: 2015-05-25 21:37:24
*/

var app = (function(){
  'use strict';

  var evalScript = function(script, callback) {
      new CSInterface().evalScript(script, callback);
  };


  function App() {

  }

  App.prototype.onClickButton = function() {

    var url = $('#url-input').val();

    if (!url.match(/^https?:\/\//)) {
      alert("Server address must begin with http or https.");
      return;
    }

    // Remove slash if it was added by the user.
    url = url.replace(/\/$/,"");

    httpServer.setOptions({chosenUrl: url});

    // Start http proxy server if it's not running already
    httpServer.listen().then(function(proxyPort) {
      this.proxyUrl = 'http://localhost:' + proxyPort + '/';
      window.location.href = this.proxyUrl;
    }.bind(this));
  };

  return new App();
}());

$(document).ready(function(){
  $("#buttonGo").on("click", function(e){
      app.onClickButton();
  });
});
