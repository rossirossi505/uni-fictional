//search.js:

import $ from 'jquery' ;

 
class Search{
    constructor(){
      this.htmlSearch();
      this.resultDiv = $("#search-overlay__results");
      this.openButton = $(".js-search-trigger");
      this.searchOverlay = $(".search-overlay");
      this.closeButton = $(".search-overlay__close");
      this.searchField = $("#search-term");
      this.events();
      this.isOverlayOpen = false; 
      this.isSpinnerLoaded = false;
      this.typingTimer;
      this.previousValue;
    }



events(){
    this.openButton.on("click" , this.openOverlay.bind(this));
    this.closeButton.on("click" , this.closeOverlay.bind(this));
    $(document).on("keydown" , this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
}

keyPressDispatcher(e){

  if(e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')){
     this.openOverlay();
  }
  if(e.keyCode == 27){
    this.closeOverlay();
  } 
}

typingLogic(){
    

   if(this.searchField.val() != this.previousValue){
    clearTimeout(this.typingTimer);


   if(this.searchField.val() && this.searchField.val() !== ' '){
    if(!this.isSpinnerLoaded){
        this.resultDiv.html('<div class="spinner-loader"></div>');
        this.isSpinnerLoaded = true ;
        }
    
        this.typingTimer= setTimeout(this.getResult.bind(this),2000);
    
    }else{
       this.resultDiv.html('');
       this.isSpinnerLoaded= false;
   }

    
   
   this.previousValue = this.searchField.val();
   }
}

getResult(){

$.getJSON(universityData.root_url+"/wp-json/university/v1/search?term="+this.searchField.val(), (result) =>{


  this.resultDiv.html(`
  
  <div class="row">
    <div class="one-third">
      <h2 class="search-overlay__section-title">General Information</h2>
      ${result.generalInfo.length ? `<ul class ="link-list mim-list">` : `No general information`}
      ${result.generalInfo.map(item => {
       return `<li><a href="${item.permalink}"> ${item.title}   </a></li>`
      }
        ).join('')
      
     }
          
        ${result.generalInfo.length ? `</ul>` : ''} 
      

    </div>

    <div class="one-third">
      <h2 class="search-overlay__section-title">Programs</h2>
      ${result.programs.length ? `<ul class ="link-list mim-list">` : `No general information`}
      ${result.programs.map(item => {
       return `<li><a href="${item.permalink}"> ${item.title}   </a></li>`
      }
        ).join('')
      
     }
          
        ${result.programs.length ? `</ul>` : ''} 
    


      <h2 class="search-overlay__section-title">Professors</h2>
      ${result.professors.length ? `<ul class ="link-list mim-list">` : `No general information`}
      ${result.professors.map(item => {
       return ` <li class="professor-card__list-item">
            <a class="professor-card" href="${item.permalink}">
              <img class="professor-card__image" src="${item.image}">
              <span class="professor-card__name">${item.title}</span>
            </a>
          </li>
       
       `
      }
        ).join('')
      
     }
          
        ${result.professors.length ? `</ul>` : ''} 
    </div>

    <div class="one-third">
      <h2 class="search-overlay__section-title">Events</h2>

      ${result.events.length ? `<ul class ="link-list mim-list">` : `No general information`}
      ${result.events.map(item => {
       return `
       
       <div class="event-summary">
              <a class="event-summary__date event-summary__date--beige t-center" href="${item.permalink}">
                <span class="event-summary__month">${item.month}</span>
                <span class="event-summary__day">${item.date}</span>  
              </a>
              <div class="event-summary__content">
                <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                <p><?php if (has_excerpt()) {
                    echo get_the_excerpt();
                  } else {
                    echo wp_trim_words(get_the_content(), 18);
                    } ?> <a href="${item.permalink}" class="nu gray">Read more</a></p>
              </div>
            </div>
       `
      }
        ).join('')
      
     }
          
        ${result.events.length ? `</ul>` : ''} 

    </div>



 </div>

  
  `)
  this.isSpinnerLoaded = false ;
  
})
  
    
 
 
  
}

openOverlay(){
     this.searchOverlay.addClass("search-overlay--active");
     $("body").addClass("body-no-scroll");
     setTimeout(() => this.searchField.focus(),301);
     this.isOverlayOpen = true ;
     this.searchField.val('');
     
}
closeOverlay(){
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false ;

    }

htmlSearch(){
  $("body").append(`
  <div class="search-overlay">
  <div class="search-overlay__top">
    <div class="container">
      <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
      <input type="text" class="search-term" placeholder="What are you looking for?" 
      id="search-term" >
      <i class="fa fa-window-close search-overlay__close" aria-hidden="true" ></i>
      
    </div>

  </div>
  <div class="container">
     <div id="search-overlay__results"></div>
 </div>
</div>
  `)
}



}



export default Search;
//////////////////////////////////////////////////////////////////////////////////



/////mynotes.js





import $, { htmlPrefilter } from 'jquery' ;

class Mynotes {
    constructor(){
        this.events()
    }

events(){
    $("#my-notes").on("click", ".delete-note", this.deleteNote);
    
    $("#my-notes").on("click",".edit-note" ,this.editNote.bind(this));
    $("#my-notes").on("click" ,  ".update-note" , this.updateNote.bind(this)) ;
    $(".submit-note").on("click" , this.submitNote.bind(this))
}



editNote(e){
    
    var note =  $(e.target).parents("li"); 
    if(note.data("state") == "editable"){
        this.readOnly(note);
    }else{
        this.writeOnly(note);
    }
    
    



}

writeOnly(note){
    note.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i>Cancel');
    note.find(".note-title-field , .note-body-field").removeAttr("readonly").addClass("note-active-field") ;
    note.find(".update-note").addClass("update-note--visible");
    note.data("state" , "editable")
}
readOnly(note){
    note.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i>Edit');
    note.find(".note-title-field , .note-body-field").attr("readonly" , "readonly").removeClass("note-active-field") ;
    note.find(".update-note").removeClass("update-note--visible");
    note.data("state" , "noteditable")
}

deleteNote(e){
 var note =  $(e.target).parents("li"); 


    $.ajax({
        beforeSend: (xhr) =>{
            xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
        },
        url: universityData.root_url + '/wp-json/wp/v2/note/' + note.data('id') ,
        type: 'DELETE' ,
        success: (response) =>{
            note.slideUp();
            console.log('success');
            console.log(response);
        },
        error:(response)=>{
            console.log('sorry');
            console.log(response);
        }
    })
}



updateNote(e){
    
    var note =  $(e.target).parents("li"); 
    var infos = {
        'title': note.find(".note-title-field").val(),
        'content': note.find(".note-body-field").val()
    }
       $.ajax({
           beforeSend: (xhr) =>{
               xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
           },
           url: universityData.root_url + '/wp-json/wp/v2/note/' + note.data('id') ,
           type: 'POST' ,
           data:infos,
           success: (response) =>{
               this.readOnly(note);
               
               console.log('success');
               console.log(response);
           },
           error:(response)=>{
               console.log('sorry');
               console.log(response);
           }
       })
    }


