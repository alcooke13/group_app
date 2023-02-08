package com.group.group.models;

import org.junit.Before;
import org.junit.Test;

import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.Assert.*;

public class PollTests {

    User user1;
    User user2;
    User user3;
    ActivityPoll activityPoll;
    LocalDateTime date1;
    LocalDateTime date2;
    Event event1;
    Group group1;


    @Before
    public void before() {
        group1 = new Group("Dream Team");
        event1 = new Event("20-02-2023", "Hangout", "The pub", "Drinking", group1);
        user1 = new User("ali", "071234456", "Edinburgh");
        user2 = new User("rory", "071234436", "Edinburgh");
        user3 = new User("ed", "0712344361", "Edinburgh");
        date1 = LocalDateTime.now().withNano(0);
        activityPoll = new ActivityPoll(LocalDateTime.now().withNano(0), event1);
        activityPoll.addOption("hike");
        activityPoll.addUserToOption("hike", user1);
    }

    @Test
    public void canGetOptions() {
        assertEquals(1, activityPoll.getOptions().size());
    }

    @Test
    public void canAddOption() {
        activityPoll.addOption("board game");
        assertEquals(2, activityPoll.getOptions().size());
    }

    @Test
    public void canAddUserToOption() {
        activityPoll.addOption("board game");
        activityPoll.addUserToOption("board game", user2);
        assertEquals(1, activityPoll.getOptions().get("board game").size());
    }

    @Test
    public void canGetTimeout() {
        assertEquals(date1, activityPoll.getTimeout());
    }

    @Test
    public void canSetTimeout() {
        date2 = LocalDateTime.now().withNano(0);
        assertEquals(date2, activityPoll.getTimeout());
    }

}