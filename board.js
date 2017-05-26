// 機�?
// 受付可能数設�?
// ・?��?タン押下で�?30�? / 30�?��外�?�?の表示・非表示の�?��替�?
// ・表示�?��替え時「thead」�?「colspan」�?�?��替�?
// ・表示�?��替え時�?30�?��の罫線追�?/削除

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

	// 空白セルが�?る間�?
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
		// 1時間あたり�?30�?��と�?���?��で表示されるセル数
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
		// 計算で使用するため+1
		var index = index + 1;

		this.toggleTime(index, trigger);
		this.toggleMinutes(index);
	},
	toggleTime: function(index, trigger) {
		// 「時間」�?制御
		var _self = this;
		// head部�??空白セル対�?
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
		// 「�?」�?制御
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
		this.indivisualOpt = '<option value="個別" selected="selected">個別</option>';
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

		if (triggerText === '個別') {
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

		// select変更で共通する�?�?
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
		// 細�?���?のselect変更で行う処�?
		this.$frameOpn.on('changeValue', '.jscChangeInputSelect', function() {
			self.compareOpnNum($(this));
			self.prepareErrorBg($(this));
		});
		// 30�?��のselect変更で行う処�?
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
		// 予�??期値-変更値(calc)を使用してエラー背景が�?��かど�?��判�?
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
					// 何故か定義した定数ではクラス名が取得できな�??で直書�?
					return $(this).hasClass('bg_fdeae2');
				}).length > 0,
			target = this.getClsRsvFrame(triggerClass);

		// 細�?���?に1つでもエラー表示が�?て�?���?30�?��もエラー表示
		if (isError) {
			this.setErrorBg(target);
		} else {
			this.relErrorBg(target);
		}
	},
	compareOpnNum: function($trigger) {
		// 要�?�?��の値を比�?��、変更した値がその他と1つでも異なれ�?30�?��の表示を「個別」に変更
		var self = this;
		var triggerClass = this.getTriggerClass($trigger);
		var num = $trigger.parent('td').find('.jscChangeInputTarget').text();
		var triggerNum = $trigger.parent().find('.jscChangeInputTrigger').text();
		var $target = this.$frameCls.filter(function() {
			return $(this).hasClass(triggerClass);
		});

		// 細�?��表示の数字を変更して、�?期表示と同じ値でなければ�?30�?��も背景を変え�?
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
		$target.find(this.$changeInputTarget).text('個別').removeClass(this.IS_DISABLED);
		$target.find(this.$select).addClass(this.IS_DISABLED);

		// すでにセレクト�?に「個別」が出現して�?��場合�?return
		if ($target.find(this.$select).children('option[value=個別]').length > 0) {
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

		// 変更した数値が�?期値と同じなら背景色を取�?
		if (defaultNum !== num) {
			return;
		}
		this.relBg($target);
	},
	setOpnRange: function($trigger) {
		// 変更した30�?��に紐付く細�?���?の取�?
		var triggerClass = this.getTriggerClass($trigger),
			$range = this.getOpnFrameRange(triggerClass);

		// 紐付く細�?���?に行う処�?
		this.changeSubBg($trigger, $range, triggerClass);
		this.clearOpnSelect($range);
	},
	changeSubBg: function($trigger, $range, triggerClass) {
		var self = this;

		this.setBg($range);
		// 30�?��の数値が変更されたら細�?���?の数値も一括で変更
		this.changeOpnNum($trigger, $range);
		// 細�?���?の数値変更と同時に細�?���?のエラー判定をそれぞれに行う

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
		// 細�?���?のselectが表示された状態で30�?��を変更したらselectを非表示
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

		// 30�?��で変更した値が細�?���?にとって初期値�?った�?�合、背景色を取�?
		$targets.each(function() {
			var defaultNum = $(this).find(self.$changeInputTrigger).text();

			if (num !== defaultNum) {
				return;
			}
			self.relBg($(this));
		})
	},
	getTriggerClass: function($trigger) {
		// triggerから紐付けに�?��なclassの抽出
		var triggerClass = $trigger.parent().attr('class').match(this.REGULAR_EXP).toString();

		return triggerClass;
	},
	getOpnFrameRange: function(triggerClass) {
		// triggerClassに紐付く細�?���?の取�?
		var range = this.$frameOpn.filter(function() {
			return $(this).hasClass(triggerClass);
		});
		return range;
	},
	getOpnIndex: function($trigger) {
		// 細�?���?の受付可能数のindexの取�?
		var index = $trigger.parent().index('.jscPossibleOpen');

		return index;
	},
	getOpnRsvFrame: function(index) {
		// getOpnIndexで取得したindexと同値の予�?��セルの取�?
		var targets = this.$defaultOpn.filter(function() {
			return $(this).index('.jscRsvDefaultOpen') === index;
		});
		return targets;
	},
	getClsRsvFrame: function(triggerClass) {
		// 30�?��の可能数と紐付く予�?��セルの取�?
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
