<?php

if ( ! defined('AB_NL4WP_DEBUG') ) {
	define('AB_NL4WP_DEBUG', true);
}

function ab_nl4wp_log($message, $log = null) {
    
    if (!AB_NL4WP_DEBUG) {
        return;
    }

    $log_file = __DIR__ . DIRECTORY_SEPARATOR . 'ab-nl4wp-log.txt';
    $line = date('Y-m-d H:i:s') . ' ' . $message;
    $error = false;
    if (!file_exists($log_file)) {
        $handle = @fopen($log_file, 'a');
        if ($handle === false) {
            $error = true;
        } else {
            @fclose($handle);
            @chmod($log_file, 0666);
        }
    } else {
        if (!is_writable($log_file)) {
            $error = true;
        }
    }
    if (!$error) {
        $written = @file_put_contents($log_file, $line . PHP_EOL, FILE_APPEND | LOCK_EX);
        if ($written === false) {
            $error = true;
        }
    }
    if ($error) {
        if (isset($log)) {
            $log->error('Failed to write to ab-log');
        } else {
            error_log('Failed to write to ab-log');
        }
    }
    if (isset($log)) {
        $log->info($message);
    } else {
        error_log($message);
    }

}
