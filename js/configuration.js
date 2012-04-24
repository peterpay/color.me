function getKeysUI()
{
		try
		{
		$.getJSON('http://kidsocial.net/kidsocial/services/avatar_editor_texts', function(data) {
			alert(data);
	  	});
	  	
	  	}
	  	catch(err)
	  	{}
		//keys=jQuery.parseJSON( json )
}