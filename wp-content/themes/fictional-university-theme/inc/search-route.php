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

