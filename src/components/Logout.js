<!DOCTYPE html>
<html>
<body>

<h2>JavaScript Alert</h2>

<button onclick="logout()">Logout</button>

<script>
function logout() {
  alert("successfully logged out");
  location.href = "https://relaxed-wiles-c44e52.netlify.com/"
  this.setState({isLoggedin:false}))
</script>

</body>
</html>
