## Resources ##

The default server configuration in ronin.gsp tells Jetty to serve the files in a directory called "public" directly, without going through Ronin. This is where you should put image files, CSS files, etc.

## Headers/footers ##

A web application will often have a static header and footer surrounding a chunk of generated content. This pattern is easy to implement in Ronin using blocks.

Define a template for your header/footer - let's call it `Layout.gst`:

```
<%@ extends ronin.RoninTemplate %>
<%@ params(content()) %>
<html>
[header content goes here]
<% content() %>
[footer content goes here]
```

Then, in your controller method, render the `Layout` template, passing in a block which renders your dynamic content:

```
view.Layout.render(Writer, \ -> view.MyView.render(Writer, args))
```

`Layout` will render the header, then invoke your block, rendering the dynamic content, then render the footer.

## AJAX ##

Using AJAX with Ronin is quite straightforward - an AJAX request to a Ronin URL is handled like any other request. Ronin view templates can render XML or JSON instead of HTML, so they can be used for responding to AJAX calls.

If you're using AJAX to dynamically refresh some subsection of a page, here's an elegant way of doing so. Define a controller method which is responsible for rendering the section of the page you'd like to refresh. From the view template for the main page, insert a Gosu snippet which calls that method in the place where that section goes, and it will render the initial contents of the section. Point the AJAX call for the refresh at the URL for the method, and you'll get back the new HTML for the section.