<?php
/**
 * IGL Potable Spirits Theme functions and definitions
 */

if ( ! function_exists( 'igl_spirits_setup' ) ) {
    function igl_spirits_setup() {
        // Let WordPress manage the document title.
        add_theme_support( 'title-tag' );

        // Enable support for Post Thumbnails on posts and pages.
        add_theme_support( 'post-thumbnails' );
    }
}
add_action( 'after_setup_theme', 'igl_spirits_setup' );

function igl_spirits_scripts() {
    // Enqueue Google Fonts
    wp_enqueue_style( 'igl-spirits-fonts', 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap', array(), null );

    // Enqueue Main Stylesheet (style.css)
    wp_enqueue_style( 'igl-spirits-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );

    // Enqueue Main JavaScript (app.js)
    wp_enqueue_script( 'igl-spirits-app', get_template_directory_uri() . '/app.js', array(), wp_get_theme()->get( 'Version' ), true );
}
add_action( 'wp_enqueue_scripts', 'igl_spirits_scripts' );
