**The content of this page is preliminary.  The Ronin testing API can not be used without the Gosu testing API, which has not yet been released.**

## Testing Ronin apps ##

Ronin provides an easy way to write automated tests for your application, based on the Gosu testing API.  Consult the Gosu documentation for more detailed information about writing tests in Gosu.

When writing a test class for your Ronin application, subclass `RoninTest`.  It will set up a Ronin instance at the beginning of your test, and provide a set of methods for simulating user requests to your app.  There are two such methods for each HTTP request type (`get()`, `post()`, `put()`, and `delete()`). The first of each pair of methods takes a String representing the URL of the request (relative to the root of the application). The second takes the same String, plus a map representing the parameters to the request.

Here's what each of these methods looks like in practice:

```
get("/Main/index")
```
```
get("/Main/addComment", {"post" => 5, "text" => "hello"})
```

All of these methods return an [HttpServletResponseSimulator](http://strutstestcase.sourceforge.net/api/servletunit/HttpServletResponseSimulator.html), from which you can get the output buffer, status code, and other details about the response from your app.