(function($) {
    'use strict';
    
    $(document).ready(function() {
        const $form = $('#fatefinder-name-fortune-form');
        const $loading = $('#fatefinder-name-fortune-loading');
        const $result = $('#fatefinder-name-fortune-result');
        const $button = $('#fatefinder-calculate-btn');
        const $nameInput = $('#name-input');
        
        let isProcessing = false;
        
        // Form submission handler
        $form.on('submit', function(e) {
            e.preventDefault();
            
            if (isProcessing) return;
            
            const name = $nameInput.val().trim();
            
            if (!name) {
                showError('Please enter a name.');
                return;
            }
            
            isProcessing = true;
            $button.prop('disabled', true);
            $form.hide();
            $result.hide();
            $loading.show();
            
            // Simulate calculation delay for better UX
            setTimeout(function() {
                try {
                    const result = calculateFortune(name);
                    displayResults(result);
                } catch (error) {
                    showError('An error occurred. Please try again.');
                    console.error('Name fortune calculation error:', error);
                } finally {
                    isProcessing = false;
                    $button.prop('disabled', false);
                    $loading.hide();
                }
            }, 800);
        });
        
        /**
         * Convert Chinese name to Pinyin
         */
        function convertToPinyin(name) {
            try {
                // Check if pinyinPro is available (different ways it might be exported)
                if (typeof pinyinPro !== 'undefined') {
                    // Try different possible API formats
                    if (typeof pinyinPro === 'function') {
                        return pinyinPro(name, { toneType: 'none' });
                    } else if (pinyinPro.pinyin && typeof pinyinPro.pinyin === 'function') {
                        return pinyinPro.pinyin(name, { toneType: 'none' });
                    } else if (pinyinPro.default && typeof pinyinPro.default === 'function') {
                        return pinyinPro.default(name, { toneType: 'none' });
                    }
                }
                // Fallback: return name as-is if pinyin library not loaded
                console.warn('Pinyin library not loaded, using name as-is');
                return name;
            } catch (error) {
                console.error('Pinyin conversion error:', error);
                return name;
            }
        }
        
        /**
         * Get ASCII sum of name
         */
        function getAsciiSum(name) {
            let sum = 0;
            for (let i = 0; i < name.length; i++) {
                sum += name.charCodeAt(i);
            }
            return sum;
        }
        
        /**
         * Get fortune message based on mod 81 result
         */
        function getFortuneMessage(mod81) {
            const fortunes = {
                1: "Great success and leadership potential. You have the ability to achieve remarkable things and inspire others.",
                4: "Unstable life, needs careful planning. Be cautious in your decisions and plan ahead for stability.",
                15: "Fortune and happiness, ideal for leaders. You are blessed with good fortune and natural leadership qualities.",
                23: "Brilliant talent, success comes with effort. Your natural abilities will shine when you apply yourself.",
                28: "Prone to difficulties, must work hard to avoid misfortune. Perseverance and determination are key to your success.",
                36: "Life is full of ups and downs, but great achievements are possible. Stay resilient through challenges.",
                47: "Wisdom and wealth, can achieve great things. Your intelligence and resources will lead to success.",
                64: "Prone to instability, must be careful in decisions. Think carefully before making important choices.",
                78: "Sudden changes, both success and failure come unexpectedly. Be prepared for life's surprises."
            };
            return fortunes[mod81] || "Neutral fortune, future depends on effort. Your destiny is in your hands.";
        }
        
        /**
         * Calculate fortune for a name
         */
        function calculateFortune(name) {
            // Check if name contains Chinese characters
            const hasChinese = /[\u4e00-\u9fa5]/.test(name);
            
            // Convert to pinyin if Chinese
            const englishName = hasChinese ? convertToPinyin(name) : name;
            
            // Calculate ASCII sums
            const asciiSumWithSpace = getAsciiSum(englishName);
            const asciiSumWithoutSpace = getAsciiSum(englishName.replace(/\s+/g, ''));
            
            // Calculate mod 81
            const mod81WithSpace = asciiSumWithSpace % 81;
            const mod81WithoutSpace = asciiSumWithoutSpace % 81;
            
            // Get fortune messages
            const fortuneWithSpace = getFortuneMessage(mod81WithSpace);
            const fortuneWithoutSpace = getFortuneMessage(mod81WithoutSpace);
            
            return {
                originalName: name,
                englishName: englishName,
                withSpace: {
                    asciiSum: asciiSumWithSpace,
                    mod81: mod81WithSpace,
                    fortune: fortuneWithSpace
                },
                withoutSpace: {
                    asciiSum: asciiSumWithoutSpace,
                    mod81: mod81WithoutSpace,
                    fortune: fortuneWithoutSpace
                }
            };
        }
        
        /**
         * Display results
         */
        function displayResults(data) {
            let html = '<div class="fatefinder-result-name">Results for: ' + escapeHtml(data.englishName) + '</div>';
            
            // With spaces section
            html += '<div class="fatefinder-result-section">';
            html += '<div class="fatefinder-result-section-title">✨ Calculation with Spaces</div>';
            html += '<div class="fatefinder-result-details">';
            html += '<strong>ASCII Sum:</strong> ' + data.withSpace.asciiSum + '<br>';
            html += '<strong>Mod 81:</strong> ' + data.withSpace.mod81;
            html += '</div>';
            html += '<div class="fatefinder-result-fortune">' + escapeHtml(data.withSpace.fortune) + '</div>';
            html += '</div>';
            
            // Divider
            html += '<div class="fatefinder-result-divider"></div>';
            
            // Without spaces section
            html += '<div class="fatefinder-result-section">';
            html += '<div class="fatefinder-result-section-title">✨ Calculation without Spaces</div>';
            html += '<div class="fatefinder-result-details">';
            html += '<strong>ASCII Sum:</strong> ' + data.withoutSpace.asciiSum + '<br>';
            html += '<strong>Mod 81:</strong> ' + data.withoutSpace.mod81;
            html += '</div>';
            html += '<div class="fatefinder-result-fortune">' + escapeHtml(data.withoutSpace.fortune) + '</div>';
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
    });
})(jQuery);

