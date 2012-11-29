package org.askil.service;

import com.google.appengine.api.datastore.*;
import org.askil.service.domain.Player;
import org.askil.service.domain.Test;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: roarkegaskill
 * Date: 11/28/12
 * Time: 8:49 AM
 * To change this template use File | Settings | File Templates.
 */
@Path("/service")
public class BbToolkitService {

    private static final Logger log = Logger.getLogger(BbToolkitService.class.getName());

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public Test test(){
        return new Test("Hello", "World");
    }

    @GET
    @Path("/player/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Player getPlayer(@PathParam("id") long id){
        Key key = KeyFactory.createKey("Player", id);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        try {
            Entity entity = datastore.get(key);
            return new Player(entity);
        } catch (Exception e){
            return null;
        }
    }

    @GET
    @Path("/player")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Player> getPlayers(){
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Query playerQuery = new Query("Player") ;

        List<Entity> results = datastore.prepare(playerQuery).asList(FetchOptions.Builder.withDefaults());

        ArrayList<Player> ret = new ArrayList<Player>();
        for(Entity e : results){
            Player player = new Player(e);
            ret.add(player);
        }

        return ret;
    }

    @POST
    @Path("/player")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN, MediaType.WILDCARD})
    @Produces(MediaType.APPLICATION_JSON)
    public Player addPlayer(Player player){
        return updateCreatePlayer(null, player);
    }



    @POST
    @Path("/player/{id}")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN, MediaType.WILDCARD})
    @Produces(MediaType.APPLICATION_JSON)
    public Player updatePlayer(@PathParam("id") long id, Player player){
        player.setId(id);
        return updateCreatePlayer(id, player);
    }

    private Player updateCreatePlayer(Long id, Player player) {
        DatastoreService dataStore = DatastoreServiceFactory.getDatastoreService();
        Transaction txn = dataStore.beginTransaction();
        try {
            Entity  playerEntity;
            if ( id != null ) {
                playerEntity = new Entity("Player", id);
            } else {
                playerEntity = new Entity("Player");
            }

            playerEntity.setProperty("name", player.getName());
            playerEntity.setProperty("number", player.getNumber());

            Key playerKey = dataStore.put(playerEntity);

            if ( id == null ){
                long newId = playerKey.getId();
                player.setId(newId);
            }

            txn.commit();
            return player;
        } finally {
            if ( txn.isActive() ){
                txn.rollback();
            }
        }
    }

}
