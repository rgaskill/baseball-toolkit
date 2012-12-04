package org.askil.service.domain;

import com.google.appengine.api.datastore.Entity;

/**
 * Created with IntelliJ IDEA.
 * User: roarkegaskill
 * Date: 12/1/12
 * Time: 1:54 PM
 * To change this template use File | Settings | File Templates.
 */
public class Position {

    private Long inning;
    private String label;

    public Position() {

    }

    public Position(Entity entity) {
        inning = (Long) entity.getProperty("inning");
        label = (String) entity.getProperty("label");
    }

    public Long getInning() {
        return inning;
    }

    public void setInning(Long inning) {
        this.inning = inning;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
