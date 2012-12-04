package org.askil.service.domain;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: roarkegaskill
 * Date: 12/2/12
 * Time: 9:45 AM
 * To change this template use File | Settings | File Templates.
 */
public class Game {

    private List<Player> players;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }
}
