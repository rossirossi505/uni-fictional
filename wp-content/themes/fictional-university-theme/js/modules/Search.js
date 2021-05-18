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


   if(this.searchField.val() && this.searchField.val() !== ' ' && this.searchField.val() !== '  '){
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
//this.resultDiv.html(`this is result`);

/*
$.getJSON(universityData.root_url+'/wp-json/university/v1/search', result =>{

this.resultDiv.html("this is reso");


this.isSpinnerLoaded = false
}) ;
*/


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