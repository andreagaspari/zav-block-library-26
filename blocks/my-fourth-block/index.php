<?php

function register_my_fourth_block()
{
    if (!function_exists('register_block_type')) :
        return;
    endif;

    register_block_type(__DIR__);
}
add_action('init', 'register_my_fourth_block');
