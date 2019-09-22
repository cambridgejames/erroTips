<?php
/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * Main loader script
 *
 * @package Wechatgenerator
 */

define('ERRO', realpath('./'));
define('CORE', ERRO.'/core');
define('APP', ERRO.'/app');
define('RESOURCE', '/static');
define('MODULE', 'app');
define('DEBUG', true);

include "vendor/autoload.php";

if(DEBUG) {
	$whoops = new \Whoops\Run;
	$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
	$whoops->register();
	ini_set('display_error', 'On');
} else {
	ini_set('display_error', 'Off');
}

include CORE.'/common/function.php';
include CORE.'/erro.php';

spl_autoload_register('\core\erro::load');


session_start();
\core\erro::run();
