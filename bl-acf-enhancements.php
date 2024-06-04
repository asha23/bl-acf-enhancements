<?php
/**
 * Plugin Name: BrightLocal - ACF Enhancements
 * Description: Add drag and drop functionality to flexible content. Add the ability to add NEW! to content block items.
 * Version: 1.0.3
 * Author: Ash Whiting for BrightLocal
 * Author URI: https://brightlocal.com
 * Text Domain: bl-acf-enhancements
 * GitHub Plugin URI: https://github.com/asha23/bl-acf-enhancements
 * Primary Branch: main
 * Release Asset: true
 */

if (!defined('ABSPATH')) {
    exit;
}

function brightlocal_flexible_content_drag_enqueue_scripts() {
    // Enqueue script
    wp_enqueue_script('brightlocal-flexible-content-drag', plugin_dir_url(__FILE__) . 'js/app.js', array('jquery', 'acf-input'), '1.0.0', true);
    
    // Enqueue stylesheet
    wp_enqueue_style('brightlocal-flexible-content-drag-style', plugin_dir_url(__FILE__) . 'css/styles.css', array(), '1.0.0');
}
add_action('admin_enqueue_scripts', 'brightlocal_flexible_content_drag_enqueue_scripts');




