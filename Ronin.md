## Why Ronin? ##

Imagine you're developing a web application with a typical web framework. You've noticed a bug on some page of your app - how do you fix it? Maybe you'll look for some distinctive text on the page, then search for that text in your project using your favorite IDE. Say the text turns up a template which was used to generate the page. Now you have to track down the data that was used to render the template, which means you need to find the code that retrieved the data, and maybe an XML configuration file which specifies how that data was mapped to an identifier used in the template. If you're not intimately familiar with the inner workings of the app, and of the framework you're using, you've got a lot of searching to do.

With Ronin, everything is out in the open - there's no reflective magic or arcane XML files. The URL in your browser tells you which method on which class was called to generate the current page. That method contains a call to render the template for the page, and an explicit set of parameters providing the data for the template. If you're using Eclipse, you can navigate between all these different pieces with a single click. And best of all, should you make a mistake - misspell a file name, or leave out a parameter - there will be a compilation error, so you'll know right away instead of having to exhaustively walk through your app (or maintain 100% unit test coverage).

## Getting started ##

Here's what you need to get started with Ronin:

  * [Java](http://java.sun.com/javase/downloads/index.jsp) 6 or later.
  * [Gosu](http://www.gosu-lang.org/).
  * ronin.jar - download [here](http://code.google.com/p/ronin-gosu/downloads/list) and rename from `ronin.[version].jar` to `ronin.jar`.
  * A web server, such as [Jetty](http://jetty.codehaus.org/jetty/) or [Tomcat](http://tomcat.apache.org/).
  * [strutstest.jar](http://sourceforge.net/projects/strutstestcase/files/) and [commons-logging.jar](http://commons.apache.org/logging/download_logging.cgi) for writing tests.

Once you've got all that, you're ready to [write your first Ronin app](YourFirstRoninApp.md).