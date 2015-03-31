
jQuery.ajax = (function(_ajax){
  var protocol = location.protocol,
    hostname = location.hostname,
    exRegex = RegExp(protocol + '//' + hostname),
    YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
    query = 'select * from json where url="{URL}"';
  
  function isExternal(url) {
    return !exRegex.test(url) && /:\/\//.test(url);
  }
  
  return function(o) {
    var url = o.url;
    
    if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
      // Manipulate options so that JSONP-x request is made to YQL
      o.url = YQL;
      o.dataType = 'json';

      o.data = {
          q: query.replace(
              '{URL}',
              url + (o.data ?
                  (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
              : '')
          ),
          format: 'json'
      };
      
      // Since it's a JSONP request
      // complete === success
      if (!o.success && o.complete) {
          o.success = o.complete;
          delete o.complete;
      }
      
      o.success = (function(_success){
        return function(data) {
          if (_success) {
            _success.call(this, data.query.results.json, 'success');
          }
        };
      })(o.success);
    }
    return _ajax.apply(this, arguments); 
  };
})(jQuery.ajax);