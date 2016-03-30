## Server configuration ##

Configuration of a Ronin server is done via the `RoninServlet` object. When running Ronin on Jetty, this object is constructed in the ronin.gsp program file. (For information on running Ronin on Tomcat, see [Using Ronin with Tomcat](UsingRoninWithTomcat.md).)

The port on which your Ronin application runs is determined by a command-line argument to ronin.gsp. The default is port 80; to specify another port, pass it in as follows:

```
gosu.sh ronin.gsp --port 8080
```

Changing the port in Tomcat or another application server is done through the normal channels; consult your application server's documentation for more information.

The other command-line parameter to ronin.gsp is the -dev\_mode flag. When this flag is supplied, Ronin will force Gosu's type system to reload on every request. This is significantly slower, but in most cases will allow you to see changes to your application immediately without restarting.

Besides the port and dev mode flag, all other high-level configuration is done via the `RoninServlet` object, either by setting a property on the object or by subclassing it and overriding certain methods to provide the desired behavior. Either of these methods involves changing the following line in ronin.gsp:

```
root.addServlet(new ServletHolder(new RoninServlet(RoninArgs.DevMode)), "/*")
```

If you subclass `RoninServlet`, simply replace "`RoninServlet`" with your subclass (and adjust the constructor arguments if necessary). If you need to set a property, you can use Gosu's object initializer syntax, for example:

```
root.addServlet(new ServletHolder(new RoninServlet(RoninArgs.DevMode) {:DefaultAction="view"}), "/*")
```

Here are some of the most common configuration options on `RoninServlet`:

  * The **default action** is set via the `RoninServlet.DefaultAction` property, and defaults to "index". This is the name of the controller method that Ronin attempts to call if no method is specified in a URL - for instance, "`http://localhost:8080/Main`" will attempt to call `controller.Main.index()`. The default action can not take any parameters. If no such method exists on a controller, an error will be thrown as with any other malformed URL. Note that this property is a String, since it likely refers to multiple methods across controller classes, and therefore is not type-safe.
  * The **default controller** is set via the `RoninServlet.DefaultController` property, and defaults to `null`. The default controller is a controller class to which URLs which do not specify a controller - i.e. the URL of the application's root - are directed. For instance, if `DefaultController` is controller.Main, and assuming `DefaultAction` has the default value of "index", then "`http://localhost:8080`" will attempt to call `controller.Main.index()`. Unlike `DefaultAction`, this property is a type literal, so specifying an invalid controller class will cause a compile error.
  * **Error handling** is performed by two protected methods, `RoninServlet.handle404()` and `RoninServlet.handle500()`. `handle404()` is called when a URL attempts to access a controller or action which does not exist; `handle500()` is called when the parameters in the URL are malformed or do not match the action method's signature. (It's also called if your controller is somehow incorrectly configured, e.g. your action method is not declared "static".) The default implementation of each method simply logs the error and sets the response code to 404 or 500, respectively. You are encouraged to override these methods to provide more graceful error handling, either by rendering a friendly error message to the user or by redirecting the request appropriately.

Next, we'll learn more about [controllers](Controllers.md).