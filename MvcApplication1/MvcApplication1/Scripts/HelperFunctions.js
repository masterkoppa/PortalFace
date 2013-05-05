
function getNewsFeed() {
    FB.api('/me/feed',
         function (response) {
             //alert(JSON.stringify(response)); //DEBUG PURPOSES ONLY!
             //console.log(JSON.stringify(response)); //DEBUG PURPOSES ONLY!
             //$("#feed").html(JSON.stringify(response));
             var dataArray = response['data'];

             if (dataArray.length > 4) {
                 var max = 3;
             } else {
                 var max = dataArray.length;
             }

             for (var i = 0; i < max; i++) {
                 var from = dataArray[i]['from']['name'];
                 //console.log("S:" + dataArray[i]['story']);
                 //console.log("M:" + dataArray[i]['message']);

                 var message = dataArray[i]['message'];
                 if (message == undefined) {
                     message = dataArray[i]['story'];
                 }

                 var picture = dataArray[i]['picture'];
                 if (message != undefined) {
                     $.get("/PortalFace/NewsItem", { title: from, content: message, pictureURL: picture }).done
                     (
                         function (data) {
                             $("#feed").append(data);
                         });
                 } else {

                     $.get("/PortalFace/NewsItem", { title: from, content: message, pictureURL: "" }).done
                     (
                         function (data) {
                             $("#feed").append(data);
                         });
                 }



             }
         });
}

function getStock(symbol, id_for_result) {
    $.get("/PortalFace/StockInfo", { stockSymbol: symbol })
            .done(function (data) {
                $("#" + id_for_result).html(data);
            });
}