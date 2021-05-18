<?php
  
  get_header(); 
  pageBanner(array(
    'title' => 'this is title ' ,
    
    'photo' => 'https://images.unsplash.com/photo-1565103446317-476a2b789651?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
  ));


  while(have_posts()) {
    the_post();
    
     ?>

    <div class="container container--narrow page-section">
          

      <div class="generic-content">
      <div class="row group">

           <div class="one-third">
              <?php echo the_post_thumbnail('professorPortrait2'); ?>
           </div>

         <?php 
         
         $linkedProfessor = new WP_Query(array(
           'post_type' => 'like',
           'meta_query' => array(
             array(
               'key' => 'professor_id',
               'compare' => 'LIKE' ,
               'value' => get_the_id()
             )
           )
         ));
         
         
         
         
         ?> 

           <div class="two-thirds"> 
              <span class="like-box"  >

               <i class="fa fa-heart-o" aria-hidden="true"> </i>
               <i class="fa fa-heart" aria-hidden="true"> </i>
               <i class="like-count" ><?php echo $linkedProfessor->found_posts ; ?></i>
              </span>

              <?php the_content(); ?>
           </div>

</div>
      
     
      </div>
  
          <?php 
        }

      ?>


      <?php 
       $relatedProgram = get_field('related_program');
       if($relatedProgram){

        echo '<hr class="section-break">';
        echo '<h2 class="headline headline--medium">Subject(s)</h2>';
        echo '<ul class="link-list min-list" >' ;
         foreach($relatedProgram as $program){ ?>
           <li> <a href="<?php echo get_the_permalink($program); ?>"><?php echo get_the_title($program); ?> </a></li>
        <?php   };
 
        echo '<ul>' ;

       }
         
       
      ?>
    </div>
    



    
  <?php 

  get_footer();

?>