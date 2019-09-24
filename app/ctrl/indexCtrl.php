<?php

namespace app\ctrl;
use core\lib\config;

class indexCtrl extends \core\erro
{
	public function index()
	{
		$weblist = $this->loadlist();
		$this->assign('weblist', $weblist);
		$this->display('websites.twig');
	}

	public static function loadlist() {
		return config::get('list', 'website');
	}
}
