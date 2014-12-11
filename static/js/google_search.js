google.load('search', '1');
      var query;
      var page=1;
       $('#search_img').on('click', function() {
       query=$('#img_query').val();
       
       //  console.log(query); 
            imageSearch.execute(query);
           
           });   
           
      // console.log('outsie'+query);  



      var imageSearch;

     var resu='';

      function searchComplete() {

        // Check that we got results
        if (imageSearch.results && imageSearch.results.length > 0) {

          // Grab our content div, clear it.
       
            $('#content_result').html('');

          // Loop through our results, printing them to the page.
          var results = imageSearch.results;
          for (var i = 0; i < results.length; i++) {
            // For each result write it's title and image to the screen
            var result = results[i];
          
            
          
     
              var newImg='<img src="'+result.tbUrl+'" class="small_img_res" />';
            // There is also a result.url property which has the escaped version
      
             // newImg.src=result.tbUrl;
         
           resu+=newImg;

          
          }
            if(page < 8) {
                page++;
            imageSearch.gotoPage(page);
           // page++;
        }

          $('#content_result').html(resu);
        }
      }

      function OnLoad() {
      
        // Create an Image Search instance.
        imageSearch = new google.search.ImageSearch();

        // Set searchComplete as the callback function when a search is 
        // complete.  The imageSearch object will have results in it.
        imageSearch.setSearchCompleteCallback(this, searchComplete, null);
           imageSearch.setResultSetSize(google.search.Search.LARGE_RESULTSET);
      // imageSearch.setResultSetSize(20); 
        
        // Include the required Google branding
        google.search.Search.getBranding('branding');
      }
      google.setOnLoadCallback(OnLoad);
      
      

           
    
      
