package com.group.group.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JsonBackReference
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "users_groups",
            joinColumns = { @JoinColumn(
                    name = "group_id",
                    nullable = false,
                    updatable = false)
            },
            inverseJoinColumns = { @JoinColumn(
                    name = "user_id",
                    nullable = false,
                    updatable = false)
            })
    private ArrayList<User> users;

    @Column(name = "group_name")
    private String groupName;

    @OneToOne
    @JoinColumn(name = "group_id")
    private Event upcomingEvent;

    @OneToMany
    @JoinColumn(name = "group_id")
    private ArrayList<Event> pastEvents;

    public Group(String groupName) {
        this.users = new ArrayList<User>();
        this.groupName = groupName;
        this.upcomingEvent = null;
        this.pastEvents = new ArrayList<Event>();
    }

    public Group() {

    }

    public ArrayList<User> getUsers() {
        return users;
    }

    public void addUser(User user) {
        this.users.add(user);
    }

    public String getGroupName() {
        return this.groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Event getUpcomingEvent() {
        return this.upcomingEvent;
    }

    public void setUpcomingEvent(Event upcomingEvent) {
        this.upcomingEvent = upcomingEvent;
    }

    public ArrayList<Event> getPastEvents() {
        return this.pastEvents;
    }

    public void addPastEvent(Event event){
        this.pastEvents.add(event);
    }

}
