window.onload = function(){
	/**
	Load the content from Home/Chat into the div with a chat id
	*/
    $("#chat").load("Home/Chat"); //Change to PortalFace Folder
    $("#status").load("PortalFace/Status");
    $("#newsfeed").load("PortalFace/NewsFeed");
    //getNewsFeed();
}