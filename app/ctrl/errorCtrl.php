<?php

namespace app\ctrl;
use core\lib\config;

class errorCtrl extends \core\erro
{
	public static $codeMap = array();

	public $code = -1;
	public $text = '';

	public function index()
	{
		$loadSu = false;
		if(isset($_GET['_getpath_1'])) {
			$this->code = $_GET['_getpath_1'];
		} else {
			$this->code = '404';
		}

		if(!$this->load($this->code)) {
			$this->code = '403';
			$this->text = 'FORBIDDEN';
		} else {
			$this->text = self::$codeMap[$this->code];
		}
		
		$this->assign('code', $this->code);
		$this->assign('text', $this->text);
		$this->assign('time', '{{ time }}');
		$this->assign('date', '{{ date }}');
		$this->display('errors.html');
	}

	public static function load($code) {
		// 加载错误代码及其对应的标识文字
		if(isset($codeMap[$code])) {
			return true;
		} else {
			try {
				self::$codeMap[$code] = config::get($code, 'error');
				return true;
			} catch (\Exception $e) {
				return false;
			}
		}
	}
}
