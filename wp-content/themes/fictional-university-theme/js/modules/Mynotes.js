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