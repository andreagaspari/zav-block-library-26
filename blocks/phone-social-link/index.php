<?php

function phone_social_link_enqueue_scripts() {
    if (!is_admin()):
        return;
    endif;

    $assets = include(__DIR__ . '\build\index.asset.php');

    wp_enqueue_script(
        'phone-social-link',
        plugin_dir_url( __DIR__ ) . 'phone-social-link/build/index.js',
        $assets['dependencies']
    );
}
add_action('enqueue_block_assets', 'phone_social_link_enqueue_scripts');

if (has_filter('block_core_social_link_get_services')):
    add_filter('block_core_social_link_get_services', function($services) {
        $services['phone'] = array(
            "label" => "Chiama",
            "icon"  => '<svg viewBox="0 0 32 32" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Icon-Set-Filled" transform="translate(-258.000000, -309.000000)" fill="#000000"> <path d="M289.073,313.433 L286.195,310.563 C285.401,309.77 284.112,309.77 283.317,310.563 L279,316.303 C278.341,317.274 278.206,318.38 279,319.173 L280.762,320.93 C279.456,322.68 277.888,324.588 276.123,326.348 C274.127,328.338 271.907,330.147 269.911,331.633 L268.208,329.936 C267.414,329.143 266.305,329.277 265.33,329.936 L259.574,334.241 C258.609,334.906 258.779,336.318 259.574,337.111 L262.452,339.98 C264.042,341.566 266.109,341.058 268.208,339.98 C268.208,339.98 274.561,336.424 280,331 C285.116,325.898 289.073,319.173 289.073,319.173 C289.898,316.91 290.663,315.018 289.073,313.433" id="phone" > </path> </g> </g> </g></svg>'
            //"icon" => file_get_contents('ilmiofile.svg')
        );
        
        return $services;
    });
else :
    add_filter('render_block_core/social-link', function($block_content, $block_data) {
        if ($block_data['attrs']['service'] == 'phone') :
            $block_content = preg_replace('/<svg\b[^>]*>.*?<\/svg>/is', '<svg viewBox="0 0 32 32" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Icon-Set-Filled" transform="translate(-258.000000, -309.000000)" fill="#000000"> <path d="M289.073,313.433 L286.195,310.563 C285.401,309.77 284.112,309.77 283.317,310.563 L279,316.303 C278.341,317.274 278.206,318.38 279,319.173 L280.762,320.93 C279.456,322.68 277.888,324.588 276.123,326.348 C274.127,328.338 271.907,330.147 269.911,331.633 L268.208,329.936 C267.414,329.143 266.305,329.277 265.33,329.936 L259.574,334.241 C258.609,334.906 258.779,336.318 259.574,337.111 L262.452,339.98 C264.042,341.566 266.109,341.058 268.208,339.98 C268.208,339.98 274.561,336.424 280,331 C285.116,325.898 289.073,319.173 289.073,319.173 C289.898,316.91 290.663,315.018 289.073,313.433" id="phone" > </path> </g> </g> </g></svg>', $block_content);
        endif;

        return $block_content;
    }, 10, 2);
endif;