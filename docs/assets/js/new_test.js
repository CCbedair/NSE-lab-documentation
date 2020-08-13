var spreadsheetID = "1-ZTCEB_XrMIM65hqTaB8nF_TRgeGFnLu9Ngcj0Y8E8A";
var CLIENT_ID = '687978569754-6c0h201rs0chm2dcssi7v0345ibbai61.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDaGXkc0JGx_Pf1MTk5Q--fAgjawEPMjDE';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/drive/v2/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/drive";

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function (r) {
    loadTable();
  }, function(error) {
    console.log(error);
  });
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function loadTable() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetID,
    range: 'Sheet1'
  }).then(function(response) {
    values = response.result.values;
    values.shift();
    $(values).each(function() {
      console.log(this);
      var row = this[0];
      var category = this[1];
      if(category == "-" || category == "Category" ) {
        return;
      }
      var id = category.split(" ").join('_')
      var device = this[2]
      var link = this[3]
      var count = this[4];
      var status = this[5];
      if($("table." + id).length == 0) {
        $('<h2>'+category+'</h2>').appendTo('#tables');
        $('<table>').addClass(id).appendTo('#tables');
  
      }
      var $tr = $('<tr>').append(
        $('<td>').html("<a href='"+link+"'>"+device+"</a>"),
        $('<td>').text("x"+count),
        $('<td>').text(status),
        $('<td>').html('<button id='+row+' type="button" class="btn">reserve</button>')
      ).appendTo('table.'+id);
      $('#'+row).on('click', function (e) {
        $('#row').val(row);
        $('#item').val(device)
        MicroModal.show('email-modal');  
       });  
    });
    MicroModal.init();
  }, function(response) {
    console.log(response);
  });
}

function book(){
  var item = $('#item').val();
  var row = $('#row').val();
  var email = $('#email').val();
  var link = "https://docs.google.com/spreadsheets/d/"+spreadsheetID+"/edit#gid=0&range="+row+":"+row;
  var content = "Student Email: "+email+"\nItem to book: "+item+"\nLink to item: "+link;
  gapi.client.drive.comments.insert({
    'fileId': spreadsheetID,
    'resource': {'content': content}
  }).then(function(response) {
    MicroModal.close('email-modal');  
  }, function(response) {
    MicroModal.close('email-modal');  
  });
}