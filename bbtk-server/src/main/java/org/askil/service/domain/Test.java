package org.askil.service.domain;

/**
 * Created with IntelliJ IDEA.
 * User: roarkegaskill
 * Date: 11/28/12
 * Time: 1:55 PM
 * To change this template use File | Settings | File Templates.
 */
public class Test {
    public String name;
    public String value;

    public Test(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
