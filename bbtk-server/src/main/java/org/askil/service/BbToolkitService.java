package org.askil.service;

import org.askil.service.domain.Player;
import org.askil.service.domain.Test;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

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

    @GET
    @Path("/player/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Player getPlayer(@PathParam("id") int id){
        //TODO
        return null;
    }

    @GET
    @Path("/player")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Player> getPlayers(){
        //TODO
        return null;
    }

    @POST
    @Path("/player/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Player updatePlayer(@PathParam("id") int id, Player player){
        //TODO
        return null;
    }

    @POST
    @Path("/player")
    @Produces(MediaType.APPLICATION_JSON)
    public Player addPlayer(Player player){
        //TODO
        return null;
    }

}
