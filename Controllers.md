## Controllers ##

A **controller** in Ronin is simply a class in the "controller" package containing one or more static methods. There's nothing magic about these methods; they can do anything a normal method would do. They can even call each other to render subcomponents of a page.

Each **controller class** should correspond loosely to a broad division of your application, whether it be controller methods operating on a particular object in your data model, rendering the pages of a particular subsection of your site, etc. The name of the controller class will be the first part of the URL used to call a controller method in the class. For instance, the URL "`http://localhost:8080/Main/view`" will call the `view()` method on `controller.Main`.

A controller class must extend the `RoninController` base class. Doing so provides your controller class with access to the following properties and methods:

  * `Writer` is the output writer for the HTTP response. For a normal web request, this will be what is rendered to the user's browser. `writer` should be passed to any templates rendered by the controller.
  * `Method` is the HTTP method specified by the user's request. It is an instance of the `HttpMethod` enum, which contains the values GET, POST, PUT, and DELETE.
  * `Session` is a map containing data pertinent to the current user's session. The map's keys are Strings, and its values are untyped Objects, so you can put data in the session by saying e.g. `Session["userName"] = "admin"` and retrieve session data by saying e.g. `print(Session["userName"])`.
  * `Referrer` is the referring URL of the current request (i.e., the page from which the user clicked a link to generate the request) as a String.
  * `Response` is an object representing the HTTP response itself. This is an [HttpServletResponse](http://java.sun.com/products/servlet/2.2/javadoc/javax/servlet/http/HttpServletResponse.html) object, which can be used to set the status code or set headers or cookies.
  * `Request` is an object representing the user's HTTP request. This is an [HttpServletRequest](http://java.sun.com/products/servlet/2.2/javadoc/javax/servlet/http/HttpServletResponse.html) object, which can be used to access cookies, headers, and other detailed information about the request.
  * `redirect()` sends a redirect response to the user's browser; this is typically done after a POST action from an HTML form. The argument to `redirect()` is a block which invokes the desired controller method for the target of the redirect; see [Link targets](LinkTargets.md) for more information. Generally, you do not want to do anything further after a call to `redirect()`.
  * `bounce()` is a convenience method to redirect the user to the URL from whence they came. This can be helpful for responding to a failed login attempt, or a form with validation errors - add the relevant errors to the session, then bounce the user to the login prompt or form which can display those errors. `bounce()` is not always reliable, as the user may have navigated to the URL directly, in which case there is no referring URL to bounce them to, or they may have configured their browser not to send referrer information.

Controller methods must be public and static in order to be called by Ronin in response to a user request. Gosu methods are public by default, so you need only specify the "static" modifier. Any helper functions or functions containing common code called from multiple controller methods should be declared "private", "protected", or "internal", to avoid being accessible by a curious or malicious end user via a URL. (Obviously, they must be static as well, in order to be called from your static controller methods.)

While a controller method can contain any arbitrary code, in a typical web application they will tend to follow one of two patterns:

  * Code that retrieves data, potentially based on user input, and then calls a view template's `render()` method.
  * Code that manipulates data in response to an HTTP POST request, and then calls `redirect()`. Redirecting the user to a controller method of the first type will prevent the POST from happening a second time if the user hits the browser's back button.

That being said, again, Ronin does not prescribe any particular model - you are free to structure your controller methods in any way you see fit.

Now let's see how to [pass arguments to a controller method](ControllerArguments.md).