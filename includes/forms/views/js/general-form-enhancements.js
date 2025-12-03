function addEventListener(element,event,handler) {
	if(element.addEventListener) {
		element.addEventListener(event,handler, false);
	} else if(element.attachEvent){
		element.attachEvent('on'+event,handler);
	}
}

//*+ Enhance hide-after-success behavior for forms, independent of main API script
// This ensures the confirmation replaces the form in the same position when enabled.
(function(){
    if (!window.nl4wp || !window.nl4wp.forms || !window.nl4wp.forms.on) {
        return;
    }

    window.nl4wp.forms.on('success', function(form, data){
        try {
            var formEl = form && form.element ? form.element : null;
            if (!formEl) { return; }

            // If the element is no longer a FORM, it has already been replaced.
            if (formEl.tagName && formEl.tagName !== 'FORM') { return; }

            var hideAfterSuccess = (typeof data !== 'undefined' && typeof data.hide_after_success !== 'undefined')
                ? !!data.hide_after_success
                : (formEl.getAttribute('data-hide-after-success') === '1');

            if (!hideAfterSuccess) { return; }

            var message = (data && data.message) ? data.message : '';
            var successHtml = '<div class="nl4wp-alert nl4wp-success"><p>' + message + '</p></div>';

            var placeholder = document.createElement('div');
            placeholder.className = 'nl4wp-response';
            placeholder.innerHTML = successHtml;

            if (formEl.parentNode) {
                formEl.parentNode.replaceChild(placeholder, formEl);
            }

            // Update reference so subsequent operations target the message container
            form.element = placeholder;

        } catch (e) {
            if (window.console && console.error) { console.error(e); }
        }
    });
})();
