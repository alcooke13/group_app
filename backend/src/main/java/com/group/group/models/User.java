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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @ManyToMany
    @JsonIgnoreProperties("users")
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "users_groups",
            joinColumns = { @JoinColumn(
                    name = "user_id",
                    nullable = false,
                    updatable = false)
            },
            inverseJoinColumns = { @JoinColumn(
                    name = "group_id",
                    nullable = false,
                    updatable = false)
            })
    private List<Group> groups;

    @JsonBackReference("friends-friendOf")
    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name="table_friends",

            joinColumns=@JoinColumn(name="user_id"),
            inverseJoinColumns=@JoinColumn(name="friend_id")
    )
    private List<User> friends;

    @JsonManagedReference("friends-friendOf")
    @ManyToMany(cascade=CascadeType.ALL)
    @JsonIgnore
    @JoinTable(name="table_friends",
            joinColumns=@JoinColumn(name="friend_id"),
            inverseJoinColumns=@JoinColumn(name="user_id")
    )
    private List<User> friendOf;

    public User(String userName, String phoneNumber, String address) {
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.friends = new ArrayList<>();
        this.friendOf = new ArrayList<>();
        this.groups = new ArrayList<>();
    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Group> getGroups() {
        return this.groups;
    }

    public void addGroup(Group group) {
        this.groups.add(group);
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<User> getFriends() {
        return friends;
    }

    @JsonIgnore
    public List<User> getFriendOf() {
        return friendOf;
    }

    public void addFriend(User user){
        this.friends.add(user);
    }

    public void removeFriend(User user){
        this.friends.remove(user);
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }

    public void setFriends(List<User> friends) {
        this.friends = friends;
    }

    public void setFriendOf(List<User> friendOf) {
        this.friendOf = friendOf;
    }
}