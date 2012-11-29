package org.askil.filter;

import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.users.UserServiceFactory;

import javax.servlet.*;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: roarkegaskill
 * Date: 11/28/12
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */
public class NamespaceFilter implements Filter {

    public void init(FilterConfig filterConfig) throws ServletException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        if (NamespaceManager.get() == null) {
            // Assuming there is a logged in user.
            String namespace = UserServiceFactory.getUserService().getCurrentUser().getUserId();
            NamespaceManager.set(namespace);
        }
        filterChain.doFilter(servletRequest,servletResponse);
    }

    public void destroy() {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
