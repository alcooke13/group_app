package com.group.group.models;

import javax.persistence.Entity;
import java.util.ArrayList;

@Entity
@Table(name = "folders")
public class User {

    private String userName;
    private int phoneNumber;
    private String address;
    private ArrayList<Group> groups;
    private ArrayList<User> contacts;

    public User(String userName, int phoneNumber, String address) {
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.groups = new ArrayList<Group>();
        this.contacts = new ArrayList<User>();
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public ArrayList<Group> getGroups() {
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

    public ArrayList<User> getContacts() {
        return this.contacts;
    }

    public void addContact(User user) {
        this.contacts.add(user);
    }
}