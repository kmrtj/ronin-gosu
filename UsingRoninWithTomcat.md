## Using Ronin with Tomcat ##

To run Ronin on Tomcat (or probably any other servlet container supporting the web.xml descriptor), you need to use a `RoninServletWrapper`.  Edit your web.xml like so:

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
		  http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
           version="3.0">

  <servlet>
    <servlet-name>RoninServlet</servlet-name>
    <servlet-class>ronin.RoninServletWrapper</servlet-class>
    <init-param>
      <param-name>servletClass</param-name>
      <param-value>...</param-value>
    </init-param>
    <init-param>
      <param-name>defaultController</param-name>
      <param-value>...</param-value>
    </init-param>
    <init-param>
      <param-name>defaultAction</param-name>
      <param-value>...</param-value>
    </init-param>
  </servlet>
  <servlet-mapping>
    <servlet-name>RoninServlet</servlet-name>
    <url-pattern>/*</url-pattern>
  </servlet-mapping>
</web-app>
```

The `<url-pattern>` should be modified as necessary.  The `<init-param>` entries are optional - `servletClass` specifies a subclass of `RoninServlet` to use, and the other two are described [here](ServerConfiguration.md).

Make sure that ronin.jar and all of the jars from your Gosu distribution are in WEB-INF/lib, and that your Gosu classes and other resources are in WEB-INF/classes.