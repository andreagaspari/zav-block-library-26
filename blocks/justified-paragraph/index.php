<?php

function justified_paragraph_enqueue_scripts() {
    if (!is_admin()):
        return;
    endif;

    $assets = include(__DIR__ . '\build\index.asset.php');

    wp_enqueue_script(
        'justified_paragraph_enqueue_scripts',
        plugin_dir_url( __DIR__ ) . 'justified-paragraph/build/index.js',
        $assets['dependencies']
    );
}
add_action('enqueue_block_assets', 'justified_paragraph_enqueue_scripts');