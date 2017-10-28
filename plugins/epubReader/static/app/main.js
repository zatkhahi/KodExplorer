kodReady.push(function(){
	kodApp.add({
		name:"epubReader",
		title:"{{LNG.epubReader.meta.title}}",
		ext:"{{config.fileExt}}",
		sort:"{{config.fileSort}}",
		icon:'{{pluginHost}}static/app/images/icon.png',
		callback:function(path,ext){
			var url = '{{pluginApi}}&path='+core.pathCommon(path);
			if('window' == "{{config.openWith}}"){
				window.open(url);
			}else{
				core.openDialog(url,core.icon(ext),htmlEncode(core.pathThis(path)));
			}
		}
	});
	Hook.bind('explorer.list.fileThumb',function(path,ext){
		if(ext != 'epub') {
			return;
		}
		var apiUrl = "{{pluginApi}}cover";
		var url   = apiUrl+'&path='+core.pathCommon(path);
		var image = G.staticPath+'images/file_icon/icon_file/epub.png';
		var html  = "<div class=' ico'filetype='"+htmlEncode(ext)+
			"'><img draggable='false' class='file-icon-epub' ondragstart='return false;' src='"+
			url+"' onerror='javascript:this.src=\""+image+"\";$(this).removeClass(\"file-icon-epub\");'/></div>";
		return html;
	});

	var cssText = 
	".file .ico img.file-icon-epub{\
		/*margin-top: -1px;margin-bottom: 5px;*/  \
		border-radius:0;transition: all 0.2s ease;\
		box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0px 1px rgba(0,0,0,0.2);\
	}";
	//ui.f5();
	$.addStyle(cssText);
});