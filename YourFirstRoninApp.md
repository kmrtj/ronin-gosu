## Your first Ronin app ##

Make sure you've [downloaded everything you need](Ronin#Getting_started.md). This tutorial assumes that you're using Jetty 7.x or later as your web server; see [Using Ronin with Tomcat](UsingRoninWithTomcat.md) for more information on using Tomcat.

Create a directory for your Ronin project. Copy the .jar files from the Gosu distribution, ronin.jar, jetty.jar, jetty-util.jar, and servlet-api.jar to that directory.  (The Ronin jar you downloaded was probably named `ronin.0.7.1.jar`; you should rename it to `ronin.jar`.) Use an unzip utility to extract ronin.gsp from ronin.jar, and place it in the same directory. Make sure that the "bin" directory of the Gosu distribution is on your system path, following the instructions on the Gosu site.

At this point, you should be able to start a Ronin server with the following command:

(Windows) `gosu ronin.gsp --port 8080`

(Linux/OS X) `gosu.sh ronin.gsp --port 8080`

You'll see a couple of lines of output indicating that the server has been started on the specified port. Of course, it's not a very interesting server, as you haven't written any code yet.

Throughout this documentation, we'll be assuming that your Ronin server is running on your local machine on port 8080.  URLs will thus be of the form "`http://localhost:8080/...`".

## Model/View/Controller ##

Ronin follows the model/view/controller architectural paradigm. An MVC application is broadly divided into three parts:

  * The **model** is the data which the application displays and manipulates.
  * The **view** specifies how the data (and other aspects of the user interface) is displayed.
  * The **controller** queries and manipulates the model, and routes user requests to the correct view.

Ronin is model-agnostic; you may use anything you like, whether it be RoninDB, another ORM system like Hibernate, or even direct SQL calls to a database.

## The controller ##

The controllers of a Ronin app are Gosu classes in the "controller" package. Let's create one now. Create a directory under your project directory called "controller". In the controller directory, create a file named "Main.gs" with the following contents:

```
package controller
uses ronin.*


class Main extends RoninController {
  static function hello() {
  }
}
```

This controller has a single static function called "hello". (Controller methods must always be static.) When Ronin receives a request for the URL "`http://localhost:8080/Main/hello`", it calls this function.

Often, a controller function will require additional parameters - for example, the controller function for displaying a blog post requires some identifier with which to retrieve the desired post. This is easily accomplished by adding arguments to your function's signature, just as with any other Gosu function:

```
static function hello(name : String) {
```

A function with this signature will expect a URL that looks like "`http://localhost:8080/Main/hello?name=Bob`". This URL would call the "hello" function, passing in "Bob" as the "name" argument.

See [Controller arguments](ControllerArgument.md) for more on how requests are routed to controller functions.

## The view ##

The views in a Ronin app are Gosu templates in the "view" package. Typically, a template will look like an HTML file with snippets of Gosu code scattered throughout - though there's no reason it has to be HTML; Gosu templates can produce XML, JSON, or even just plain text.

Create a directory under your project directory called "view", and a file in that directory called "Hello.gst" with the following contents:

```
<%@ extends ronin.RoninTemplate %>
<%@ params(name : String) %>
<html>
<body>
Hello ${name}!
</body>
</html>
```

Let's look at each of the components of this template. The first line declares the "superclass" of this template, which provides easy access to some convenient methods. See [Views](Views.md) for more information. The second line declares the parameters required by the template - in this case, a single String called "name". Following these lines is the text output by the template. On the fifth line, a Gosu expression is included by enclosing it with "${}". When the template is rendered, the "name" parameter will be inserted after "Hello".

Gosu control flow statements can also be included by enclosing them with "<% %>". For more information, consult the Gosu documentation.

## Tying it together ##

Now that you have a controller and a view, the final step is to tell the controller to render the view in response to a user request. Modify the "hello" function as follows:

```
static function hello(name : String) {
  view.Hello.render(writer, name)
}
```

As you can see, rendering the view is simply a matter of calling the template's render method. The first argument is "writer", which is a property inherited from RoninController containing the output stream for the current request. Following the first argument are the arguments declared in the template file - in this case, a single String.

Start the Ronin server following the instructions above (or restart it if you've already started it). Point a web browser at "`http://localhost:8080/Main/hello?name=Bob`". You should see

```
Hello Bob!
```

Congratulations! You've completed your first Ronin application.

Next we'll look at [other ways to configure your server](ServerConfiguration.md).