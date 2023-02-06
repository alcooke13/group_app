package com.group.group.models;

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

    @Column(name = "phone_name")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @ManyToMany
    @JsonManagedReference
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

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name="tbl_friends",

            joinColumns=@JoinColumn(name="personId"),
            inverseJoinColumns=@JoinColumn(name="friendId")
    )
    private List<User> friends;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name="tbl_friends",
            joinColumns=@JoinColumn(name="friendId"),
            inverseJoinColumns=@JoinColumn(name="personId")
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

    public void setFriends(List<User> friends) {
        this.friends = friends;
    }

    public List<User> getFriendOf() {
        return friendOf;
    }

    public void setFriendOf(List<User> friendOf) {
        this.friendOf = friendOf;
    }

    public void addFriend(User user){
        this.friends.add(user);
    }
}