package com.group.group.models;

import org.junit.Before;
import org.junit.Test;

import java.time.LocalDateTime;

import static org.junit.Assert.*;

public class GroupTests {

    Group group1;
    Event event1;
    Event event2;
    User user1;
    User user2;
    LocalDateTime date1;
    LocalDateTime date2;

    @Before
    public void before() {
        LocalDateTime date1 = LocalDateTime.of(2023, 2, 5, 17, 0);
        LocalDateTime date2 = LocalDateTime.of(2023, 2, 17, 11, 0);
        user1 = new User("ali", "071234456", "Edinburgh");
        user2 = new User("rory", "071234436", "Edinburgh");
        group1 = new Group("Dream Team");
        event1 = new Event(date1, "Hangout", "The pub", "Drinking", group1);
        event2 = new Event(date2, "Boogie", "The club", "Dancing", group1);
        group1.addEvent(event1);
        group1.addUser(user1);
    }

    @Test
    public void canGetUsers() {
        assertEquals(1, group1.getUsers().size());
    }

    @Test
    public void canAddUser() {
        group1.addUser(user2);
        assertEquals(2, group1.getUsers().size());
    }

    @Test
    public void canGetGroupName() {
        assertEquals("Dream Team", group1.getGroupName());
    }

    @Test
    public void canSetGroupName() {
        group1.setGroupName("New Dream Team");
        assertEquals("New Dream Team", group1.getGroupName());
    }

    @Test
    public void canGetEvents() {
        assertEquals(1, group1.getEvents().size());
    }

    @Test
    public void canAddEvent() {
        group1.addEvent(event2);
        assertEquals(2, group1.getEvents().size());
    }
}