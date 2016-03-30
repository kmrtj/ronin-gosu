## Connecting to a database ##

Connecting RoninDB to a database is easy: simply place a text file with the extension ".dbc" somewhere in your Gosu classpath. The contents of the file should be a single JDBC URL. For example, if you have an H2 database called "test.db", the contents of your .dbc file should be

```
jdbc:h2:test.db;USER=sa;PASSWORD=
```

(Modify the username and password as appropriate.) Note that relative URLs are resolved relative to where you launch Gosu from, not relative to the .dbc file itself.

That's it! If your schema is set up directly, you can access the types in your database. The package in which those types live is determined by the location of the .dbc file in your classpath, plus the name of the .dbc file. So if your file is named "test.dbc", and it's in a folder called "db", the types will be in a package called `db.test`.

Note: if you're using either H2 or MySQL, RoninDB will automatically initialize the JDBC connector for you. If you're using any other database, though, you'll need to do so yourself. Consult the documentation on your database's JDBC connector for more information.

Next, we'll learn how to [add, update, and delete entities](AddingUpdatingAndDeleting.md).