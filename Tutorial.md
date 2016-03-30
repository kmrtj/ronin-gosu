## Creating a web application with Gosu and Ronin ##

This tutorial will walk you through the process of building a simple blogging app using the Gosu programming language and the Ronin web framework.  It's meant to introduce you to both the language and the framework, so no familiarity with either is required; however, I'll assume that you understand the basic concepts of web applications and object-oriented programming, and in particular that you understand HTML and SQL.  I'll be drawing parallels specifically to Java, as Gosu runs on the JVM and was designed for an easy transition from Java; if you're more familiar with another language, hopefully you will be able to draw the appropriate parallels yourself.

## Getting set up ##

Download the [latest distribution of Gosu](http://gosu-lang.org/downloads.shtml).  There is plenty of useful information on the Gosu site, so feel free to explore and learn about the language at your own pace; this tutorial will only scratch the surface of what you can do with Gosu.  Unzip the file you downloaded to a directory, and make sure the "bin" directory is on your PATH.  (See e.g. [here](http://www.java.com/en/download/help/path.xml) for instructions on how to do so.)  If you are running OS X or Linux, open a command prompt or terminal, navigate to the "bin" directory within the Gosu distribution, and type

`chmod +x gosu.sh`

I encourage you to check out the [Eclipse plugin for Gosu](http://gosu-lang.org/eclipse.shtml), as many of the benefits of Gosu emerge when using Eclipse features such as auto-completion.  However, at the time of this writing, the Eclipse plugin does not yet support some of the advanced features we'll be relying on in this tutorial, so the remainder of this tutorial will assume that you will be editing files via a text editor and running Gosu from the command line.

If you'd like to get your feet wet with Gosu, just type `gosu.sh` (OS X/Linux) or `gosu.cmd` (Windows) at the command line.  An editor window will appear, where you can type and execute Gosu code.  Try typing

`print("Hello world")`

and clicking the "Run" button in the toolbar.

The next step is to download the Ronin framework.  It consists of two parts: Ronin itself, which handles your app's web interface, and RoninDB, which is a module for communicating with a database.  Download them both [here](http://code.google.com/p/ronin-gosu/downloads/list), then rename them to "ronin.jar" and "ronindb.jar" (removing the version numbers).  Create a directory for your application named "blog" and place ronin.jar in it.  RoninDB is a "typeloader", or plug-in, for the Gosu language, so copy it to the "ext" folder of your Gosu distribution.

You will need to download a few additional dependencies, placing the .jar files in the "blog" directory.  The first is [Jetty](http://www.eclipse.org/jetty/downloads.php), which will be your web server.  The second is [H2](http://www.h2database.com/html/download.html), which will be your database.

## Running a Ronin server ##

As one final piece of setup, use an unzip utility to extract the "ronin.gsp" file from ronin.jar to the "blog" directory.  Edit this file so that the first line reads

`classpath "."`

then run it by typing `gosu.sh ronin.gsp --port 8080`.  If you've installed everything correctly, you should see a few lines of output, then you will have a server running at `http://localhost:8080`.

## What's going on here? ##

Let's take a step back and look at what just happened.  A `.gsp` file is a Gosu program file.  It contains a series of statements written in Gosu which will be executed in order, like a shell script.  Unlike Java, you don't need a class with a `main()` method.

The first statement in a `.gsp` file is the `classpath` statement, which tells Gosu where to find the resources used by the program.  You told ronin.gsp to look in the directory from which it's run, since that's where you put the .jar files you downloaded.  (.jar files are simply zip files containing Java and/or Gosu resources.)

## Hello World, Ronin-style ##

So now you've got a server running, but it's not necessarily doing anything interesting.  In fact, if you try to access it from your browser, you'll get an error message, because your application doesn't have any code or content.

In Ronin, there are generally two components involved in responding to a user's request: a **controller** and a **view**.  The controller will perform any necessary actions, and then will delegate to a view, which will create the HTML (or other response) that is sent back to the user's browser.

Let's create the simplest possible controller and view.  A Ronin controller is defined via a Gosu **class**.  Classes in Gosu are very similar to classes in Java; they are defined in their own file, and the name of the file (plus the directory in which it lives) determines the name of the class.  Ronin has a special rule that controller classes must live in the "controller" package, so create a directory named "controller" in your application's "blog" directory (alongside the jars you downloaded earlier and ronin.gsp).  Since our goal is to create a blogging application, let's create a controller class which will eventually contain all of the code for viewing and manipulating blog posts.  Create a file called `PostController.gs` in the controller directory and give it the following contents:

```
package controller

uses ronin.RoninController

class PostController extends RoninController {

}
```

Let's take a moment to examine the anatomy of this class.  The `package` statement simply restates which package this class lives in.  The `uses` statement identifies a class in another package which we want to reference in this class; this is the equivalent of `import` in Java.  Finally, the `class` statement restates the name of the class, and identifies its superclass.

Note that unlike a Java `import` statement, the `uses` statement doesn't end in a semicolon.  Ending statements with a semicolon is not required in Gosu (though it is permitted).

When I tell you later on to add a `uses` statement to this class, add it after the existing `uses` statement and before the `class` statement.

It's not required that a controller class end in "Controller"; we do so here for the sake of clarity.

Now let's add a function to this class.  Each function on the controller class will be responsible for responding to requests from a single URL.  Add the following `uses` statement to your class:

```
uses view.ViewPost
```

and the following code in between the curly braces of the `class` statement:

```
static function viewPost() {
  ViewPost.render(Writer)
}
```

Gosu functions are defined using the `function` keyword.  They have public access by default, and are assumed to have a void return value unless specified otherwise.  `static` means the same thing as in Java - this method can be invoked without an instance of the class.  Ronin requires all controller methods to be static.

This is the simplest possible controller method - all it does is delegate to a view for rendering.  In this case, the view will be `view.ViewPost`, which we haven't defined yet.  We call the `render()` method on the view, and pass it the contents of the `Writer` property, which we've inherited from our superclass.  A **property** in Gosu encapsulates what would be "get" and "set" methods on a Java class; you can use its value or assign a value to it like you would any other variable.

Note that since `ViewPost` has not yet been defined, this class will not compile correctly if you try to run your application now.  Let's fix that by defining our view.  Most Ronin views will be defined as Gosu **templates**.  A template is a special kind of Gosu file (with the extension `.gst`) which mixes plain text with Gosu code to produce the desired output (somewhat like a JSP).  Ronin does not require that views live in the "view" package, but it's not a bad convention to adopt.  Create a "view" directory underneath the "blog" directory, and create a file in there named `ViewPost.gst` with the following contents:

```
<%@ extends ronin.RoninTemplate %>
<html>
  <body>
    This is a post.
  </body>
</html>
```

The first line of this template is a **template directive**, as it is surrounded by `<%@` and `%>`.  The `extends` directive defines a "superclass" for this template; this isn't a true superclass in terms of inheritance, but it allows the template to call static methods on the given class without qualifying them.  In this case, we're extending `RoninTemplate`, which contains some useful methods for Ronin templates.

The rest of the template is simply plain HTML which will be rendered to the user's browser.  Let's see this in action.  First, start the Ronin server as you did earlier.  The URL to access for the controller method you've defined will be `http://localhost:8080/PostController/viewPost` - that's the controller class name followed by the controller method name.  If you access this URL in your browser, you should see "This is a post" appear.

A little more detail on how templates work: Gosu reads in the `.gst` file and creates a **type** for it.  For all intents and purposes, this type works the same as a Gosu class.  A template type automatically has a static method called `render`, which is what we're calling from `viewPost()`.

## Using Gosu code in templates ##

Let's make this example slightly more interesting.  Modify `ViewPost.gst` as follows:


```
<%@ extends ronin.RoninTemplate %>
<% uses java.util.Date %>
<html>
  <body>
    The current time is ${new Date()}.
  </body>
</html>
```

There are two new types of template tags here.  The first is surrounded by `<%` and `%>`; note that there is no `@` like in the directive tags.  This type of tag contains Gosu code which is executed as soon as the template encounters it; here, we're using it to add a `uses` statement.  The tag will not be present in the output text.

The second is surrounded by `${` and `}`.  This type of tag contains Gosu code which evaluates to a value; that value is then inserted into the output text.

Restart the server and visit the same URL again.  This time, you should see the current date and time.  That's because the expression between `${` and `}` was evaluated as Gosu code, converted to a String, and inserted into the template.

## Parameters ##

Our application is still rather uninteresting in that it doesn't really accept any input from the user.  Let's address that by parameterizing our controller and view.

Modify the `viewPost` method as follows:

```
static function viewPost(post : String) {
  ViewPost.render(Writer, post)
}
```

and `ViewPost.gst` as follows:

```
<%@ extends ronin.RoninTemplate %>
<%@ params (post : String) %>
<html>
  <body>
    ${post}
  </body>
</html>
```

We've added a parameter to the `viewPost` method; its name is `post`, and its type is `String`.  (Note that unlike in Java, the name comes first and the type second.)  We've also added a similar parameter to the `ViewPost` template, using the `params` directive.  When Gosu sees this, it modifies the template type's `render` method to take an additional parameter - if we had added the directive but not modified `viewPost()` to pass in an additional argument, that method call would not have compiled.

When Ronin handles a URL which calls a method with one or more parameters, the values given to those parameters are derived from the arguments in the URL.  For instance:

`http://localhost:8080/PostController/viewPost?post=Hello+world`

will assign the string "Hello world" to the `post` parameter of `viewPost()`.  If you access the URL without a `post` parameter, as we did before, the value of the `post` parameter will be `null`.

In a web application, it's important to ensure that you never render user input directly to your HTML (as we have done above), since a user could insert malicious code into your page.  The `RoninTemplate` class provides a method  called `h()` to help with this.  Change the line that says `${post}` to `${h(post)}`, and the user's input will be properly escaped for inclusion in an HTML page.

## Layout and blocks ##

Before we go crazy adding controllers and views to our application, here's an observation: the `<html>` and `<body>` tags aren't likely to change too much between views.  It would be nice if there was an easy way to extract the content that's common to all views to a single place, so that it's easier to change and maintain.

Fortunately, there is.  Create a file in your view directory called `Layout.gst` with the following contents:

```
<%@ extends ronin.RoninTemplate %>
<%@ params(content()) %>
<html>
  <head>
    <title>Blog</title>
  </head>
  <body>
    <div id="content"><% content() %></div>
  </body>
</html>
```

The parameter we've defined in this template looks a bit different from our previous template.  That's because it's a **block** (also known as a "closure", "first-class function", or "lambda").  The `content` parameter is itself a function, taking no parameters and returning nothing.  As you can see in the body of the template, a block can be invoked like any other function.  Here, we're invoking it in order to render the content of the page within the structure we've defined.  We can now remove the `<html>` and `<body>` tags from `ViewPost.gst`.

If you're a Java programmer, it may help to think of a block as being like an instance of `Runnable`, and invoking the block being like calling the `run()` method.  Unlike a `Runnable`, however, a block can take parameters and return a value, and it can access variables from the scope where it's declared.

Let's modify the `viewPost()` function to make use of our layout template.  Change the contents of the function to:

```
Layout.render(Writer, \ -> {
  ViewPost.render(Writer, post)
})
```

and add the following uses statement:

```
uses view.Layout
```

The second argument to `Layout.render()` is a block, which is initiated with the backslash character.  As the block takes no arguments, it's followed immediately by an arrow (`->`), then the contents of the block surrounded by curly brackets.  When this block is invoked, the `ViewPost` template will be rendered.

## Database interaction ##

A blogging application needs a way to store and retrieve data - specifically, posts and comments.  Ronin allows you to use any mechanism you like for this purpose, but it is particularly well-suited for use with RoninDB, a data persistence layer that takes advantage of some powerful features of Gosu to make simple database operations very convenient.

RoninDB plugs in to Gosu's type system to generate types based on a pre-defined database schema; unlike with many other similar frameworks, you don't explicitly define classes for the entities stored in your database.  Before you can start using RoninDB in your Gosu code, then, you need to define your database schema.

When you installed H2, it included a command-line script (`h2.bat` on Windows or `h2.sh` on OS X/Linux) that launches a browser-based database console.  Use this console to create a database called `blog`.  (Consult the H2 documentation if you need help doing this.)  Paste the following SQL in to the console to create the database schema:

```
CREATE TABLE "Post"(
    "id" BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "Title" TEXT,
    "Body" TEXT,
    "Posted" TIMESTAMP
);
CREATE TABLE "Comment"(
    "id" BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    "Post_id" BIGINT,
    "Name" VARCHAR(255),
    "Text" TEXT,
    "Posted" TIMESTAMP
);
```

Each entity (`Post` and `Comment`) is represented by a table in the database.  Each table has one primary key column named "`id`", and some number of other columns containing information about the entity.  A `Comment` has a foreign key to the `Post` on which it was made, as denoted by the column named "`Post_id`".

Disconnect from the database, and make sure the files H2 created for it are in the "blog" directory.

The next step is to make Gosu aware of your database.   RoninDB tells Gosu to look for files with the extension `.dbc` in its classpath, which contain information about how to connect to a database.  Create a directory called `db` underneath the "blog" directory, and a file in there called `blog.dbc` with the following contents:

`jdbc:h2:blog.db;USER=sa;PASSWORD=`

If you're familiar with JDBC, this is a standard JDBC URL for your database.  (If you changed the username or password when creating your database, make sure to change them here too.)  Based on the directory and file name of this file, Gosu will create a package named `db.blog`, and place all of the types it generates from your database tables in there.  For this schema, it will generate the types `db.blog.Post` and `db.blog.Comment`.

## Creating entities ##

Our database isn't very interesting without any data in it, so let's create a page where the user can enter a new post.  Add this `uses` statement to `PostController`:

```
uses db.blog.Post
```

and these methods:

```
static function new() {
  Layout.render(Writer, \ -> {
    EditPost.render(Writer, new Post())
  })
}

static function save(post : Post) {
  // we will fill this in later.
}
```

The `new()` method will render a template named `EditPost` (as we will be using the same template for creating a new post and editing an existing post), passing in a new instance of `Post`.  Note that we never defined a Gosu class called `db.blog.Post`; that type is generated for us by RoninDB because it is a table in the database.  When we create a new instance here, we are not yet performing any database operations - we're simply creating an object in memory which can be read from or persisted to the `Post` table.

Create the `EditPost.gst` template in the `view` directory with the following contents:

```
<%@ extends ronin.RoninTemplate %>
<%@ params(post : db.blog.Post) %>
<% uses controller.PostController %>
<% uses db.blog.Post %>

<form method="post" action="${postUrlFor(PostController.Type.TypeInfo.getMethod("save", {Post}))}">
  <% if(not post._New) { %>
      <input type="hidden" name="post" value="${post.id}">
  <% } %>
  <input type="text" name="post.Title" value="${h(post.Title)}"><br>
  <textarea name="post.Body" rows=20 columns=80>${h(post.Body)}</textarea><br>
  <input type="submit">
</form>
```

Let's walk through this template.  The first two lines should appear familiar to you.  Note that the type of the parameter is our entity type, since that's what we're passing in from the controller.

The `action` attribute of the `form` tag is being set to the string returned by `postUrlFor()`, which is a method we've inherited from `RoninTemplate`.  The argument to `postUrlFor()` is an `IMethodInfo`, an object which stores information about a Gosu method (like `java.lang.reflect.Method`).  Let's look more closely at the expression we're passing in to this method:

`PostController.Type.TypeInfo.getMethod("save", {Post})`

`PostController` is our controller class.  Unlike Java, there's no need to append "`.class`"; the type name itself is an object representing the type.  We access the `Type` property, which gives us access to metadata about the type, and from there the `TypeInfo` property, which has methods for accessing the methods and properties defined on our type.  We call the type info's `getMethod` method, which takes two arguments: a String matching the desired method's name, and a List of types matching its argument types.  Gosu allows us to create a new List object by placing the members of the List in curly brackets.  (Note the capital "P" - "`Post`" here is the type `db.blog.Post`, not the `post` object that was passed in to the template.)

`postUrlFor` will return the URL to which our form should be posted in order to invoke the method it's given.  In this case, that will be `http://localhost:8080/PostController/save`.

After the form tag, we have an `if` statement.  If the post passed in to this template is not a new post, we want to store its ID in a hidden input, so that we know which post to edit when the form is posted to the server.  We determine whether the post is new by accessing the `_New` property, which is created automatically on all RoninDB entity types, and returns true as long as the entity has not yet been saved to the database.

Since we know our post will be a new post for now, let's skip ahead.  After we've closed the `if` statement, we have a text field for the post's title.  The value of the text field is set to the title of the existing post object, `post.Title` (after being escaped by the `h()` function).  The name of the field is also "post.Title".  Since the parameter expected by the `save()` method to which our form will be posted is named "post", the value of this field will be used to set the `Title` property of that parameter.  The text area on the next line performs the same task for the `Body` of the post.

Let's go over what will happen when we submit this form, say with the title "Hi" and the body text "Hello world".  The browser will access the URL `http://localhost:8080/PostController/save`, with the form data `post.Title=Hi&post.Body=Hello+world`.  Ronin will find the `save` function and see that it requires a `db.blog.Post` parameter; since we haven't told it a specific one to use, it will create a new one.  It will then examine the form data, and set the `Title` property of the post to "Hi" and the `Body` property to "Hello world".  This will all happen automatically, so most of the time you won't have to worry about it.

Now we'll go back and implement the `save()` method on `PostController`:

```
uses java.sql.Timestamp
uses java.lang.System
```

```
  static function save(post : Post) {
    if(post._New) {
      post.Posted = new Timestamp(System.currentTimeMillis())
    }
    post.update()
    redirect(\ -> viewPost(post))
  }
```

If the post is a new post (as it is in our case), we will set its `Posted` property to the current time.  (Note that the type of the `Posted` property is `java.sql.Timestamp`, since the `Posted` column in the database is a TIMESTAMP column.)  After we've done this, we save the post to the database by calling its `update()` method (which is created for us by RoninDB).  Finally, we redirect the user to a page where they can view the newly saved post.

This redirection bears further examination.

`redirect(\ -> viewPost(post))`

`redirect()` is a method we've inherited from `RoninController`.  It takes a single argument, which is a block with no parameters and no return value.  It's important to note that we're not actually executing what's in the block - we're not calling `viewPost()` just yet.  Instead, `redirect()` examines the block and determines what URL would invoke it, then sends the browser a response telling it to redirect to that URL.

(By sending a redirect to the browser, we're ensuring that if the user hits the back button, they are returned to the edit screen, instead of to the URL which saved the post - that would result in a duplicate post being saved to the database.  It's generally a good idea to redirect after any action that changes data.)

Let's quickly modify `viewPost()` to actually view a post:

```
static function viewPost(post : Post) {
    view.Layout.render(Writer, 
     \ -> view.ViewPost.render(Writer, post))
}
```

And the `ViewPost.gst` template:

```
<%@ extends ronin.RoninTemplate %>
<%@ params(post : db.blog.Post) %>

<div class="header">${h(post.Title)}</div>
<div class="body">${h(post.Body)}</div>
<div class="posted">Posted on ${post.Posted}</div>
```

All the pieces are in place.  Restart the server, go to `http://localhost:8080/PostController/new`, and create a new post.

## Editing entities ##

Now let's say we want to edit the post we've created.  As we noted above, we can reuse the same template.  Let's go back to the `if` block that we skipped before:

```
  <% if(not post._New) { %>
      <input type="hidden" name="post" value="${post.id}">
  <% } %>
```

If the template receives an existing post, it will create a hidden input on the form whose value is the post's unique ID (primary key).  Since the name of the field is "post", which is the name of the parameter to `save()`, when Ronin calls `save()`, it will use the ID to look up the existing post in the database.  The `Title` and `Body` properties of that post will then be set using the values of those inputs, just as they were before, and the `save()` method will update the entity in the database.

So how do we get an existing post into the `EditPost` template?  Create the following function in `PostController`:

```
static function edit(post : Post) {
  Layout.render(Writer, \ -> {
    EditPost.render(Writer, post)
  })
}
```

and add

```
uses view.EditPost
```

That's all there is to it.  When `http://localhost:8080/PostController/edit` is accessed, Ronin will use the URL parameters to look up the post and pass it in to the `edit()` method, which passes it in to the template.

## Links ##

Let's put it all together by creating a link on the "view post" page to edit the post you're viewing.  Add this snippet to the `ViewPost.gst` template, wherever you'd like:

```
  <a href="${urlFor(\ -> PostController.edit(post))}">Edit post</a>
```

and this `uses` statement at the top:

```
<% uses controller.PostController %>
```

The target of the link is generated by the `urlFor` method, which (like `redirect()`) takes a block which would call the controller method you want the link to call.  Let's see how this works.  Make a note of the URL you arrived at after creating your new post earlier (or just keep that browser tab open).  Restart the server, then go back to that URL (or reload the page).  You should see the new link appear.  If you look at where the link goes, it should be something like:

`http://localhost:8080/PostController/edit?post=1`

`urlFor` generated a URL which, when requested, will invoke the `controller.PostController.edit()` function, passing in the `Post` with the primary key `1`.

So why use `urlFor` at all?  Why not just enter that URL manually?

Say we decide to rename the `edit` function.  If we had entered the URL manually, we would not realize our link was broken until and unless we actually tried to follow it at runtime.  However, if we use `urlFor`, the block we pass in to it will no longer compile, so we will be informed of our error at compile time.  In fact, once the Gosu Eclipse plugin supports automated refactoring, we could rename the function and the block would be repaired for us automatically.

## Relationships between entities ##

Now let's take a look at the other table in our database - comments.  Ideally we want to show all of the comments for a post on the page where we view the post.  Add the following code to the bottom of `ViewPost.gst`:

```
<% for (comment in post.Comments) { %>
  <div class="comment">
  <div class="commentAuthor">${comment.Name} - ${comment.Posted}</div>
  <div class="commentBody">${comment.Text}</div>
<% } %>
```

This is a Gosu `for` loop, which is similar to a Java `for` loop, but with the `in` keyword in place of the `:` character.  The collection we're looping over - `post.Comments` - is of particular interest here.  You'll notice that it doesn't correspond to a column on the `Post` table in our schema above.  Instead, it represents the `Post_id` foreign key on the `Comment` table.  `post.Comments` will return all of the `Comment`s whose `Post_id` matches the `id` of the post.

## Querying the database ##

Let's add one final piece to our application - a page which lists all of the posts we've created, in reverse chronological order.

Add the following `uses` statement to `PostController`:

```
uses view.AllPosts
```

and the following function:

```
static function all() {
  var posts = Post.findSorted(null, Post.Type.TypeInfo.getProperty("Posted"), false)
  Layout.render(Writer, \ ->
    AllPosts.render(Writer, posts))
}
```

The first line of the function declares a local variable.  Note that unlike in Java, it is not necessary to specify the type of the variable - Gosu will infer the correct type from the value you assign to it.  Instead, you use the `var` keyword to declare the variable.

The `findSorted` method is one of several static methods present on all types generated by RoninDB.  It returns a sorted list of entities from the database.  The first parameter allows you to filter the entities returned; here we want all posts, so we pass in `null`.  The second parameter is the property by which we want to sort the entities.  We are passing in the `Post.Posted` property, so the posts will be sorted chronologically.  (Compare this method call to `getMethod()` above.)  The third property is `false` for a descending sort order (`true` would make it ascending).

We then pass the list of posts to a new template, `AllPosts.gst`.  Create this file and give it the following contents:

```
<%@ extends ronin.RoninTemplate %>
<%@ params(posts : List<db.blog.Post>) %>
<% uses controller.PostController %>

<div class="header">All Posts</div>

<% for(post in posts) { %>
  <div class="postListEntry">
    <a href="${urlFor(\-> PostController.viewPost(post))}">${post.Title}</a>
  </div>
<% } %>
```

By this point, everything here should be familiar.

## Next steps ##

In this tutorial, I've shown you the basics of working with Gosu and Ronin.  To learn more about Gosu, visit the [Gosu documentation](http://gosu-lang.org/doc/wwhelp/wwhimpl/js/html/wwhelp.htm).  Explore this wiki to learn more about [Ronin](Ronin.md) and [RoninDB](RoninDB.md).

Here are some further exercises for extending our blog application, from easiest to most challenging:

  * Change the layout template so that different pages have different `<title>` tags.
  * Implement the ability to add comments to a post.
  * Using the `delete()` method on RoninDB entities, implement the ability to delete a post or comment.
  * Implement a page which displays a snippet of each post, with a link to the full post and some text indicating how many comments have been left on the post.
  * Using the `findSortedPaged()` method, display posts 20 at a time on the `AllPosts` page.
  * Using the `findWithSql()` method, show "previous" and "next" links on the `ViewPost` page.
  * Using the `Session` property inherited from `RoninController`, implement a login system and require a user to be logged in to edit posts.
  * Refactor the comments display to a separate controller method and view, and use blocks to include it in the `ViewPost` page.  Use AJAX to refresh just the comments display when the user leaves a comment.

If you need some help with these exercises, or just want to see more examples of how to use Ronin, download and examine the full sample RoBlog application from [here](http://code.google.com/p/ronin-gosu/downloads/list).