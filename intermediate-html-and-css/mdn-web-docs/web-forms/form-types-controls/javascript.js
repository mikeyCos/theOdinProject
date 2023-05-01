const invites = document.querySelector('#max-invite');
const output = document.querySelector('.invite-output');

output.textContent = invites.value;

invites.addEventListener('input', () => {
    output.textContent = invites.value;
});