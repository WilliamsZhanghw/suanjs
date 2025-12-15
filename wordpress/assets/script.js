(function($) {
    'use strict';
    
    $(document).ready(function() {
        const $container = $('.fatefinder-daily-luck-container');
        if ($container.length === 0) return;
        
        const $button = $('#fatefinder-divination-btn');
        const $resultContainer = $('#fatefinder-result-container');
        const $resultText = $('#fatefinder-result-text');
        const $loading = $('#fatefinder-loading');
        
        let isProcessing = false;
        
        // Button click handler
        $button.on('click', function() {
            if (isProcessing) return;
            
            isProcessing = true;
            $button.addClass('active').prop('disabled', true);
            $resultContainer.hide();
            $loading.show();
            
            // Remove any existing error messages
            $container.find('.fatefinder-error').remove();
            
            // AJAX request
            $.ajax({
                url: fatefinderAjax.ajaxurl,
                type: 'POST',
                data: {
                    action: 'fatefinder_check_divination',
                    nonce: fatefinderAjax.nonce
                },
                success: function(response) {
                    $loading.hide();
                    
                    if (response.success) {
                        // Display result with animation
                        displayResult(response.data.result);
                    } else {
                        // Display error
                        displayError(response.data.message || 'An error occurred. Please try again.');
                    }
                },
                error: function(xhr, status, error) {
                    $loading.hide();
                    displayError('Network error. Please check your connection and try again.');
                },
                complete: function() {
                    isProcessing = false;
                    $button.removeClass('active').prop('disabled', false);
                }
            });
        });
        
        function displayResult(result) {
            $resultText.text('');
            $resultContainer.show();
            
            // Gradual text display animation
            let index = 0;
            const interval = setInterval(function() {
                if (index < result.length) {
                    $resultText.text(result.substring(0, index + 1));
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 50); // 50ms per character
        }
        
        function displayError(message) {
            const $error = $('<div class="fatefinder-error">' + message + '</div>');
            $container.append($error);
            
            // Auto-remove error after 5 seconds
            setTimeout(function() {
                $error.fadeOut(function() {
                    $(this).remove();
                });
            }, 5000);
        }
    });
})(jQuery);


