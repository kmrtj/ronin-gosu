## Why RoninDB? ##

Sometimes you just want a quick and dirty data persistence solution that's easy to use. You don't want to deal with XML configuration files, or code generation, but you don't want to have to memorize your database schema, either. RoninDB provides a low-effort, type-safe object-relational mapping layer on top of a SQL database (theoretically, any database that JDBC supports). Just set up your database schema following a few simple guidelines, and you automatically have object-oriented access to your data with compile-time error checking.

## Getting started ##

Here's what you need to get started with Ronin:

  * [Java](http://java.sun.com/javase/downloads/index.jsp) 6 or later.
  * [Gosu](http://www.gosu-lang.org/).
  * ronindb.jar - download [here](http://code.google.com/p/ronin-gosu/downloads/list).
  * A database, such as [H2](http://www.h2database.com/) or [MySQL](http://www.sun.com/software/products/mysql/).

Place ronindb.jar in the "ext" folder of your Gosu distribution.

Once you've got all that, you're ready to start using RoninDB.

First, let's look at the [database schema guidelines](SchemaGuidelines.md).