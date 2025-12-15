(function($) {
    'use strict';
    
    $(document).ready(function() {
        const $container = $('.fatefinder-chart-container');
        if ($container.length === 0) return;
        
        const $form = $('#fatefinder-chart-form');
        const $submitBtn = $('#fatefinder-calculate-btn');
        const $loading = $('#fatefinder-chart-loading');
        const $result = $('#fatefinder-chart-result');
        const $error = $('#fatefinder-chart-error');
        
        let isProcessing = false;
        
        // Form submission handler
        $form.on('submit', function(e) {
            e.preventDefault();
            
            if (isProcessing) return;
            
            // Hide previous results/errors
            $result.hide();
            $error.hide();
            $loading.show();
            $submitBtn.addClass('active').prop('disabled', true);
            isProcessing = true;
            
            // Get form data
            const birthDate = $('#birth-date').val();
            const birthTime = $('#birth-time').val();
            const birthLocation = $('#birth-location').val().trim();
            
            if (!birthDate || !birthTime || !birthLocation) {
                showError('Please fill in all required fields.');
                return;
            }
            
            // Step 1: Geocode location
            geocodeLocation(birthLocation)
                .then(function(coords) {
                    // Step 2: Calculate chart
                    return calculateChart(birthDate, birthTime, coords.lat, coords.lon);
                })
                .then(function(response) {
                    if (response.success) {
                        displayResult(response.data);
                    } else {
                        showError(response.data.message || 'An error occurred. Please try again.');
                    }
                })
                .catch(function(error) {
                    showError(error.message || 'An error occurred. Please try again.');
                })
                .finally(function() {
                    $loading.hide();
                    $submitBtn.removeClass('active').prop('disabled', false);
                    isProcessing = false;
                });
        });
        
        /**
         * Geocode location using Nominatim API
         */
        function geocodeLocation(location) {
            return $.ajax({
                url: fatefinderChart.ajaxurl,
                type: 'POST',
                data: {
                    action: 'fatefinder_geocode',
                    nonce: fatefinderChart.nonce,
                    location: location
                }
            }).then(function(response) {
                if (response.success) {
                    return {
                        lat: response.data.lat,
                        lon: response.data.lon
                    };
                } else {
                    throw new Error(response.data.message || 'Failed to geocode location');
                }
            });
        }
        
        /**
         * Calculate chart
         */
        function calculateChart(birthDate, birthTime, lat, lon) {
            return $.ajax({
                url: fatefinderChart.ajaxurl,
                type: 'POST',
                data: {
                    action: 'fatefinder_calculate_chart',
                    nonce: fatefinderChart.nonce,
                    birth_date: birthDate,
                    birth_time: birthTime,
                    lat: lat,
                    lon: lon
                }
            });
        }
        
        /**
         * Display results
         */
        function displayResult(data) {
            const bigThree = data.big_three;
            
            // Display Big Three
            $('#result-sun').text(bigThree.sun);
            $('#result-moon').text(bigThree.moon);
            $('#result-ascendant').text(bigThree.ascendant);
            
            // Display AI Snapshot
            const $aiSnapshot = $('#fatefinder-ai-snapshot');
            if (data.ai_snapshot) {
                $aiSnapshot.html('<p>' + data.ai_snapshot + '</p>');
            } else {
                $aiSnapshot.html('<p class="fatefinder-error-text">AI snapshot unavailable, but your chart is ready!</p>');
            }
            
            // Set CTA link (you can customize this URL)
            const ctaUrl = '/fate-dialogue-ai'; // Change this to your actual CTA URL
            $('#fatefinder-cta-link').attr('href', ctaUrl);
            
            // Show result with animation
            $result.fadeIn(500);
            
            // Scroll to result
            $('html, body').animate({
                scrollTop: $result.offset().top - 100
            }, 800);
        }
        
        /**
         * Show error message
         */
        function showError(message) {
            $error.text(message).fadeIn(300);
            
            // Auto-hide after 5 seconds
            setTimeout(function() {
                $error.fadeOut(300);
            }, 5000);
        }
    });
})(jQuery);

