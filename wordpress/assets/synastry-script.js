(function($) {
    'use strict';
    
    $(document).ready(function() {
        const $form = $('#fatefinder-synastry-form');
        const $loading = $('#fatefinder-synastry-loading');
        const $result = $('#fatefinder-synastry-result');
        const $button = $('#fatefinder-synastry-btn');
        
        let isProcessing = false;
        
        // Form submission handler
        $form.on('submit', function(e) {
            e.preventDefault();
            
            if (isProcessing) return;
            
            // Get Person A data
            const personADate = $('#person-a-date').val();
            const personATime = $('#person-a-time').val();
            const personALocation = $('#person-a-location').val().trim();
            
            // Get Person B data
            const personBDate = $('#person-b-date').val();
            const personBTime = $('#person-b-time').val();
            const personBLocation = $('#person-b-location').val().trim();
            
            // Validate form
            if (!personADate || !personATime || !personALocation || 
                !personBDate || !personBTime || !personBLocation) {
                showError('Please fill in all fields for both persons');
                return;
            }
            
            isProcessing = true;
            $button.prop('disabled', true);
            $form.hide();
            $result.hide();
            $loading.show();
            
            // Geocode both locations, then calculate
            Promise.all([
                geocodeLocation(personALocation),
                geocodeLocation(personBLocation)
            ])
            .then(function(results) {
                const personACoords = results[0];
                const personBCoords = results[1];
                
                return calculateSynastry(
                    personADate, personATime, personACoords.lat, personACoords.lon,
                    personBDate, personBTime, personBCoords.lat, personBCoords.lon
                );
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
                url: fatefinderSynastry.ajaxurl,
                type: 'POST',
                data: {
                    action: 'fatefinder_geocode_synastry',
                    nonce: fatefinderSynastry.nonce,
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
         * Calculate synastry via AJAX
         */
        function calculateSynastry(personADate, personATime, personALat, personALon,
                                   personBDate, personBTime, personBLat, personBLon) {
            return $.ajax({
                url: fatefinderSynastry.ajaxurl,
                type: 'POST',
                data: {
                    action: 'fatefinder_calculate_synastry',
                    nonce: fatefinderSynastry.nonce,
                    person_a_date: personADate,
                    person_a_time: personATime,
                    person_a_lat: personALat,
                    person_a_lon: personALon,
                    person_b_date: personBDate,
                    person_b_time: personBTime,
                    person_b_lat: personBLat,
                    person_b_lon: personBLon
                }
            }).then(function(response) {
                if (response.success) {
                    return response.data;
                } else {
                    throw new Error(response.data.message || 'Failed to calculate synastry');
                }
            });
        }
        
        /**
         * Display results
         */
        function displayResults(data) {
            const aspects = data.aspects || [];
            const analysis = data.analysis || '';
            
            let html = '';
            
            // Display aspects
            if (aspects.length > 0) {
                html += '<div class="fatefinder-aspects-display">';
                
                aspects.forEach(function(aspect) {
                    const isHarmonious = aspect.aspect === 'trine' || aspect.aspect === 'sextile';
                    const cardClass = isHarmonious ? 'harmonious' : 
                                    (aspect.aspect === 'square' || aspect.aspect === 'opposition') ? 'challenging' : '';
                    
                    html += '<div class="fatefinder-aspect-card ' + cardClass + '">';
                    html += '<div class="fatefinder-aspect-symbol">' + escapeHtml(aspect.symbol) + '</div>';
                    html += '<div class="fatefinder-aspect-description">' + escapeHtml(aspect.description) + '</div>';
                    html += '<div style="color: #FFFCCB; font-size: 12px; margin-top: 5px;">' + 
                           escapeHtml(aspect.planet_a) + ' ' + escapeHtml(ucfirst(aspect.aspect)) + ' ' + 
                           escapeHtml(aspect.planet_b) + '</div>';
                    html += '</div>';
                });
                
                html += '</div>';
            }
            
            // Display AI Analysis
            if (analysis && !data.ai_error) {
                html += '<div class="fatefinder-ai-analysis">';
                html += '<div class="fatefinder-ai-analysis-title">✨ Energy Interaction Analysis</div>';
                html += '<div class="fatefinder-ai-analysis-text">' + escapeHtml(analysis) + '</div>';
                html += '</div>';
            }
            
            // CTA Buttons
            const crystalUrl = fatefinderSynastry.crystalShopUrl || '#';
            const consultationUrl = fatefinderSynastry.consultationUrl || '#';
            
            html += '<div class="fatefinder-cta-buttons">';
            html += '<a href="' + escapeHtml(crystalUrl) + '" class="fatefinder-cta-button" target="_blank">';
            html += 'Purchase Energy Harmonizing Crystal';
            html += '</a>';
            html += '<a href="' + escapeHtml(consultationUrl) + '" class="fatefinder-cta-button" target="_blank">';
            html += 'Book Live Consultation for Conflict Resolution';
            html += '</a>';
            html += '</div>';
            
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
            return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
        }
        
        /**
         * Uppercase first letter
         */
        function ucfirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    });
})(jQuery);

