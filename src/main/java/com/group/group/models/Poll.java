package com.group.group.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public abstract class Poll {

    private HashMap<String, ArrayList<User>> options;
    private Date timeout;

    public Poll(Date timeout) {
        this.options = new HashMap<String, ArrayList<User>>();
        this.timeout = timeout;
    }

    public HashMap<String, ArrayList<User>> getOptions() {
        return options;
    }

    public void addOption(String option) {
        this.options.put(option, new ArrayList<User>());
    }

    public void addUserToOption(String option, User user) {
        this.options.get(option).add(user);
    }

    public Date getTimeout() {
        return timeout;
    }

    public void setTimeout(Date timeout) {
        this.timeout = timeout;
    }
}
