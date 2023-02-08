package com.group.group.models;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@MappedSuperclass
public abstract class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "options")
    private HashMap<String, ArrayList<User>> options;

    @Column(name = "timeout")
    private LocalDateTime timeout;

    public Poll(LocalDateTime timeout) {
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

    public LocalDateTime getTimeout() {
        return this.timeout;
    }

    public void setTimeout(LocalDateTime timeout) {
        this.timeout = timeout;
    }
}
