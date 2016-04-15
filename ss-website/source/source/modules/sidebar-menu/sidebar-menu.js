$(document).on('click', '.sidebar-menu__link', function () {
	if ($(this).next('.sidebar-menu__submenu').length > 0) {
		if ($(this).parent().hasClass('sidebar-menu__item_active')) {
			$(this).parent().removeClass('sidebar-menu__item_active');
			$(this).next('.sidebar-menu__submenu').stop().slideUp(300);
		} else {
			$('.sidebar-menu__item_active .sidebar-menu__submenu').parent().removeClass('sidebar-menu__item_active')
			$('.sidebar-menu__submenu').stop().slideUp(300);
			$(this).parent().addClass('sidebar-menu__item_active');
			$(this).next('.sidebar-menu__submenu').stop().slideDown(300);
		}
		return false;
	}
});

