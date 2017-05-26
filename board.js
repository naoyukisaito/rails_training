// æ©è?
// åä»å¯è½æ°è¨­å®?
// ã»?ã?ã¿ã³æ¼ä¸ã§ã?30å? / 30å?»¥å¤ã?æ?ã®è¡¨ç¤ºã»éè¡¨ç¤ºã®å?æ¿ã?
// ã»è¡¨ç¤ºå?æ¿ãæãtheadãã?ãcolspanãã?å?æ¿ã?
// ã»è¡¨ç¤ºå?æ¿ãæã?30å? ã®ç½«ç·è¿½å?/åé¤

var HPB = HPB || {};
HPB.KLP = HPB.KLP || {};

HPB.KLP.Toggle_frame = function(tr) {
	this.$trigger = $(tr).find('.jscToggleFrameTrigger');
	this.init();
};
HPB.KLP.Toggle_frame.prototype = {
	IS_CLOSED: 'isClosed',
	IS_OPENED: 'isOpened',
	IS_DISABLED: 'dn',

	// ç©ºç½ã»ã«ãå?ãéé?
	INTERVAL: '8',
	init: function() {
		this.$minutesObj = $('.jscToggleFrameMinutes');
		this.$timeAllObj = $('.jscToggleFrameTime');
		this.$tbodyTrObj = $('.jscToggleFrameBody');
		this.$headBlankNum = this.$timeAllObj.eq(0).find('.jscToggleFrameHeadBlank').length;
		this.headMinutesAllNum = this.$minutesObj.eq(0).find('th').length;
		this.headTimeAllNum = this.$timeAllObj.eq(0).find('th').length - this.$headBlankNum;
		this.rsvframeNum = this.$tbodyTrObj.eq(0).find('td:hidden').length / this.headTimeAllNum;
		this.headMinutesElementNum = this.headMinutesAllNum / this.headTimeAllNum;
		var $rows = this.$tbodyTrObj.eq(0).find('td');
		// 1æéãããã?30å? ã¨å?ºç´? ã§è¡¨ç¤ºãããã»ã«æ°
		this.FrameNum = ($rows.length / this.headTimeAllNum);
		this.bindEvent();
	},
	bindEvent: function() {
		var _self = this;

		this.$trigger.on('click', function() {
			var index = _self.$trigger.index(this);
			_self.toggleBtn(index, $(this));
			_self.toggleHeadFrame(index, $(this));
			_self.toggleBodyFrame(index);
		});
	},
	toggleHeadFrame: function(index, trigger) {
		var _self = this;
		// è¨ç®ã§ä½¿ç¨ãããã+1
		var index = index + 1;

		this.toggleTime(index, trigger);
		this.toggleMinutes(index);
	},
	toggleTime: function(index, trigger) {
		// ãæéãã?å¶å¾¡
		var _self = this;
		// headé¨å??ç©ºç½ã»ã«å¯¾å¿?
		var blank = Math.floor(index / this.INTERVAL);
		if ((index % this.INTERVAL) === 0) {
			blank = blank - 1;
		}
		index = index + blank;

		this.$timeAllObj.each(function() {
			if (trigger.hasClass(_self.IS_OPENED)) {
				$(this).find('th').eq(index).attr({
					'colspan': _self.rsvframeNum,
					'rowspan': '1'
				}).css('lineHeight', '28px');
				return;
			}
			$(this).find('th').eq(index).attr({
				'colspan': '2',
				'rowspan': '2'
			}).css('lineHeight', '57px');
		});
	},

	toggleMinutes: function(index) {
		// ãå?ãã?å¶å¾¡
		var _self = this;
		var end = this.headMinutesElementNum * index;
		var start = end - this.headMinutesElementNum;

		this.$minutesObj.each(function() {
			var sliceMinutes = $(this).find('th').slice(start, end);
			if (sliceMinutes.hasClass(_self.IS_DISABLED)) {
				sliceMinutes.removeClass(_self.IS_DISABLED);
				return;
			};

			sliceMinutes.addClass(_self.IS_DISABLED);
		});
	},

	toggleBodyFrame: function(index) {
		var _self = this;

		this.$tbodyTrObj.each(function() {
			var clsStart = 2 * index;
			var clsEnd = 2 * index + 2;
			var opmStart = _self.rsvframeNum * index;
			var opmEnd = (_self.rsvframeNum * index) + _self.rsvframeNum;
			var $frameCls = $(this).find('.jscToggleFrameClose').slice(clsStart, clsEnd);
			var $frameOpn = $(this).find('.jscToggleFrameOpen').slice(opmStart, opmEnd);

			if ($frameOpn.hasClass(_self.IS_DISABLED)) {
				$frameOpn.removeClass(_self.IS_DISABLED);
				$frameCls.addClass(_self.IS_DISABLED);
				return;
			}
			$frameOpn.addClass(_self.IS_DISABLED);
			$frameCls.removeClass(_self.IS_DISABLED);
		});
	},

	toggleBtn: function(index) {
		var _self = this;

		this.$timeAllObj.each(function() {
			var $trigger = $(this).find('.jscToggleFrameTrigger').eq(index);

			if ($trigger.hasClass(_self.IS_CLOSED)) {
				$trigger.removeClass(_self.IS_CLOSED);
				$trigger.addClass(_self.IS_OPENED);
				return;
			}
			$trigger.removeClass(_self.IS_OPENED);
			$trigger.addClass(_self.IS_CLOSED);
		});
	},
}

