 $(document).ready(function() {


     var jsondata;
     $.post('/jsonrequest', function(data) {
         jsondata = jQuery.parseJSON(data);

     });





     var id_clicked;
     var dict = [];
     var parent_id;

     // getting selected pic_ids and parent_ids;
     $('#pic_container').on('click', function() {

         dict = [];
         dict.length = 0;
         $("input[type='checkbox']:checked").each(function() {
             id_clicked = $(this).val();
             // parent_id = $(this).attr('name');
             dict.push({
                 // ZIDENTIFIER
                 id: id_clicked,
                 //  parent: parent_id,
                 //ZPARENT_ID

             });
         });


     });



     // DELETting elements

     var index;
     var obj;
     var count = 0;
     var after_del;

     $('#deleteit').on('click', function() {
         bootbox.confirm("Delete these " + dict.length + " items ?", function(result) {
             console.log(result);
             if (result == true) {

                 for (i = 0; i < dict.length; i++) {
                     console.log('new index of ' + dict[i].id);
                     obj = $('#' + dict[i].id).data('picmodedict');
                     index = _.indexOf(jsondata, obj);
                     jsondata.splice(index, 1);
                     after_del = _.indexOf(jsondata, obj);
                     console.log('index after del == ' + after_del);
                 }

                 // pushing to local storage 
                 localStorage.clear();
                 localStorage.setItem("json_bckup", JSON.stringify(jsondata));
                 console.log('at time of setting' + jsondata.length);
             }

             // checking local storage
             var json_bckup_obj = JSON.parse(localStorage.getItem("json_bckup"));
             console.log('after fetching ' + json_bckup_obj.length);
         });
     });


     ///// code for pic placement
     var count = 0;
     var picview;
     $('#try').on('click', 'li', function() {
         var my_id = $(this).attr('id');


         if (count % 2 == 0) {
             picview = '#pic_view1';
             count += 1;

         } else {
             picview = '#pic_view2';
             count += 1;
         }


         var images = $('<ul>');

         $.each(jsondata, function(key, val) {
             if ((parseInt(val.ZPARENT_ID)) == my_id) {
                 var f = $('<li>').addClass('figures');
                 $(f).data('picmodedict', val);
                 f.attr('id', val.ZIDENTIFIER);
                 htmlStr = '<img src="' + 'static/img/png/' + val.ZPICTURE + '">'
                 spanstr = '<span class="caption">' + val.ZTAG_NAME + '  ' + ' </span> <input type="checkbox" class="tick" value="' + val.ZIDENTIFIER + '" name="' + val.ZPARENT_ID + '">';
                 f.html(htmlStr + spanstr);
                 images.append(f);

                 /*images += '<li class="figures" id=' + val.ZIDENTIFIER + '><img src="' + 'static/img/png/' + val.ZPICTURE + '"> <span class="caption">' + val.ZTAG_NAME + '  ' + '  <input type="checkbox" value="' + val.ZIDENTIFIER + '" name="' + val.ZPARENT_ID + '"></span></li>';*/


             }
         });

         $(picview).html(images);


     });









     var output;


     ////////// implementing tree structure ....

     $("#try_quick").on('click', function(e) {



         output = '<ul > ';
         $.each(jsondata, function(key, val) {
             if ((parseInt(val.ZPARENT_ID)) == 0) {

                 output += '<li class="deactivated" data-toggle="tooltip" data-placement="right" title="' + val.breadcrumbs + '" id="' + parseInt(val.ZIDENTIFIER) + '"><span><i class="icon-folder-open"></i>' + val.ZTAG_NAME + ' -- ' + val.ZCATEGORY_OR_TEMPLATE + '</span></li>';

             }
         });
         output += '</ul>';
         $("#try").html(output);

         $('[data-toggle="tooltip"]').tooltip();

     });



     ////// for click based retrieval 

     var status;
     var fill;
     var old_output;
     $('#try').on('click', 'li', function() {
         var my_id = ($(this).attr('id'));
         var my_class = $(this).attr('class');
         output = $(this).html();
         var this_old = $(this);
         if (my_class == 'deactivated') {
             status = 'activated';
             $(this).attr('class', status);

             output += '<ul>';
             $.each(jsondata, function(key, val) {
                 if ((parseInt(val.ZPARENT_ID)) == my_id && val.ZCATEGORY_OR_TEMPLATE != 'T') {

                     output += '<li class="deactivated" data-toggle="tooltip" data-placement="right" title="' + val.breadcrumbs + '" id="' + parseInt(val.ZIDENTIFIER) + '"><span><i class="icon-folder-open"></i>' + val.ZTAG_NAME + ' -- ' + val.ZCATEGORY_OR_TEMPLATE + '</span></li>';

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


                     (this_old).html('<span><i class="icon-folder-open"></i>' + val.ZTAG_NAME + ' -- ' + val.ZCATEGORY_OR_TEMPLATE + '</span>');

                 }
             });





         }

         $('[data-toggle="tooltip"]').tooltip();
         e.stopPropagation();

     });






     /// writing jvascript code for searching .....


     var search_result;
     $('#search_but').on('click', function() {
         var text_value = $("#search_text").val();
         $("#search_result").html('<br>');
         search_result = '';
         if (text_value == '') {
             alert("Enter word not found");
         } else {
             var blank = '';
             $("#search_result").html(blank);

             search_result = '<ul> ';
             $.each(jsondata, function(key, val) {
                 if (val.ZTAG_NAME == text_value) {
                     search_result += '<li data-toggle="tooltip" data-placement="right" title="' + val.breadcrumbs + '" id="' + parseInt(val.ZIDENTIFIER) + '"><button type="button" class="btn btn-success">' + val.ZTAG_NAME + '</button></li>';
                 }
             });
             search_result += '</ul>';

             $("#search_result").html('<br>');
             $("#search_result").html(search_result);


             $('[data-toggle="tooltip"]').tooltip();
         }

     });



     //// for displaying image of searched item 

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