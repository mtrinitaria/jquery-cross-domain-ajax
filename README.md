# jQuery AJAX CORS plugins using YQL

Due to same-domain-policy, you won't be able to pull a JSON API from other networks like Facebook, Twitter, or any websites by just using Javascript + jQuery. I have heard YQL before, but haven't realised that this can be the another solution OR option for developers, like me which always using a backend script to able to get the JSON feeds.

There's not enough documentation about how to use YQL, or it's just me being lazy to look over the internet, I just figured how to utilize it to pull JSON from other networks.

# How to use

This is very simple, because it's using the same methods or functions that jQuery uses.

In this example any GET request made via $.ajax to another domain will work!

### HTML
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://code.jquery.com/jquery-2.1.3.min.js" type="text/javascript"></script> 
  <!-- Include the plugins -->
  <script src="cors-ajax.js" type="text/javascript"></script> 
  <style type="text/css">
code { background:#F8F8FF; border:1px solid #999; padding:6px; display:block; word-wrap:break-word; }​
  </style>
</head>

<body>
<p>Sample ajax-cors plugin</p>
<p>Loading <i>https://graph.facebook.com/facebookdevelopers</i></p>
<pre>
  <code id="myjson"></code>
</pre>
<script type="text/javascript">
$(document).ready(function() {
  // ajax
  $.ajax({
    url: 'https://graph.facebook.com/facebookdevelopers',
    type:'get',
    success: function(data) {
      document.getElementById('myjson').innerHTML = JSON.stringify(data, null, '\t');
    }
  });
});
</script>
</body>
</html>
```

Cheers!