var spreadsheetID = "1-ZTCEB_XrMIM65hqTaB8nF_TRgeGFnLu9Ngcj0Y8E8A";
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/"+worksheetNumber+"/public/values?alt=json";
//var url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/Sheet1";
var booking = "https://docs.google.com/spreadsheets/d/1-ZTCEB_XrMIM65hqTaB8nF_TRgeGFnLu9Ngcj0Y8E8A/edit#gid=0&range="
console.log(url);
$.getJSON(url, function(data) {
  var entry = data.feed.entry;
  console.log(entry);
  $(entry).each(function() {
    var category = this.gsx$category.$t;
    if(category == "-") {
      return;
    }
    var id = category.split(" ").join('_')
    var device = this.gsx$device.$t;
    var link = this.gsx$link.$t;
    var count = this.gsx$count.$t;
    var status = this.gsx$status.$t;
    var row = this.gsx$row.$t;
    console.log(entry);
    if($("table." + id).length == 0) {
      $('<h2>'+category+'</h2>').appendTo('#tables');
      $('<table>').addClass(id).appendTo('#tables');

    }
    var $tr = $('<tr>').append(
      $('<td>').html("<a href='"+link+"'>"+device+"</a>"),
      $('<td>').text("x"+count),
      $('<td>').text(status),
      $('<td>').html('<a target="_blank" href="'+booking+row+":"+row+'">reserve</a>')
    ).appendTo('table.'+id);
  });
});