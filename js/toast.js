/* global jQuery */
;(function ($) {
	
	var isInit = false;
	var $containerDiv;
	
	var toast = {
		init: init,
		destory: destory,
		info: info,
		warn: warn,
		success: success,
		error: error,
		notifys: [],
		options: {},
		upToDown: true,
		position: 'lb',
		timeout: 3000
	};
	
	var defaultOptions = {
		width: '',
		height: '',
		icon: '',
		upToDown: true,
		position: 'lb',
		closeButton: false,
		timeout: 3000
	}
	
	/**
	 * Init
	 */
	function init(options) {
		if (!isInit) {
			$containerDiv = jQuery('<div/>', {class: 'toast-notify-container-div'});
			$containerDiv.appendTo($('body'));
			isInit = true;
			toast['options'] = $.extend({}, defaultOptions, options);
			toast['upToDown'] = toast['options']['upToDown'];
			toast['position'] = toast['options']['position'];
			toast['timeout'] = toast['options']['timeout'];
		}
		return toast;
	}
	
	/**
	 * 摧毀 Toast
	 */
	function destory() {
		isInit = false;
		$.extend(toast, {
			notifys: [],
			options: {},
			upToDown: true,
			position: 'lb'
		});
		$.extend(defaultOptions, {
			width: '',
			height: '',
			icon: '',
			upToDown: true,
			position: 'lb',
			closeButton: false
		});
		
		if ($containerDiv) {
			$containerDiv.fadeOut(800, function () { $(this).remove(); });
		}
		return toast;
	}
	
	/**
	 * 建立 Toast 所用到的 Element
	 */
	function notifyCreate(className, message, url, options) {
		init(options);
		
		var $notifyDiv 			= $('<div/>', {class: 'toast-notify-div ' + className, role: 'alert'});
		var $notifyMessageDiv	= $('<div/>', {class: 'toast-notify-message-div', text: message});
        var $goUrlSpan          = $('<span/>', {class: 'toast-notify-go-url-span'});
		var $closeButtonDiv		= $('<div/>', {class: 'toast-notify-close-button-div'});
		
		$notifyDiv['show'] = show;
		$notifyDiv['hide'] = hide;
        $notifyDiv.prop('url', url)
                  .css(getNotifyOptionsCSS(className, options))
                  .hover(highlightNotify, notifyShowComplete)
                  .on('click', notifyClickEvent);
        if (url) {
            $notifyMessageDiv.append($goUrlSpan);   
        }
		$notifyMessageDiv.appendTo($notifyDiv);
        
		
		$closeButtonDiv.on('click', function (event) {
            closeButtonClickEvent(event);
        });
		$closeButtonDiv.appendTo($notifyDiv);
		
		addNotify();
		positionHandler();
		
		return $notifyDiv.fadeIn(800, notifyShowComplete);
		
		/**
		* 取得個別 Notify 的 Style
		*/
		function getNotifyOptionsCSS(className, options) {
			var cssOption = {display: 'none'};
			
			toast['options'] = $.extend({}, defaultOptions, options);
			
			cssOption['width'] = toast['options']['width'];
			cssOption['height'] = toast['options']['height'];
			if (toast['options']['icon'] !== '') {
				cssOption['background-image'] = 'url(' + toast['options']['icon'] + ')';
			}
			
			return cssOption;
		}
		
		/**
		* 處理 Toast 的 Position
		*/
		function positionHandler() {
			$containerDiv.addClass('container-' + toast['position']);
			$notifyDiv.addClass('notify-' + toast['position']);
		}
		
		/**
		* 將建立好的 Notify Element push 到集合 和 container
		*/
		function addNotify() {
			toast['notifys'].push($notifyDiv);
			if (toast['upToDown']) {
				$notifyDiv.appendTo($containerDiv);
			} else {
				//toast['notifys'].reverse();
				$notifyDiv.prependTo($containerDiv);
			}
		}
	
		/**
		* 設定 Notify 顯示後多久隱藏
		*/
		function notifyShowComplete() {
			var timeoutId = setTimeout($notifyDiv.hide, toast['timeout']);
			$notifyDiv.prop('timeoutId', timeoutId);
		}
		
		/**
		* Hide Notify Element
		*/
		function hide() {
			return $notifyDiv.fadeOut(800);
		}
		
		/**
		* Show Notify Element
		*/
		function show() {
			return $notifyDiv.fadeIn(800);
		}
		
		/**
		 * Focus Notify
		 */
		function highlightNotify() {
			var timeoutId = $notifyDiv.prop('timeoutId');
			clearTimeout(timeoutId);
		}
		
		/**
		 * Close Button on Click Event
		 */
		function closeButtonClickEvent(event) {
            event.stopPropagation();
			$notifyDiv.hide();
		}
		
		/**
         * Toast Noitfy on Click Event
         */
		function notifyClickEvent() {
			var url = $notifyDiv.prop('url');
            if (url !== undefined) {
                open(url);
            }
		}
	}
	
	/**
	 * Information Notify Toast
	 */
	function info(message, url, options) {
        if (Object.prototype.toString.call(url) === '[object Object]') {
          options = url;
		  return notify = notifyCreate('alert alert-info', message, undefined, options);
        } else if (Object.prototype.toString.call(url) === '[object String]') {
		  return notify = notifyCreate('alert alert-info', message, url, options);
        }
	}
	
	/**
	 * Warning Notify Toast
	 */
	function warn(message, options) {
		return notify = notifyCreate('alert alert-warning', message, options);
	}
	
	/**
	 * Success Notify Toast
	 */
	function success(message, options) {
		return notify = notifyCreate('alert alert-success', message, options);
	}
	
	/**
	 * Error Notify Toast
	 */
	function error(message, options) {
		return notify = notifyCreate('alert alert-danger', message, options);
	}
	
	window['toast'] = toast;
})(jQuery);