    submitNote(e){


       
        var infos2 = {
            'title': $(".new-note-title").val(),
            'content': $(".new-note-body").val(),
            'status' : 'publish'
        }
           $.ajax({
               beforeSend: (xhr) =>{
                   xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
               },
               url: universityData.root_url + '/wp-json/wp/v2/note/' ,
               type: 'POST' ,
               data:infos2,
               success: (response) =>{
                   $(".new-note-title , .new-note-body").val('');
                   $(`
                   
                   <li data-id="${response.id}">  
               
                   <input  readonly class="note-title-field" value="${response.title.raw}">
                   <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
                   <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>


                   <textarea  readonly class="note-body-field">${response.content.raw}</textarea> 
                   <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
               </li>
                   
                   
                   
                   `).prependTo("#my-notes").hide().slideDown() ;
                   
                   console.log('success');
                   console.log(response);
               },
               error:(response)=>{
                   console.log('sorry');
                   console.log(response);
               }
           })



    }
   

}


export default Mynotes ;



/////////////////////////////////////////////////


///search-route.php:

/*

<?php

add_action('rest_api_init' , 'universityRegisterSearch');

function universityRegisterSearch(){
    register_rest_route('university/v1' , 'search' , array(
        'methods' => WP_REST_SERVER::READABLE ,
        'callback' => 'universitySearchResults'
    ));
    };

function universitySearchResults($data){

   
      $arraySearch = new WP_query(array(
          'post_type' => array('post','professor' ,'page','program','event'),
          's' => sanitize_text_field($data['term'])
      ));

      $results = array(
          'generalInfo' => array(),
          'professors' => array(),
          'programs' => array(),
          'events' => array()
      ) ;

      while($arraySearch -> have_posts()){
            $arraySearch ->the_post();
      if( get_post_type() == 'post' OR get_post_type() == 'page'){
        array_push($results['generalInfo'], array(
            'title' => get_the_title(),
            'permalink' => get_the_permalink()
        ));

      };

     
    //here was event



      if( get_post_type() == 'program'){
        array_push($results['programs'], array(
            'title' => get_the_title(),
            'permalink' => get_the_permalink(),
            'id'  => get_the_id()
        ));

      };


    if($results['programs']){

     $programMetaQuery = array('relation' => 'OR');

     foreach($results['programs'] as $item){
      array_push($programMetaQuery, array(
        'key' => 'related_program',
        'compare' => 'LIKE',
        'value' => '"' . $item['id'] . '"'
      ));
     }


      $relatedProfessor = new WP_Query(array(
        'post_type' => array('professor','event'),
        'meta_query' => $programMetaQuery
          ));

      while($relatedProfessor ->have_posts()){
            $relatedProfessor -> the_post();


            if( get_post_type() == 'event'){
              $eventDate = new DateTime(get_field('event_date'));
              array_push($results['events'], array(
                  'title' => get_the_title(),
                  'permalink' => get_the_permalink(),
                  'month' => $eventDate -> format('M'),
                  'date'   => $eventDate -> format('d')
              ));
      
            };







            if( get_post_type() == 'professor'){
              array_push($results['professors'], array(
                  'title' => get_the_title(),
                  'permalink' => get_the_permalink(),
                  'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
              ));
      
            };

      }
      
       $results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR)) ;
       $results['events'] = array_values(array_unique($results['events'], SORT_REGULAR)) ;
      
    }    
      };
        return  $results ;
   } ; 


   
*/
