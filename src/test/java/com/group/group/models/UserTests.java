package com.group.group.models;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class UserTests {

    User user1;
    User user2;
    User user3;
    Group group1;
    Group group2;

    @Before
    public void before() {
        user1 = new User("ali", 071234456, "Edinburgh");
        user2 = new User("rory", 071234436, "Edinburgh");
        user3 = new User("ed", 0712344361, "Edinburgh");
        group1 = new Group("Dream Team");
        group2 = new Group("New Dream Team");
        user1.addGroup(group1);
        user1.addContact(user2);
    }

    @Test
    public void canGetUserName() {
        assertEquals("ali", user1.getUserName());
    }

    @Test
    public void canSetUserName() {
        user1.setUserName("alistair");
        assertEquals("alistair", user1.getUserName());
    }

    @Test
    public void canGetPhoneNumber() {
        assertEquals(071234456, user1.getPhoneNumber());
    }

    @Test
    public void canSetPhoneNumber() {
        user1.setPhoneNumber(0723234234);
        assertEquals(0723234234, user1.getPhoneNumber());
    }

    @Test
    public void canGetGroups() {
        assertEquals(1, user1.getGroups().size());
    }

    @Test
    public void canAddGroup() {
        user1.addGroup(group2);
        assertEquals(2, user1.getGroups().size());
    }

    @Test
    public void canGetAddress() {
        assertEquals("Edinburgh", user1.getAddress());
    }

    @Test
    public void canSetAddress() {
        user1.setAddress("Aviemore");
        assertEquals("Aviemore", user1.getAddress());
    }

    @Test
    public void canGetContacts() {
        assertEquals(1, user1.getContacts().size());
    }

    @Test
    public void canAddContact() {
        user1.addContact(user3);
        assertEquals(2, user1.getContacts().size());
    }
}