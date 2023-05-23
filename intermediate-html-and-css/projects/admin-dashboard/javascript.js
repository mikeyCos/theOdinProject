let sidebar = document.getElementById('sidebar');
let dashboard = sidebar.querySelector('.dashboard-menu');

dashboard.addEventListener('click', (e) => {
    let dashboardItems = sidebar.querySelector('.container');
    
    if (dashboardItems.style.display === 'block') {
        dashboardItems.style.display = 'none';
    } else {
        dashboardItems.style.display = 'block';
    }
});
