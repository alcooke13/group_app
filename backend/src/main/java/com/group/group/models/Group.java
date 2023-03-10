package com.group.group.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JsonIgnoreProperties("groups")
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
    private List<User> users;

    @Column(name = "group_name")
    private String groupName;

    @JsonIgnoreProperties("group")
    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY)
    private List<Event> events;

    public Group(String groupName) {
        this.users = new ArrayList<User>();
        this.groupName = groupName;
        this.events = new ArrayList<Event>();
    }

    public Group() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<User> getUsers() {
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

    public List<Event> getEvents() {
        return this.events;
    }

    public void addEvent(Event event){
        this.events.add(event);
    }

    public void removeMember(User member) {
        if (this.users.contains(member)){
            this.users.remove(member);
        }
    }
}
