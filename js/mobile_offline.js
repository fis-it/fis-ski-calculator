(function(){
	var webappCache = window.applicationCache;
	
	function loaded()
	{
		var h1Title = document.querySelector("h1 span");
//                var header_a = document.querySelector("div a");
//                var fis_logo = document.querySelector("div #fis-home");
		var connectionStatus = ((navigator.onLine) ? 'online' : 'offline');
		if (connectionStatus == 'offline'){
//                    header_a.style.visibility = 'hidden';
                    if (typeof(fis_logo) != 'undefined' && fis_logo != null){    
//				fis_logo.style.visibility = 'visible';
			}
                    var show_status = ""
                }else{
                    var show_status = " (" + connectionStatus + ")"
                }
		//h1Title.textContent = h1Title.textContent + show_status;
		document.title = document.title+ " (" + connectionStatus + ")";
		
                
		switch(webappCache.status)
		{
			case 0:
				console.log("Cache status: Uncached");
				break;
			case 1:
				console.log("Cache status: Idle");
				break;
			case 2:
				console.log("Cache status: Checking");
				break;
			case 3:
				console.log("Cache status: Downloading");
				break;
			case 4:
				console.log("Cache status: Updateready");
				break;
			case 5:
				console.log("Cache status: Obsolete");
				break;
		}
	}
	function updateCache()
	{
		webappCache.swapCache();
		console.log("Cache has been updated due to a change found in the manifest");
	}
	function errorCache()
	{
		console.log("You're either offline or something has gone horribly wrong.");
	}

	window.addEventListener("load", loaded, false);
	webappCache.addEventListener("updateready", updateCache, false);
	webappCache.addEventListener("error", errorCache, false);
})();
