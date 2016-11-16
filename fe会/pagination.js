var PAGINATION_MANAGER = {

	init: function() {
		this.setParameters();
		this.setPaginations();
	},
	setParameters: function() {
		this.paginations = [];
	},
	setPaginations: function() {
		var _self = this;
		$('.jsc-pagination').each(function() {
			_self.paginations.push(
				new PAGINATION(this, _self)
			);
		});
	},
	setNext: function() {
		for (var i = 0, l = this.paginations.length; i < l; i++) {
			this.paginations[i].toNext();
		}
	},
	setPrev: function() {
		for (var i = 0, l = this.paginations.length; i < l; i++) {
			this.paginations[i].toPrev();
		}
	},
	setMove: function(thisIndex) {
		for (var i = 0, l = this.paginations.length; i < l; i++) {
			this.paginations[i].toMove(thisIndex);
		}
	}
};

var PAGINATION = function(target, controller) {
	this.controller = controller;
	this.$target = $(target);
	this.init();
};
PAGINATION.prototype = {

	init: function() {
		this.setParameters();
		this.bindEvent();
	},
	setParameters: function() {
		this.$prev = this.$target.find('.jsc-previous');
		this.$next = this.$target.find('.jsc-next');
		this.liMax = this.$target.find('li').not('.jsc-previous, .jsc-next').length;
	},
	bindEvent: function() {
		this.$prev.on('click', $.proxy(this.controller.setPrev, this.controller));
		this.$next.on('click', $.proxy(this.controller.setNext, this.controller));
		var self = this;
		this.$target.find('li').not('.jsc-previous, .jsc-next').on('click', function(e) {
			e.preventDefault();
			self.controller.setMove($(this).index());
		});
	},
	toPrev: function() {
		var $active = this.$target.find('.active');
		this.$prev.addClass('disabled');
		if ($active.index() === 1) {
			return;
		} else {
			$active.removeClass('active');
			this.$target.find('li').eq($active.index() - 1).addClass('active');
			this.$next.removeClass('disabled');
			if (($active.index() - 1) !== 1) {
				this.$prev.removeClass('disabled');
			}
		}
	},
	toNext: function() {
		var $active = this.$target.find('.active');
		this.$next.addClass('disabled');
		if ($active.index() === this.liMax) {
			return;
		} else {
			$active.removeClass('active');
			this.$target.find('li').eq($active.index() + 1).addClass('active');
			this.$prev.removeClass('disabled');
			if (($active.index() + 1) !== this.liMax) {
				this.$next.removeClass('disabled');
			}
		}
	},
	toMove: function (thisIndex) {
		var $active = this.$target.find('.active');
		$active.removeClass('active');
		this.$prev.addClass('disabled');
		this.$next.addClass('disabled');
		this.$target.find('li').eq(thisIndex).addClass('active');

		if (thisIndex >= this.liMax) {
			this.$target.find('li').eq(this.liMax).addClass('active');
		}
		if (thisIndex !== 1) {
			this.$prev.removeClass('disabled');
		}
		if (thisIndex < this.liMax) {
			this.$next.removeClass('disabled');
		}
	}
};
PAGINATION_MANAGER.init();
