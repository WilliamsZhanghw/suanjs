(function($) {
    'use strict';
    
    $(document).ready(function() {
        const $form = $('#fatefinder-chart-form');
        const $loading = $('#fatefinder-chart-loading');
        const $result = $('#fatefinder-chart-result');
        const $button = $('#fatefinder-calculate-btn');
        const $locationInput = $('#birth-location');
        
        let isProcessing = false;
        
        // Form submission handler
        $form.on('submit', function(e) {
            e.preventDefault();
            
            if (isProcessing) return;
            
            const birthDate = $('#birth-date').val();
            const birthTime = $('#birth-time').val();
            const birthLocation = $locationInput.val().trim();
            
            // Validate form
            if (!birthDate || !birthTime || !birthLocation) {
                showError('Please fill in all fields');
                return;
            }
            
            isProcessing = true;
            $button.prop('disabled', true);
            $form.hide();
            $result.hide();
            $loading.show();
            
            // First, geocode the location
            geocodeLocation(birthLocation)
                .then(function(coords) {
                    // Then calculate the chart
                    return calculateChart(birthDate, birthTime, coords.lat, coords.lon);
                })
                .then(function(data) {
                    displayResults(data);
                })
                .catch(function(error) {
                    showError(error.message || 'An error occurred. Please try again.');
                })
                .always(function() {
                    isProcessing = false;
                    $button.prop('disabled', false);
                    $loading.hide();
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
                    action: 'fatefinder_geocode_location',
                    nonce: fatefinderChart.nonce,
                    location: location
                }
            }).then(function(response) {
                if (response.success) {
                    return response.data;
                } else {
                    throw new Error(response.data.message || 'Failed to geocode location');
                }
            });
        }
        
        /**
         * Calculate chart via AJAX
         */
        function calculateChart(date, time, lat, lon) {
            return $.ajax({
                url: fatefinderChart.ajaxurl,
                type: 'POST',
                data: {
                    action: 'fatefinder_calculate_chart',
                    nonce: fatefinderChart.nonce,
                    birth_date: date,
                    birth_time: time,
                    lat: lat,
                    lon: lon
                }
            }).then(function(response) {
                if (response.success) {
                    return response.data;
                } else {
                    throw new Error(response.data.message || 'Failed to calculate chart');
                }
            });
        }
        
        /**
         * Display results
         */
        function displayResults(data) {
            const bigThree = data.big_three;
            const snapshot = data.snapshot;
            
            let html = '<div class="fatefinder-big-three-display">';
            
            // Display Big Three
            html += '<div class="fatefinder-sign-card">';
            html += '<div class="fatefinder-sign-label">Sun Sign</div>';
            html += '<div class="fatefinder-sign-name">' + escapeHtml(bigThree.sun_sign) + '</div>';
            html += '</div>';
            
            html += '<div class="fatefinder-sign-card">';
            html += '<div class="fatefinder-sign-label">Moon Sign</div>';
            html += '<div class="fatefinder-sign-name">' + escapeHtml(bigThree.moon_sign) + '</div>';
            html += '</div>';
            
            html += '<div class="fatefinder-sign-card">';
            html += '<div class="fatefinder-sign-label">Ascendant</div>';
            html += '<div class="fatefinder-sign-name">' + escapeHtml(bigThree.ascendant_sign) + '</div>';
            html += '</div>';
            
            html += '</div>';
            
            // Display AI Snapshot
            if (snapshot && !data.ai_error) {
                html += '<div class="fatefinder-ai-snapshot">';
                html += '<div class="fatefinder-ai-snapshot-title">✨ Your Big Three Snapshot</div>';
                html += '<div class="fatefinder-ai-snapshot-text">' + escapeHtml(snapshot) + '</div>';
                html += '</div>';
            }
            
            // CTA Button
            html += '<a href="#" class="fatefinder-cta-button" onclick="event.preventDefault(); alert(\'This will link to your full chart service\');">';
            html += 'Unlock Your Full Destiny Blueprint (10 Planets & Aspects) via Fate Dialogue AI';
            html += '</a>';
            
            $result.html(html);
            $result.show();
            $form.show();
            
            // Scroll to results
            $('html, body').animate({
                scrollTop: $result.offset().top - 100
            }, 500);
        }
        
        /**
         * Show error message
         */
        function showError(message) {
            $result.html('<div class="fatefinder-error">' + escapeHtml(message) + '</div>');
            $result.show();
            $form.show();
        }
        
        /**
         * Escape HTML to prevent XSS
         */
        function escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }
    });
})(jQuery);

