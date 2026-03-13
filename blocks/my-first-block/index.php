<?php
/**
 * My First Block: Stampa Hello World!
 * 
 * Questo blocco di esempio mostra come creare un blocco personalizzato per Gutenberg che stampa "Hello World!" quando viene inserito in una pagina o in un post.
 * 
 * @package zavatta
 */

/**
 * Registra il blocco "My First Block" nella libreria di Gutenberg
 */
function register_my_first_block()
{
    if (!function_exists('register_block_type')) :
        return;
    endif;

    register_block_type(__DIR__);
}
add_action('init', 'register_my_first_block');
