<?php
namespace core\lib;
use core\lib\config;

class route
{
	public $ctrl;
	public $action;

	public function __construct()
	{
		if(isset($_SERVER['PATH_INFO']) && $_SERVER['PATH_INFO'] != '/') {
			$path = $_SERVER['PATH_INFO'];
			$patharr = explode('/', trim($path, '/'));
			if(isset($patharr[0])) {
				$this->ctrl = $patharr[0];
				unset($patharr[0]);
			}

			// 将多余的url解析为GET参数
			$count = count($patharr) + 1;
			for($i = 1; $i < $count; $i = $i + 1) {
				$_GET['_getpath_'. $i] = $patharr[$i];
			}

		} else {
			$this->ctrl = config::get('CTRL', 'route');
		}
		$this->action = config::get('ACTION', 'route');
	}
}
