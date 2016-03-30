## Link targets ##

The `redirect()` method on a controller class and the `urlFor()` method on a view template both take a single argument, which is a block representing the target of the redirect or the URL.

Say you have the following method on `controller.Main`:

```
static function addComment(p : Post, text : String) {
...
}
```

and you want to create a link which will add a comment with the text "Hello" to a particular post. The following code will do exactly that:

```
var post = [code to retrieve the post goes here]
var url = urlFor( \ -> controller.Main.addComment(post, "Hello") )
```

The block passed in to `urlFor()` (or `redirect()`) is not actually invoked, so `addComment()` will not be called directly by this code. Instead, `urlFor()` returns "`http://localhost:8080/Main/addComment?p=5&text=Hello`" (assuming the post's ID is 5).

In order for entity types to work with these methods, they must define a method called `toID()` which takes no arguments and returns a unique identifier for the object on which it is called.  (This identifier, when passed to the type's `fromID()` method, should return the original object.)

For more general information on blocks, consult the Gosu documentation.

Next, we'll go over some [general tips and tricks](TipsAndTricks.md) for writing Ronin apps.