package org.askil.service.domain;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: roarkegaskill
 * Date: 12/2/12
 * Time: 9:46 AM
 * To change this template use File | Settings | File Templates.
 */
public class Team {

    private String name;
    private List<Game> game;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Game> getGame() {
        return game;
    }

    public void setGame(List<Game> game) {
        this.game = game;
    }
}
