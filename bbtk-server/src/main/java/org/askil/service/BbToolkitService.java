package org.askil.service;

import com.google.appengine.api.datastore.*;
import org.askil.service.domain.Player;
import org.askil.service.domain.Position;
import org.askil.service.domain.Test;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
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

    private static final String PLAYER = "Player";
    private static final String POSITION = "Position";

    @GET
    @Path("/clearpositions")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Player> clearPositions(){
        DatastoreService dataStore = DatastoreServiceFactory.getDatastoreService();
        TransactionOptions options = TransactionOptions.Builder.withXG(true);

        Query q = new Query(PLAYER);

            ArrayList<Player> ret = new ArrayList<Player>();
            PreparedQuery pq = dataStore.prepare(q);


            for (Entity playerEntity: pq.asIterable()) {
                Player player = new Player(playerEntity);

                Transaction txn = dataStore.beginTransaction();

                try {
                    Query posQ = new Query(POSITION, playerEntity.getKey());
                    PreparedQuery posPq = dataStore.prepare(posQ);
                    ArrayList<Entity> positionList = new ArrayList<Entity>();
                    ArrayList<Position> retPosList = new ArrayList<Position>();
                    for (Entity positionEntity : posPq.asIterable()) {
                        positionEntity.setProperty("label", "Bench");
                        positionList.add(positionEntity);

                        Position pos = new Position(positionEntity);
                        retPosList.add(pos);
                    }
                    dataStore.put(positionList);
                    txn.commit();
                    positionList.clear();
                    player.setPositions(retPosList);
                } finally {
                    if ( txn.isActive() ){
                        txn.rollback();
                    }
                }

                ret.add(player);

            }





        return ret;
    }

    @GET
    @Path("/player/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Player getPlayer(@PathParam("id") long id){
        Key key = KeyFactory.createKey(PLAYER, id);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        try {
            Entity entity = datastore.get(key);
            Player player =  new Player(entity);
            List<Position> positions = getPositions(id);
            player.setPositions(positions);


            return player;
        } catch (Exception e){
            return null;
        }
    }

    @GET
    @Path("/player")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Player> getPlayers(){
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Query playerQuery = new Query(PLAYER) ;

        List<Entity> results = datastore.prepare(playerQuery).asList(FetchOptions.Builder.withDefaults());

        ArrayList<Player> ret = new ArrayList<Player>();
        for(Entity e : results){
            Player player = new Player(e);
            List<Position> positions = getPositions(e.getKey().getId());
            player.setPositions(positions);
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
                playerEntity = new Entity(PLAYER, id);
            } else {
                playerEntity = new Entity(PLAYER);
            }

            playerEntity.setProperty("name", player.getName());
            playerEntity.setProperty("number", player.getNumber());
            Key playerKey = dataStore.put(playerEntity);

            if ( id == null ){
                long newId = playerKey.getId();
                player.setId(newId);
            }

            List<Position> positions = player.getPositions();
            if ( positions != null ) {
                ArrayList<Entity> entities = new ArrayList<Entity>();
                for(Position p : positions ){
                    Key positionKey = KeyFactory.createKey(playerKey,POSITION,p.getInning());
                    Entity positionEntity = new Entity(positionKey);
                    positionEntity.setProperty("inning", p.getInning());
                    positionEntity.setProperty("label", p.getLabel());
                    entities.add(positionEntity);
                }
                dataStore.put(entities);
            }

            txn.commit();
            return player;
        } finally {
            if ( txn.isActive() ){
                txn.rollback();
            }
        }
    }

    @POST
    @Path("/player/{id}/position/{inning}")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN, MediaType.WILDCARD})
    @Produces(MediaType.APPLICATION_JSON)
    public Position setInning(@PathParam("id") long playerId, @PathParam("inning") long inning, Position position){
        DatastoreService dataStore = DatastoreServiceFactory.getDatastoreService();
        Transaction txn = dataStore.beginTransaction();

        try {
            Key playerKey = KeyFactory.createKey(PLAYER,playerId);
            Key positionKey = KeyFactory.createKey(playerKey, POSITION, inning);

            position.setInning(inning);

            Entity positionEntity = new Entity(positionKey);
            positionEntity.setProperty("inning", position.getInning());
            positionEntity.setProperty("label", position.getLabel());
            dataStore.put(positionEntity);

            txn.commit();

            return position;
        } finally {
            if ( txn.isActive() ){
                txn.rollback();
            }
        }

    }

    @GET
    @Path("/player/{id}/position/{inning}")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN, MediaType.WILDCARD})
    @Produces(MediaType.APPLICATION_JSON)
    public Position getInning(@PathParam("id") long playerId, @PathParam("inning") long inning){
        DatastoreService dataStore = DatastoreServiceFactory.getDatastoreService();
        Transaction txn = dataStore.beginTransaction();
        try {
            Key playerKey = KeyFactory.createKey(PLAYER,playerId);
            Key positionKey = KeyFactory.createKey(playerKey, POSITION,inning);

            Entity positionEntity = null;
            try {
                positionEntity = dataStore.get(positionKey);
                Position ret = new Position();
                ret.setInning((Long) positionEntity.getProperty("inning"));
                ret.setLabel((String) positionEntity.getProperty("label"));

                txn.commit();
                return ret;
            } catch (EntityNotFoundException e) {
                log.log(Level.SEVERE, "error getting positon.",e);
            }
            return null;
        } finally {
            if ( txn.isActive() ){
                txn.rollback();
            }
        }
    }

    @GET
    @Path("/player/{id}/position")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN, MediaType.WILDCARD})
    @Produces(MediaType.APPLICATION_JSON)
    public List<Position> getPositions(@PathParam("id") long playerId){
        DatastoreService dataStore = DatastoreServiceFactory.getDatastoreService();
        Transaction txn = dataStore.beginTransaction();
        ArrayList<Position> ret = new ArrayList<Position>();
        try {
            Key playerKey = KeyFactory.createKey(PLAYER,playerId);
            Query q = new Query(POSITION).setAncestor(playerKey).addSort("inning", Query.SortDirection.ASCENDING);

            PreparedQuery pq = dataStore.prepare(q);

            for (Entity result : pq.asIterable()) {

                Position pos = new Position();
                pos.setInning((Long) result.getProperty("inning"));
                pos.setLabel((String) result.getProperty("label"));

                ret.add(pos);
            }

            txn.commit();

            return ret;
        } finally {
            if ( txn.isActive() ){
                txn.rollback();
            }
        }

    }

}
