<%@ extends ronin.RoninTemplate %><%@ params (x : java.util.Date[]) %><% for (elt in x) { %><%= elt.before(new java.util.Date("7/11/1980")) %> <% } %>