package org.askil.service.domain;

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
