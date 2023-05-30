const sidebar = document.getElementById('sidebar');
const dashboardButton = document.querySelector('.dashboard');

dashboardButton.addEventListener('click', (e) => {
    e.preventDefault();
    const dashboard = sidebar.querySelector('.container');
    const dashboardItems = dashboard.children;
    let delay = 0;
    for(i = 1; i < dashboardItems.length; i++) {
        if(dashboardItems[i].style.display === 'block') {
            dashboardItems[i].style.display = 'none';
            dashboardItems[i].classList.remove('animate');
        } else {
            dashboardItems[i].style.animationDelay = `${delay+=50}ms`;
            dashboardItems[i].classList.add('animate');
            dashboardItems[i].style.display = 'block';
        }
    }
});