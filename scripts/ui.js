document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('credits-link').addEventListener('click', function() {
    document.getElementById('credits').style.display = 'block';
  });
  document.getElementById('credits-close').addEventListener('click', function() {
    document.getElementById('credits').style.display = 'none';
  });
})
