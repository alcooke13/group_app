package com.group.group.models;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.*;

public class PollTests {

    User user1;
    User user2;
    User user3;
    ActivityPoll activityPoll;
    Date date1;
    Date date2;


    @Before
    public void before() {
        user1 = new User("ali", "071234456", "Edinburgh");
        user2 = new User("rory", "071234436", "Edinburgh");
        user3 = new User("ed", "0712344361", "Edinburgh");
        date1 = new Date();
        activityPoll = new ActivityPoll(date1);
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
        date2 = new Date();
        assertEquals(date2, activityPoll.getTimeout());
    }

}