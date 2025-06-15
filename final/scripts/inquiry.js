document.addEventListener('DOMContentLoaded', function() {
    const timestampInput = document.getElementById('timestamp');
    const now = new Date();
    const formattedDateTime = now.toISOString();
    timestampInput.value = formattedDateTime;
});