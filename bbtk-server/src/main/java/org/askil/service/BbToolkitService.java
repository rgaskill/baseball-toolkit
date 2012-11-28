package org.askil.service;

import org.askil.service.domain.Test;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created with IntelliJ IDEA.
 * User: roarkegaskill
 * Date: 11/28/12
 * Time: 8:49 AM
 * To change this template use File | Settings | File Templates.
 */
@Path("/service")
public class BbToolkitService {

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public Test test(){
        return new Test("Hello", "World");
    }

}
