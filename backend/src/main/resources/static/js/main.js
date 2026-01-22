/**
 * Sures - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    initNavigation();

    // Alert 자동 숨김 (5초 후)
    initAutoHideAlerts();
});

/**
 * Initialize mobile navigation
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Toggle sidebar for admin layout
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

/**
 * Toggle navigation menu
 */
function toggleNav() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

/**
 * Alert 메시지 자동 숨김 (5초 후 fadeOut)
 */
function initAutoHideAlerts() {
    // 다양한 alert 선택자들
    const alertSelectors = [
        '.alert',
        '.alert-success',
        '.alert-error',
        '.alert-message',
        '[class*="alert"]'
    ];

    const alerts = document.querySelectorAll(alertSelectors.join(', '));

    alerts.forEach(function(alert) {
        // 이미 처리된 alert은 건너뛰기
        if (alert.dataset.autoHide === 'processed') return;
        alert.dataset.autoHide = 'processed';

        // 5초 후 fadeOut
        setTimeout(function() {
            alert.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-10px)';

            // 애니메이션 후 DOM에서 제거
            setTimeout(function() {
                alert.style.display = 'none';
            }, 500);
        }, 5000);
    });
}
