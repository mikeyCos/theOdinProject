const sidebar = document.getElementById('sidebar');
const dashboard = sidebar.querySelector('.dashboard-menu');

dashboard.addEventListener('click', (e) => {
    const dashboardItems = sidebar.querySelector('.container');
    e.preventDefault();
    if (dashboardItems.style.display === 'block') {
        dashboardItems.style.display = 'none';
    } else {
        dashboardItems.style.display = 'block';
    }
});
