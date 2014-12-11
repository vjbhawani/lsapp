 $(document).ready(function() {
     
        var undo_stck=[];
     var undo_type=[];
     var undo_index=[];
     var last_clicked;
     var copy_stack=[];

     var jsondata;
     $.post('/jsonrequest', function(data) {
         jsondata = jQuery.parseJSON(data);

     });
     
     ///paste function 
     
    $('#paste').on('click', function() {
                var paste_undo=[];
                var paste_index=[];
                for(var i=0;i<copy_stack.length;i++){
                    var last_obj=jQuery.parseJSON(copy_stack[i]);
                    var index=_.indexOf(jsondata,last_obj);
                    last_obj.ZPARENT_ID=last_clicked;
                    jsondata.splice(index,0,last_obj); 
                    index=_.indexOf(jsondata,last_obj);
                    paste_undo.push(JSON.stringify(jsondata[index]));
                    paste_index.push(index);
                    
                }
              
               
              
                undo_stck.push(paste_undo);
               
                undo_index.push(paste_index);
               
                undo_type.push('paste');
                $('#'+last_clicked).trigger('click');
                
               
    });
          
     
     
     // copy  feature
      $('#copy').on('click', function() {
          copy_list=dict;
           for ( i = 0; i < dict.length; i++) {
          obj = $('#'+dict[i].id).data('picmodedict');
                    index = _.indexOf(jsondata, obj);
                      copy_stack.push(JSON.stringify(jsondata[index]));
               
           }
          
          //resetting checked to uncheck
            $("input[type='checkbox']:checked").prop('checked', false);
                 dict=[];
                 dict.length=0;
          
     
      });
     
     
     // implementing undo feature 
     
     $('#undo').on('click', function() {
         var temp=undo_stck.pop();
         var undo_typ=undo_type.pop();
        console.log('inside '+undo_typ);
         if(undo_typ=='hide'){
             var temp_index=[];
             temp_index=undo_index.pop();
         while(temp.length!=0){
         var last_obj=jQuery.parseJSON(temp.pop());
            // console.log(last_obj);
            jsondata[temp_index.pop()]=last_obj;
              $('[id="'+last_obj.ZIDENTIFIER+'"]').fadeTo("fast",1);
             
           
         
         }}
         
         if(undo_typ=='delete'){
           // console.log('deleting');
             var temp_index=[];
             temp_index=undo_index.pop();
             while(temp.length!=0){
         var last_obj=jQuery.parseJSON(temp.pop());
            // console.log(last_obj);
                  jsondata.splice(temp_index.pop(), 0, last_obj);
                 
                 
             }
              $('#'+last_clicked).trigger('click');
         }
         
         if(undo_typ=='paste'){
            console.log('undo pasting');
             var temp_index=[];
             temp_index=undo_index.pop();
             while(temp.length!=0){
         var last_obj=jQuery.parseJSON(temp.pop());
              jsondata.splice(temp_index.pop(), 1);
                // console.log('undo paste successfull');
                 
             }
             $('#'+last_clicked).trigger('click');
         }
     });
     
     
     
     
     

     
     var hiden_ele=[];
     
     function hide() {
    // Do something.
          for (var i = 0; i < hiden_ele.length; i++) {
           $('[id="'+hiden_ele[i]+'"]').fadeTo("fast",0.2);
          
          }
                hiden_ele=[];
                 hiden_ele.length=0;
}
     
      var id_clicked;
     var dict = [];


    // getting selected pic_ids ;
     $('#pic_container').on('click', function() {

         dict = [];
         dict.length = 0;
         $("input[type='checkbox']:checked").each(function() {
             id_clicked = $(this).val();

             dict.push({

                 id: id_clicked,


             });
         });


     });
     
     // SCRIPT FOR  toggle button 
     $('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');  
    
    if ($(this).find('.btn-primary').size()>0) {
    	$(this).find('.btn').toggleClass('btn-primary');
    }
    
    
    $(this).find('.btn').toggleClass('btn-default');
       
});
     
     // script for editing 
     
     
      $('#edit_save').on('click', function() {
      /*console.log($('#edit_name').val());
      console.log($('#edit_partofspeech').val());
      console.log($('#edit_color').val());
      console.log($('#edit_picture').val());
      console.log($('#edit_audio').val());*/
          
        var sentence_box=$('.edit_sent > .active').text();
          var value;
            for (i = 0; i < dict.length; i++) {
                     obj = $('#'+dict[i].id).data('picmodedict');
                    index = _.indexOf(jsondata, obj);
                   if($('#edit_name').val()!=''){
                   jsondata[index].ZTAG_NAME=$('#edit_name').val();
                   }
                if($('#edit_partofspeech').val()!=''){
                   jsondata[index].ZPART_OF_SPEECH=$('#edit_partofspeech').val();
                   }
                if($('#edit_color').val()!=''){
                   jsondata[index].ZCOLOR=$('#edit_color').val();
                   }
                 if($('.edit_sent > .active').text()!=''){
                     if(sentence_box=='ON'){value=1;}
                     if(sentence_box=='OFF'){value=0;}
                   jsondata[index].ZIS_SENTENCE_BOX_ENABLED=''+value+'';
                   }
                
                 $('[id="'+dict[i].id+'"]').find('span').text(jsondata[index].ZTAG_NAME);
                   
            }
            
            
          
            
          //resetting checked to uncheck
            $("input[type='checkbox']:checked").prop('checked', false);
                 dict=[];
                 dict.length=0;
            $('#body_modal').find("input[type=text], textarea").val("");
      
      
      });
     
     //script for hide button 
     
     var result;
     $('#hideit').on('click', function() {
    result= confirm("Change these " + dict.length + " items ?");

             if (result == true) {
                 var hide_undo=[];
                 var hide_index=[];
                 for ( i = 0; i < dict.length; i++) {
                    obj = $('#'+dict[i].id).data('picmodedict');
                    index = _.indexOf(jsondata, obj);
                      hide_undo.push(JSON.stringify(jsondata[index]));
                      hide_index.push(index);
                     if(jsondata[index].ZIS_ENABLED=='1'){
                     jsondata[index].ZIS_ENABLED='0';
                     //console.log(jsondata[index].ZIS_ENABLED);
                     $('[id="'+dict[i].id+'"]').fadeTo("fast",0.2);
                     }
                     else{
                         jsondata[index].ZIS_ENABLED='1';
                          $('[id="'+dict[i].id+'"]').fadeTo("fast",1);
                    }
                 }
                 
                  undo_stck.push(hide_undo);
                    undo_index.push(hide_index);
                 undo_type.push('hide');
                  //setting all checked items to uncheck ..... 
                 $("input[type='checkbox']:checked").prop('checked', false);
                 dict=[];
                 dict.length=0;
             }
       //  console.log(undo_stck.length);

     });
         
     
  
     
     
     
     // script for save changes button 
     $('#save').on('click', function() {
        // var json_bckup_obj = JSON.parse(localStorage.getItem("json_bckup"));
         //console.log('sending json to modify page with length =' + json_bckup_obj.length);
         
         $.post('/modifyvocab',{json_recv:jsondata} ,function() {
         console.log('data sent');

     });

     });



    


     // DELEting elements from page and json file 

     var index;
     var obj;
     var parent;
     var dic_index;
     var index_child = 0;
     var type;
     var i;

     $('#deleteit').on('click', function() {
         result=confirm("Delete these " + dict.length + " items ?");
                
             if (result == true) {
                    var del_undo=[];
                    var del_index=[];
                    
                 for (i = 0; i < dict.length; i++) {
                     obj = $('#'+dict[i].id).data('picmodedict');
                     index = _.indexOf(jsondata, obj);
                      del_undo.push(JSON.stringify(jsondata[index]));
                      del_index.push(index);
                     
                     jsondata.splice(index, 1);

                     $('[id="' + dict[i].id + '"]').hide();



                 }
                  
                 undo_stck.push(del_undo);
                    undo_index.push(del_index);
                 undo_type.push('delete');
                 

                 //setting all checked items to uncheck ..... 
                 $("input[type='checkbox']:checked").prop('checked', false);
                  dict=[];
                 dict.length=0;
                 

                 // pushing to local storage 

               //  localStorage.clear();
              //   localStorage.setItem("json_bckup", JSON.stringify(jsondata));
                 //console.log('at time of setting' + jsondata.length);

             }

             // checking local storage

           //  var json_bckup_obj = JSON.parse(localStorage.getItem("json_bckup"));
             //  console.log('after fetching ' + json_bckup_obj.length);
  

     });


     ///// code for pic placement
     var count = 0;
     var picview;
     var htmlstr;
     
     var my_id;

     $('#try').on('click', 'li', function() {
        
          my_id = $(this).attr('id');
          picview = '#pic_view1';
         
        /* if (count % 2 == 0) {
             picview = '#pic_view1';
             count += 1;

         } else {
             picview = '#pic_view2';
             count += 1;
         }*/


         var images = $('<ul>');

         $.each(jsondata, function(key, val) {
             if ((parseInt(val.ZPARENT_ID)) == my_id) {
                    
                if(val.ZIS_ENABLED==0){
                hiden_ele.push(val.ZIDENTIFIER);
                }
                  var f = $('<li>').addClass('figures');
              
                 
                 $(f).data('picmodedict',val);
                 f.attr('id', val.ZIDENTIFIER);
                 
                 
                if (val.ZCATEGORY_OR_TEMPLATE == 'D') {
                   console.log(f.data('picmodedict'));
                
                     htmlstr = '<img src="static/img/folder.png"><span class="caption">' + val.ZTAG_NAME + '</span><input type="checkbox" class="tick" value="'+val.ZIDENTIFIER+'" name="'+val.ZPARENT_ID+'">';

                } else {
                     htmlstr = '<img src="static/img/png/'+val.ZPICTURE+'"><span class="caption">' + val.ZTAG_NAME +'</span><input type="checkbox" class="tick" value="' + val.ZIDENTIFIER + '"name="' + val.ZPARENT_ID + '">';
              }
                 
                 f.html(htmlstr);
                 images.append(f);
                
             }
         });
        
         $(picview).html(images);
         
         hide();
         //console.log($('#156').data('picmodedict'));
     });
     var output;

     ////////// implementing tree structure ....

     $("#try_quick").on('click', function(e) {
         output = '<ul>';
         $.each(jsondata, function(key, val) {
             if ((parseInt(val.ZPARENT_ID)) == 0) {
                 output += '<li class = "deactivated" data-toggle = "tooltip" data-placement="right"  title = "' + val.breadcrumbs + '"id= "' + parseInt(val.ZIDENTIFIER) + '"> <span> <i class = "icon-folder-open" > </i>' + val.ZTAG_NAME + ' -- ' + val.ZCATEGORY_OR_TEMPLATE + '</span> </li>';

             }
         });
         output += '</ul> ';
         $("#try").html(output);
         $(' [data-toggle = "tooltip"]').tooltip();
        

     });



     ////// for click based retrieval 

     var status;
     var fill;
     var old_output;
     $('#try').on('click', 'li', function() {
         var my_id = ($(this).attr('id'));
         last_clicked=my_id;
         var my_class = $(this).attr('class');
         output = $(this).html();
         var this_old = $(this);
         if (my_class == 'deactivated') {
             status = 'activated';
             $(this).attr('class', status);
             output += '<ul>';
             $.each(jsondata, function(key, val) {
                 if ((parseInt(val.ZPARENT_ID)) == my_id && val.ZCATEGORY_OR_TEMPLATE != 'T') {
                     output += '<li class ="deactivated" data-toggle="tooltip" data-placement="right" title ="' + val.breadcrumbs + '" id="' + parseInt(val.ZIDENTIFIER) + '" ><span><i class="icon-folder-open"></i>' + val.ZTAG_NAME + '--' + val.ZCATEGORY_OR_TEMPLATE + '</span></li>';
                 }
             });
             output += '</ul>';

             (this_old).html(output);
             old_text = (this_old).text();




         } else {
             status = 'deactivated';
             $(this).attr('class', status);
             $.each(jsondata, function(key, val) {
                 if (parseInt(val.ZIDENTIFIER) == my_id) {
                     (this_old).html('<span><i class="icon-folder-open"></i>' + val.ZTAG_NAME + '--' + val.ZCATEGORY_OR_TEMPLATE + '</span>');

                 }
             });





         }

         $(' [data-toggle = "tooltip"]').tooltip();
         e.stopPropagation();

     });






     /// writing jvascript code for searching .....


     var search_result;
     $('#search_but ').on('click ', function() {
         var text_value = $("#search_text").val();
         $("#search_result").html('<br>');
         search_result = '';
         if (text_value == '') {
             alert("Enter word not found");
         } else {
             var blank = '';
             $("#search_result").html(blank);

             search_result = '<ul>';
             $.each(jsondata, function(key, val) {
                 if (val.ZTAG_NAME == text_value) {
                     search_result += '<li data-toggle = "tooltip" data-placement = "right" title = "' + val.breadcrumbs + '" id = "' + parseInt(val.ZIDENTIFIER) + '" > < button type = "button"             class = "btn btn-success" > ' + val.ZTAG_NAME + ' < /button></li > ';
                 }
             });
             search_result += '</ul>';

             $("#search_result").html('<br>');
             $("#search_result").html(search_result);


             $('[data-toggle="tooltip"]').tooltip();
         }

     });



     // for displaying image of searched item 

     $('#search_result').on('click', 'li', function() {
         var my_id = ($(this).attr('id'));

         var images = '<br>';
         $.each(jsondata, function(key, val) {
             if (parseInt(val.ZIDENTIFIER) == my_id) {

                 images += '<img src="' + 'static/img/png/' + val.ZPICTURE + '"><br><h3>' + val.ZTAG_NAME + '</h3>';
             }
         });
         images += '<br>';


         $("#pic_view1").html(images);

     });




     // implementing close search button
     $('#back_but').on('click', function() {
         $("#search_text").val('');
         $("#search_result").html('');
         $("#quick").trigger("click");
         search_result = '';
     });






     //// tree sturcture ends 


     $(function() {
         $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
         $('.tree li.parent_li > span').on('click', function(e) {
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