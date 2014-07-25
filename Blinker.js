/**
 *
 *  bLinker v1.0 - Blogger Support Plugin
 *
 *    Blog: http://rrvf.blogspot.com/
 *    Author: zerippe
 *    License : MIT License : http://www.opensource.org/licenses/mit-license.php
 *
 */
;$(function(){
	var plugin = "blinker";
	var default_params = {
		api : "feeds/posts/default?alt=json&callback=?&max_results=1&path=",
		target : "a.blinker"
	};
	$[plugin] = $.sub();
	$[plugin].fn.pluginit = function(params){
		$.extend(default_params, params, {})
	};

	$[plugin].fn.load = function(){
		$(default_params.target).each(function(){
			var href = $(this).attr("href");
			var blog = href.match(/http:\/\/[^\/]+\//);
			var path = href.replace(/http:\/\/[^\/]+/, "");
			load_json(blog + default_params.api + path, this);
		});
	};

	function load_json(query, element){
		$.getJSON(query, function(data){
			var entries = data.feed.entry;
			$(entries).each(function(i, entry){
		    	$(element).text(entry.title.$t);
			});
		});
	}
});