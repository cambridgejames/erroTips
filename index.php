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
define('RESOURCE', ERRO.'/static');
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

// 下面注册全局捕捉函数
if(!DEBUG) {
	//set_error_handler('customerror');
	set_exception_handler('customexception');
	register_shutdown_function('customend');
}

\core\erro::run();
