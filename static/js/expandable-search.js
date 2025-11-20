// Expandable Search - Yandex-style search expansion
(function() {
    let isSearchExpanded = false;
    
    function expandSearch() {
        if (isSearchExpanded) return;
        
        console.log('🔍 Expanding search...');
        isSearchExpanded = true;
        
        // Hide filter buttons
        const filterButtons = document.querySelectorAll('.search-filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.add('search-expanded');
        });
        
        // Show close button
        const closeBtn = document.getElementById('search-close-btn');
        if (closeBtn) {
            closeBtn.classList.remove('hidden');
            closeBtn.classList.add('show');
        }
        
        // Focus search input
        const searchInput = document.getElementById('property-search-desktop');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    function closeExpandedSearch() {
        if (!isSearchExpanded) return;
        
        console.log('❌ Closing expanded search...');
        isSearchExpanded = false;
        
        // Show filter buttons
        const filterButtons = document.querySelectorAll('.search-filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('search-expanded');
        });
        
        // Hide close button
        const closeBtn = document.getElementById('search-close-btn');
        if (closeBtn) {
            closeBtn.classList.remove('show');
            setTimeout(() => {
                closeBtn.classList.add('hidden');
            }, 300);
        }
    }
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('property-search-desktop');
        if (!searchInput) return;
        
        // Expand on focus
        searchInput.addEventListener('focus', function(e) {
            expandSearch();
        });
        
        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!isSearchExpanded) return;
            
            const container = document.getElementById('search-input-container');
            if (container && !container.contains(e.target)) {
                closeExpandedSearch();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isSearchExpanded) {
                closeExpandedSearch();
                searchInput.blur();
            }
        });
        
        console.log('✅ Expandable search initialized');
    });
    
    // Make closeExpandedSearch available globally for onclick handler
    window.closeExpandedSearch = closeExpandedSearch;
})();
