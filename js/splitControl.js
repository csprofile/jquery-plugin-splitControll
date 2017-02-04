$.fn.splitControl = function(options) {
	var settings = $.extend({
		matriz: {
			x:5,
			y:5
		},
		control: {
			border: "1px solid red",
			normalBG:"#fff",
			selectedBG:"green",
			zIndex:999,
			width:100,
			height:100
		},
		trigger: 'click',
		appendTo: 'body',
		closeOnMouseOut:true,
	}, options );
	
	var isOpen = false;
	var matriz = settings.matriz;
	var controlW = settings.control.width;
	var controlH = settings.control.height;
	var thisObject = this;
	
	matriz['w'] = controlW/matriz.x;
	matriz['h'] = controlH/matriz.y;
	
	var conteiner;
	
	this.bind(settings.trigger,function(){
		open();
	});
	

	var open = function(){
		if(!isOpen){
			conteiner = $("<div>").hide();
			conteiner.width(controlW);
			conteiner.height(controlH);
			conteiner.css({
				"border-collapse":"collapse",
				"z-index":settings.control.zIndex,
				"left":thisObject.position().left + parseInt(thisObject.css("marginLeft")),
				"top":thisObject.position().top + thisObject.outerHeight(true),
				"position":"absolute"
			});
			
			if(settings.closeOnMouseOut){
				conteiner.mouseleave(function(){
					thisObject.close();
				});
			}
			
			for(var y = 0; y < matriz.y; y++){
				var divColumn = $("<div>");
				divColumn.css("display","table-row");
				
				for(var x = 0; x < matriz.x; x++){
					var divCell = $("<div>");
					divCell.attr("id",y+"_"+x);
					divCell.attr('x',x);
					divCell.attr('y',y);
					divCell.addClass("cell");
					divCell.css({
						"display":"table-cell",
						"width":matriz.w,
						"height":matriz.h,
						"border":settings.control.border,
						"border-collapse":"collapse",
						"background":settings.control.normalBG,
					});
					
					divCell.mouseenter(function(){
						cellAction($(this).attr('y'),$(this).attr('x'));
					});
					
					divCell.click(function(){
						matrizAction($(this).attr('y'),$(this).attr('x'));
					});
					
					divColumn.append(divCell);
				}
				
				conteiner.append(divColumn);
			}
			
			$(settings.appendTo).append(conteiner);
			conteiner.fadeIn('fast');
			
			isOpen = true;
		}
	}
	
	this.close = function(){
		if(isOpen){
			conteiner.fadeOut('fast',function(){
				var thisConteiner = this;
				setTimeout(500, $(thisConteiner).remove());
			});
			
			isOpen = false;
		}
	}
	
	this.onSelect = function(){
	
	};
	
	var cellAction = function(y,x){
		var cell = $("#"+y+"_"+x);
		$(".cell").each(function(){
			$(this).css({"background":settings.control.normalBG});
			$(this).removeClass("selected");
		});
		
		for(var yy = 0; yy<=y ; yy++){
			for(var xx = 0; xx<=x ; xx++){
				var autoCell = $("#"+yy+"_"+xx);
				autoCell.css({"background":settings.control.selectedBG});
				autoCell.addClass("selected");
			}
		}
	}
	
	var matrizAction = function(x,y){
		var X = parseInt(x)+1;
		var Y = parseInt(y)+1;
		thisObject.onSelect(X,Y,thisObject);
	}
	

	
	return this;
};