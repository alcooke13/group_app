package com.group.group.models;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class GroupTests {

    Group group1;
    Event event1;
    Event event2;
    Event event3;
    User user1;
    User user2;

    @Before
    public void before() {
        user1 = new User("ali", 071234456, "Edinburgh");
        user2 = new User("rory", 071234436, "Edinburgh");
        event1 = new Event("20-02-2023", "Hangout", "The pub", "Drinking");
        event2 = new Event("25-02-2023", "Boogie", "The club", "Dancing");
        group1 = new Group("Dream Team");
        group1.setUpcomingEvent(event1);
        group1.addPastEvent(event2);
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
    public void canGetUpcomingEvent() {
        assertEquals(event1, group1.getUpcomingEvent());
    }

    @Test
    public void canSetUpcomingEvent() {
        event3 =  new Event("20-03-2023", "Hangout", "Fountainpark", "Bowling");
        group1.setUpcomingEvent(event3);
        assertEquals(event3, group1.getUpcomingEvent());
    }

    @Test
    public void canGetPastEvents() {
        assertEquals(1, group1.getPastEvents().size());
    }

    @Test
    public void canAddPastEvent() {
        group1.addPastEvent(event2);
        assertEquals(2, group1.getPastEvents().size());
    }
}