 $(document).ready(function() {
  
     //code for local json storage    
     /*var json_local_use;
  $.getJSON('static/pragmatics.json', function (data) {
      
      var json_fetch = data;
      localStorage.setItem('json_fetch', JSON.stringify(json_fetch));
      var json_use = localStorage.getItem('json_fetch');
      
     console.log(JSON.parse(json_use));
         
      json_local_use=JSON.parse(json_use);
      
      
      
  });*/
  
        var count=0;
     var picview;
 $('#try').on('click', 'li', function(){
     var my_id= $(this).attr('id');
     
    
        if(count%2==0){
             picview= '#pic_view1';
            count+=1;
           
        }else{
              picview= '#pic_view2';
            count+=1;
        }
        
        $.getJSON('static/pragmatics.json', function (data) {
        var images = '<ul class="list-inline">';
		$.each(data, function (key, val) {
		    if(val.parent_id==my_id){
		  	images += '<li><img src="'+'static/img/png/'+ val.picture + '"><br><h3>'+val.tag_name+'</h3></li>';
            }});
		    images+= '</ul>';
            
            $(picview).html(images);
   
});
}); 
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     var output;
      var open_list =[];
     
     ////////// implementing tree structure ....
   
      $("#try_quick").on('click',function(){
	  
      
$.getJSON('static/pragmatics.json', function (data) {
		 output = '<ul > ';
      $.each(data, function (key, val) {
            if(val.parent_id==0){
                
			output += '<li class="deactivated" data-toggle="tooltip" data-placement="right" title="'+val.breadcrumbs+'" id="'+val.identifier+'"><span><i class="icon-folder-open"></i>' + val.tag_name + ' -- '+val.category_or_template + '</span></li>';
            
           }});
		output += '</ul>';
        $("#try").html(output);
});
      $('[data-toggle="tooltip"]').tooltip();
          
}); 
 
     
          
     ////// for click based retrieval 
   
     var open_list =[];
     var status;
     var fill;
        var old_output;
      $('#try').on('click', 'li',function(){
            var my_id= ($(this).attr('id'));
           
          var my_class=$(this).attr('class');
        
          
          
            output= $(this).html();
            var this_old=$(this);  
          if(my_class=='deactivated'){
              status='activated';
              $(this).attr('class',status);
         $.getJSON('static/pragmatics.json', function (data) {
        output += '<ul>';
       $.each(data, function (key, val) {
             if(val.parent_id==my_id && val.category_or_template!='T'){
                
			output += '<li class="deactivated" data-toggle="tooltip" data-placement="right" title="'+val.breadcrumbs+'" id="'+val.identifier+'"><span><i class="icon-folder-open"></i>' + val.tag_name + ' -- '+ val.category_or_template + '</span></li>';
            
            }});
		output += '</ul>';
             
         (this_old).html(output);
              old_text = (this_old).text();
         
         });
          
         
             
          }else{ status='deactivated';
                
                $(this).attr('class',status);
                
                $.getJSON('static/pragmatics.json', function (data) {
       
                   $.each(data, function (key, val) {
                if(val.identifier==my_id){
                
                    
                   (this_old).html('<span><i class="icon-folder-open"></i>'+ val.tag_name  + ' -- '+ val.category_or_template +'</span>'); 
                 
                }});
                });
              
             
              
              
          }
 
 $('[data-toggle="tooltip"]').tooltip();
          
 
      }); 
     
     
     ///// code for pic placement
  

     
/// writing jvascript code for searching .....
     
     
  var search_result;   
 $('#search_but').on('click', function(){
 var text_value = $("#search_text").val();
     $("#search_result").html('<br>');
     search_result='';
if(text_value=='') {
alert("Enter word not found");
}else{  var blank='';
       $("#search_result").html(blank);
   $.getJSON('static/pragmatics.json', function (data) {
		 search_result = '<ul> ';
		$.each(data, function (key, val) {
             if(val.tag_name==text_value){
			search_result += '<li data-toggle="tooltip" data-placement="right" title="'+val.breadcrumbs+'" id="'+val.identifier+'"><button type="button" class="btn btn-success">' + val.tag_name + '</button></li>';
             }});
		search_result += '</ul>';

    $("#search_result").html('<br>');
  $("#search_result").html(search_result);

});
       $('[data-toggle="tooltip"]').tooltip();
}
   
});
     
     
     
//// for displaying image of searched item 
     
      $('#search_result').on('click', 'li', function(){
     var my_id= ($(this).attr('id'));
$.getJSON('static/pragmatics.json', function (data) {
                
		var images = '<br>';
		$.each(data, function (key, val) {
		    if(val.identifier==my_id){
		    
			images += '<img src="'+'static/img/png/' + val.picture + '"><br><h3>'+val.tag_name+'</h3>';
            }});
		images+= '<br>';


  $("#pic_view1").html(images);
});
}); 
     
     
  
     
// implementing close search button
$('#back_but').on('click', function(){     
$("#search_text").val('');
  $("#search_result").html('');   
    $( "#quick" ).trigger( "click" );
    search_result='';
}); 
     
     
     


   
//// tree sturcture ends 
 
     
$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
});
});