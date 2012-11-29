package org.askil.service.domain;

import com.google.appengine.api.datastore.Entity;

/**
 * Created with IntelliJ IDEA.
 * User: roarkegaskill
 * Date: 11/28/12
 * Time: 2:08 PM
 * To change this template use File | Settings | File Templates.
 */
public class Player {

    private Long id;
    private String name;
    private String number;

    public Player() {

    }

    public Player(Entity entity){
        this.id = entity.getKey().getId();
        name = (String) entity.getProperty("name");
        number = (String) entity.getProperty("number");
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
