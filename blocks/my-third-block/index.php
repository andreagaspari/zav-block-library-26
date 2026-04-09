<?php

function register_my_third_block()
{
    if (!function_exists('register_block_type')) :
        return;
    endif;

    register_block_type(__DIR__, array(
        "render_callback" => "my_third_block_render_callback"
    ));
}
add_action('init', 'register_my_third_block');

/**
 * Funzione che viene invocata al momento di eseguire il render del blocco sul frontend
 * 
 * @param array $block_attributes Gli attributi del blocco impostati nell'editor
 * @param string $content L'output HTML generato dalla save (se c'è, se no stringa vuota!)
 * @param WP_Block $block_instance L'oggetto WP_Block contenente l'istanza corrente del blocco
 * 
 * @return string L'output finale in formato HTML del blocco
 */
function my_third_block_render_callback($block_attributes, $content, $block_instance) {
    $wrapper_attributes = get_block_wrapper_attributes(array(
        "class" => "la-mia-classe",     // L'attributo class esiste già, quindi aggiungo la classe alla lista
        "custom-attribute" => "valore"  // L'attributo custom-attribute non esiste, quindi lo creo e imposto il valore
    ));

    ob_start();

    // Se il blocco ha fatto una 'save' lato Javascript, troverò il risultato dentro al parametro $content
    // echo $content;

    $date_format = (array_key_exists('date_format', $block_attributes) && $block_attributes['date_format'] != '') ? 
        $block_attributes['date_format'] : get_option('date_format');
    
    ?>
        <p <?php echo $wrapper_attributes;?>><?php echo wp_date($date_format);?></p>
    <?php
    
    return ob_get_clean();
}
