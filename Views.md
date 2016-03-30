A **view** in Ronin is typically just a Gosu template. (See the Gosu documentation for more information on templates.) Unlike controller classes, templates can be in any package.

For views which render HTML, you should not hard-code link URLs and form targets in the HTML. This could lead to broken links if you remove or rename a controller class or method, or change its parameters. Instead, use the `urlFor()` and `postUrlFor()` methods (see below).

It is recommended that the following directive be inserted at the top of each Ronin template:

```
<%@ extends ronin.RoninTemplate %>
```

This allows Gosu code in the template unqualified access to the following convenience methods:

  * `h()` takes a String, and returns a copy of that String escaped for HTML.
  * `g()` takes a String, and returns a copy of that String escaped for inclusion in a Gosu string literal.
  * `session`, `request`, and `response` are analogous to the same properties on a controller class.
  * `urlFor()` generates a URL, given a block which invokes the desired controller method. See [Link targets](LinkTargets.md) for more information.
  * `postUrlFor()` generates the base URL for a controller method, with no parameters included. Use this as the target of a form, since the parameters will be included in the request body. The argument to `postUrlFor()` is a Gosu method info object. In future releases of Gosu, you will be able to specify this as e.g. `controller.Main#view(Person)`; for now, you must say e.g. `controller.Main.Type.TypeInfo.getMethod("view", {Person})`.

Next, let's learn how to [generate links within an app](LinkTargets.md).