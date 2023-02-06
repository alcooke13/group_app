package com.group.group.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@MappedSuperclass
public abstract class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private HashMap<String, ArrayList<User>> options;
    private Date timeout;

    public Poll(Date timeout) {
        this.options = new HashMap<String, ArrayList<User>>();
        this.timeout = timeout;
    }

    public Poll() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOptions(HashMap<String, ArrayList<User>> options) {
        this.options = options;
    }

    public HashMap<String, ArrayList<User>> getOptions() {
        return this.options;
    }

    public void addOption(String option) {
        this.options.put(option, new ArrayList<User>());
    }

    public void addUserToOption(String option, User user) {
        this.options.get(option).add(user);
    }

    public Date getTimeout() {
        return this.timeout;
    }

    public void setTimeout(Date timeout) {
        this.timeout = timeout;
    }
}
