const sidebar = document.getElementById('sidebar');
const dashboardButton = document.querySelector('.dashboard');

dashboardButton.addEventListener('click', (e) => {
    e.preventDefault();
    const dashboard = sidebar.querySelector('.container');
    const dashboardItems = dashboard.children;
    for(i = 1; i < dashboardItems.length; i++) {
        console.log(dashboardItems[i]);
        if(dashboardItems[i].style.display === 'block') {
            dashboardItems[i].style.display = 'none';
        } else {
            dashboardItems[i].style.display = 'block';
        }
    }
});