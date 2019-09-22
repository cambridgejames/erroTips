<?php
function p($var)
{
	if (is_bool($var)) {
		var_dump($var);
	} else if (is_null($var)) {
		var_dump(NULL);
	} else {
		echo "<pre style='position:relative; z-index:1000; padding:10px; border-radius:5px; background:#F%F%F%; border:1px solid #aaa; font-size: 14px; line-height:18px; opacity:0.9;'>" . print_r($var, true) . "</pre>";
	}
}

function customerror($error_level, $error_message, $error_file, $error_line, $error_context)
{
	die();
}

function customexception($exception)
{
	header('Location: /error/403');
	die();
}

function customend()
{
	if(error_get_last()) {
		die();
	}
}