HPB.KLP.JudgeRsvNum_03 = function(scope) {
	this.$scope = $(scope);
	this.init();
};

HPB.KLP.JudgeRsvNum_03.prototype = {
	IS_DISABLED: 'dn',
	BG_CHANGED: 'bg_fffd98',
	BG_ERROR: 'bg_fdeae2',
	TXT_ERROR: 'mod_color_e50000',
	REGULAR_EXP: /jscToggleFrame_\d{3}/,
	init: function() {
		this.setParameters();
		this.makeSelect();
		this.bindEvent();
	},
	setParameters: function() {
		this.$toggletable = $('.jscToggleTblCell')
		this.$frameCls = this.$scope.find('.jscPossibleClose');
		this.$frameOpn = this.$scope.find('.jscPossibleOpen');
		this.$changeInputTarget = this.$scope.find('.jscChangeInputTarget');
		this.$changeInputTrigger = this.$scope.find('.jscChangeInputTrigger');
		this.$defaultCls = this.$scope.find('.jscToggleFrameClose');
		this.$defaultOpn = this.$scope.find('.jscToggleFrameOpen');
		this.td = this.$scope.find('td');
		this.indivisualOpt = '<option value="åå¥" selected="selected">åå¥</option>';
	},
	makeSelect: function() {
		var options = [];
		this.madeSelectbox = $('<select class="setInfoSelectBox setReceiveSelectbox jscChangeInputSelect">');
		for (var i = 0; i <= 99; i++) {
			options[i] = "<option value=\"" + i + "\">" + i + "</option>";
		}
		options.join("");
		this.madeSelectbox.prepend(options);
	},
	addSelect: function($trigger, triggerText) {
		var cloneSelect = this.madeSelectbox.clone();

		if (triggerText === 'åå¥') {
			cloneSelect.prepend(this.indivisualOpt);
		}
		$trigger.parent('td').find('.jscChangeInputTarget').after(cloneSelect);
		this.getSelectObj();
	},
	getSelectObj: function() {
		this.$select = this.$scope.find('.jscChangeInputSelect');
	},
	bindEvent: function() {
		var self = this;

		this.$scope.on('click', '.jscChangeInputTrigger', function() {
			self.showSelect($(this));
		});
		this.$scope.on('click', '.jscChangeInputTarget', function() {
			self.toggleTarget($(this));
		});

		// selectå¤æ´ã§å±éããå?ç?
		this.$scope.on('change', '.jscChangeInputSelect', function() {
			var frame = $(this).parent('td');
			var val = $(this).val();
			var defaultNum = frame.find('.jscChangeInputTrigger').text();
			self.changeNum($(this));
			self.setBg(frame);
			if (val !== defaultNum) {
				return;
			}
			self.relBg(frame);
		});
		// ç´°å?æ?ã®selectå¤æ´ã§è¡ãå¦ç?
		this.$frameOpn.on('changeValue', '.jscChangeInputSelect', function() {
			self.compareOpnNum($(this));
			self.prepareErrorBg($(this));
		});
		// 30å? ã®selectå¤æ´ã§è¡ãå¦ç?
		this.$frameCls.on('change', '.jscChangeInputSelect', function() {
			self.setOpnRange($(this));
		});
	},
	prepareErrorBg: function($trigger) {
		var triggerClass = this.getTriggerClass($trigger);
		var index = this.getOpnIndex($trigger);
		var $target = this.getOpnRsvFrame(index);
		var num = $trigger.val();
		var rsvNum = $target.find('p').text();
		var calc = rsvNum - num;
		this.checkNeedErrBg($target, calc, triggerClass);
	},
	checkNeedErrBg: function($target, calc, triggerClass) {
		// äºç´??æå¤-å¤æ´å¤(calc)ãä½¿ç¨ãã¦ã¨ã©ã¼èæ¯ãå¿?¦ãã©ã?å¤å®?
		if (calc >= 0) {
			this.setErrorBg($target);
			this.checkWholeErrBg(triggerClass);
			return;
		}
		this.relErrorBg($target);
		this.checkWholeErrBg(triggerClass);
	},
	checkWholeErrBg: function(triggerClass) {
		var $range = this.$defaultOpn.filter(function() {
				return $(this).hasClass(triggerClass);
			}),
			isError = $range.filter(function() {
					// ä½æãå®ç¾©ããå®æ°ã§ã¯ã¯ã©ã¹åãåå¾ã§ããªã??ã§ç´æ¸ã?
					return $(this).hasClass('bg_fdeae2');
				}).length > 0,
			target = this.getClsRsvFrame(triggerClass);

		// ç´°å?æ?ã«1ã¤ã§ãã¨ã©ã¼è¡¨ç¤ºãå?ã¦ã?ã?30å? ãã¨ã©ã¼è¡¨ç¤º
		if (isError) {
			this.setErrorBg(target);
		} else {
			this.relErrorBg(target);
		}
	},
	compareOpnNum: function($trigger) {
		// è¦ç´?é?ã®å¤ãæ¯è¼?ãå¤æ´ããå¤ããã®ä»ã¨1ã¤ã§ãç°ãªãã?30å? ã®è¡¨ç¤ºããåå¥ãã«å¤æ´
		var self = this;
		var triggerClass = this.getTriggerClass($trigger);
		var num = $trigger.parent('td').find('.jscChangeInputTarget').text();
		var triggerNum = $trigger.parent().find('.jscChangeInputTrigger').text();
		var $target = this.$frameCls.filter(function() {
			return $(this).hasClass(triggerClass);
		});

		// ç´°å?è¡¨ç¤ºã®æ°å­ãå¤æ´ãã¦ãå?æè¡¨ç¤ºã¨åãå¤ã§ãªããã°ã?30å? ãèæ¯ãå¤ãã?
		if (triggerNum === num) {
			this.relBg($target);
		} else {
			this.setBg($target);
		}

		if (this.isMismatch(triggerClass, num)) {
			this.setIndividual(triggerClass);
			return;
		}
		this.syncNum(triggerClass, num);
	},
	isMismatch: function(triggerClass, num) {
		var $range = this.getOpnFrameRange(triggerClass);

		var isMismatch = $range.filter(function() {
			return $(this).find('.jscChangeInputTarget').text() != num;
		});
		return isMismatch.length > 0;
	},
	setIndividual: function(triggerClass) {
		var $target = this.$frameCls.filter(function() {
			return $(this).hasClass(triggerClass);
		});
		$target.find(this.$changeInputTrigger).addClass(this.IS_DISABLED);
		$target.find(this.$changeInputTarget).text('åå¥').removeClass(this.IS_DISABLED);
		$target.find(this.$select).addClass(this.IS_DISABLED);

		// ãã§ã«ã»ã¬ã¯ãå?ã«ãåå¥ããåºç¾ãã¦ã?å ´åã?return
		if ($target.find(this.$select).children('option[value=åå¥]').length > 0) {
			return;
		}
		$target.find(this.$select).prepend(this.indivisualOpt);
	},
	syncNum: function(triggerClass, num) {
		var $target = this.getClsTarget(triggerClass),
			defaultNum = $target.find(this.$changeInputTrigger).text(),
			targetSelect = $target.find('.jscChangeInputSelect');

		$target.find(this.$changeInputTrigger).addClass(this.IS_DISABLED);
		$target.find(this.$changeInputTarget).text(num).removeClass(this.IS_DISABLED);
		this.setBg($target);

		// å¤æ´ããæ°å¤ãå?æå¤ã¨åããªãèæ¯è²ãåã?
		if (defaultNum !== num) {
			return;
		}
		this.relBg($target);
	},
	setOpnRange: function($trigger) {
		// å¤æ´ãã30å? ã«ç´ä»ãç´°å?æ?ã®åå¾?
		var triggerClass = this.getTriggerClass($trigger),
			$range = this.getOpnFrameRange(triggerClass);

		// ç´ä»ãç´°å?æ?ã«è¡ãå¦ç?
		this.changeSubBg($trigger, $range, triggerClass);
		this.clearOpnSelect($range);
	},
	changeSubBg: function($trigger, $range, triggerClass) {
		var self = this;

		this.setBg($range);
		// 30å? ã®æ°å¤ãå¤æ´ããããç´°å?æ?ã®æ°å¤ãä¸æ¬ã§å¤æ´
		this.changeOpnNum($trigger, $range);
		// ç´°å?æ?ã®æ°å¤å¤æ´ã¨åæã«ç´°å?æ?ã®ã¨ã©ã¼å¤å®ãããããã«è¡ã

		$range.each(function() {
			var index = self.getOpnIndex($(this).children()),
				$target = self.getOpnRsvFrame(index),
				num = $trigger.val(),
				rsvNum = $target.find('p').text(),
				calc = rsvNum - num;
			self.checkNeedErrBg($target, calc, triggerClass);
		});
	},
	clearOpnSelect: function($range) {
		// ç´°å?æ?ã®selectãè¡¨ç¤ºãããç¶æã§30å? ãå¤æ´ãããselectãéè¡¨ç¤º
		$range.find(this.$select).addClass(this.IS_DISABLED);
	},
	showSelect: function($trigger) {
		var triggerText = $trigger.text();
		this.addSelect($trigger, triggerText);
		$trigger.parent(this.td).find(this.$select).val(triggerText);
		$trigger.addClass(this.IS_DISABLED);
	},
	toggleTarget: function($trigger) {
		var triggerText = $trigger.text();
		this.addSelect($trigger, triggerText);
		$trigger.parent(this.td).find(this.$select).val(triggerText);
		$trigger.addClass(this.IS_DISABLED);
	},
	changeNum: function($select) {
		var selectBoxText = $select.val();
		$select.parent(this.td).find('.jscChangeInputTarget').text(selectBoxText).removeClass(this.IS_DISABLED);
		$select.trigger('changeValue');
		$select.remove();
	},
	changeOpnNum: function($trigger, $targets) {
		var self = this,
			num = $trigger.val(),
			$target = $targets.find(this.$changeInputTarget);

		$target.text(num).removeClass(this.IS_DISABLED);
		$targets.find(this.$changeInputTrigger).addClass(this.IS_DISABLED);

		// 30å? ã§å¤æ´ããå¤ãç´°å?æ?ã«ã¨ã£ã¦åæå¤ã?ã£ãå?´åãèæ¯è²ãåã?
		$targets.each(function() {
			var defaultNum = $(this).find(self.$changeInputTrigger).text();

			if (num !== defaultNum) {
				return;
			}
			self.relBg($(this));
		})
	},
	getTriggerClass: function($trigger) {
		// triggerããç´ä»ãã«å¿?¦ãªclassã®æ½åº
		var triggerClass = $trigger.parent().attr('class').match(this.REGULAR_EXP).toString();

		return triggerClass;
	},
	getOpnFrameRange: function(triggerClass) {
		// triggerClassã«ç´ä»ãç´°å?æ?ã®åå¾?
		var range = this.$frameOpn.filter(function() {
			return $(this).hasClass(triggerClass);
		});
		return range;
	},
	getOpnIndex: function($trigger) {
		// ç´°å?æ?ã®åä»å¯è½æ°ã®indexã®åå¾?
		var index = $trigger.parent().index('.jscPossibleOpen');

		return index;
	},
	getOpnRsvFrame: function(index) {
		// getOpnIndexã§åå¾ããindexã¨åå¤ã®äºç´?°ã»ã«ã®åå¾?
		var targets = this.$defaultOpn.filter(function() {
			return $(this).index('.jscRsvDefaultOpen') === index;
		});
		return targets;
	},
	getClsRsvFrame: function(triggerClass) {
		// 30å? ã®å¯è½æ°ã¨ç´ä»ãäºç´?°ã»ã«ã®åå¾?
		var target = this.$defaultCls.filter(function() {
			return $(this).hasClass(triggerClass);
		});

		return target;
	},
	getClsTarget: function(triggerClass) {
		var target = this.$frameCls.filter(function() {
			return $(this).hasClass(triggerClass);
		});
		return target;
	},
	setBg: function($target) {
		$target.addClass(this.BG_CHANGED);
	},
	relBg: function($target) {
		$target.removeClass(this.BG_CHANGED);
	},
	setErrorBg: function($target) {
		$target.addClass(this.BG_ERROR);
		$target.addClass(this.TXT_ERROR);
	},
	relErrorBg: function($target) {
		$target.removeClass(this.BG_ERROR);
		$target.removeClass(this.TXT_ERROR);
	}
};

$(function() {
	$('.jscToggleFrameTime').each(function() {
		new HPB.KLP.Toggle_frame(this);
	});
	$('.jscScheduleArea').each(function() {
		new HPB.KLP.JudgeRsvNum_03(this);
	})
});
