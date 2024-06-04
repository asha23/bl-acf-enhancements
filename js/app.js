(function ($) {
	// Function to update field names
	function updateFieldNames($element, rowIndex) {
		$element.find('[name^="acf[field_"]').each(function () {
			var fieldName = $(this).attr('name').replace(/\[(\d+)\]/g, '[' + rowIndex + ']');
			$(this).attr('name', fieldName);
		});
	}

	// Function to apply styles to links inside .acf-fc-popup
	function applyStylesToLinks() {
		console.log('Checking for links in .acf-fc-popup');
		$('.acf-fc-popup a').each(function () {
			console.log('Found links');
			if ($(this).find('span').text().indexOf('NEW!') !== -1) {
				console.log('Applying styles');
				$(this).css({
					'background': 'red',
					'color': 'white'
				});
			}
		});
	}

	acf.add_action('ready', function ($el) {
		// Make flexible content sortable
		$(".acf-flexible-content .values").sortable({
			connectWith: ".acf-flexible-content .values",
			start: function (event, ui) {
				acf.do_action('sortstart', ui.item, ui.placeholder);
			},
			stop: function (event, ui) {
				acf.do_action('sortstop', ui.item, ui.placeholder);
				$(this).find('.mce-tinymce').each(function () {
					tinyMCE.execCommand('mceRemoveControl', true, $(this).attr('id'));
					tinyMCE.execCommand('mceAddControl', true, $(this).attr('id'));
				});
			}
		});

		// Make nested flexible content sortable
		$(".acf-repeater .acf-flexible-content").sortable({
			connectWith: ".acf-repeater .acf-flexible-content",
			start: function (event, ui) {
				acf.do_action('sortstart', ui.item, ui.placeholder);
			},
			stop: function (event, ui) {
				acf.do_action('sortstop', ui.item, ui.placeholder);
			}
		});
	});

	acf.add_action('sortstop', function ($el) {
		var $repeater = $el.closest('.acf-repeater');

		if ($repeater.length) {
			var $row = $el.closest('.acf-row');
			var rowIndex = $row.index();

			// Update field names for the dropped element
			updateFieldNames($el, rowIndex);

			// Update field names for all flexible content fields within the repeater
			$repeater.find('.acf-flexible-content').each(function () {
				updateFieldNames($(this), rowIndex);
			});
		}
	});

	// Trigger style application when the popup is shown
	$(document).on('popupShown', function () {
		console.log('Popup shown');
		applyStylesToLinks();
	});

	// Click event handler for .acf-button
	$('body').on('click', '.acf-button[data-name="add-layout"]', function () {
		console.log('Button clicked');
		// Trigger custom event when button is clicked
		$(document).trigger('popupShown');
	});
})(jQuery);
