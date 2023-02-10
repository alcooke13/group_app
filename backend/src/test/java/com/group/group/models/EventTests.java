package com.group.group.models;

import org.junit.Before;
import org.junit.Test;

import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.Assert.*;

public class EventTests {

    Group group1;
    Event event1;
    Date date;
    ActivityPoll activityPoll;
    LocationPoll locationPoll;
    DatePoll datePoll;
    LocalDateTime date1;
    LocalDateTime date2;

    @Before
    public void before() {
        group1 = new Group("Dream Team");
        date1 = LocalDateTime.of(2023, 2, 5, 17, 0);
        event1 = new Event(date1, "Hangout", "The pub", "Drinking", group1);
        date = new Date();
        activityPoll = new ActivityPoll(LocalDateTime.of(2023, 2, 5, 17, 0), event1);
        locationPoll = new LocationPoll(LocalDateTime.of(2023, 2, 5, 17, 0), event1);
        datePoll = new DatePoll(LocalDateTime.of(2023, 2, 5, 17, 0), event1);
    }

    @Test
    public void canGetDate() {
        assertEquals(LocalDateTime.of(2023, 2, 5, 17, 0), event1.getDate());
    }

    @Test
    public void canSetDate() {
        date2 = LocalDateTime.of(2023, 2, 17, 11, 0);
        event1.setDate(date2);
        assertEquals(LocalDateTime.of(2023, 2, 17, 11, 0), event1.getDate());
    }

    @Test
    public void canGetEventName() {
        assertEquals("Hangout", event1.getEventName());
    }

    @Test
    public void canSetEventName() {
        event1.setEventName("Movies");
        assertEquals("Movies", event1.getEventName());
    }

    @Test
    public void canGetEventLocation() {
        assertEquals("The pub", event1.getEventLocation());
    }

    @Test
    public void canSetEventLocation() {
        event1.setEventLocation("Cinema");
        assertEquals("Cinema", event1.getEventLocation());
    }

    @Test
    public void canGetActivity() {
        assertEquals("Drinking", event1.getActivity());
    }

    @Test
    public void canSetActivity() {
        event1.setActivity("Watching");
        assertEquals("Watching", event1.getActivity());
    }

    @Test
    public void canGetActivityPoll() {
        assertNull(event1.getActivityPoll());
    }

    @Test
    public void canSetActivityPoll() {
        event1.setActivityPoll(activityPoll);
        assertEquals(activityPoll, event1.getActivityPoll());
    }

    @Test
    public void canGetLocationPoll() {
        assertNull(event1.getLocationPoll());
    }

    @Test
    public void canSetLocationPoll() {
        event1.setLocationPoll(locationPoll);
        assertEquals(locationPoll, event1.getLocationPoll());
    }

    @Test
    public void canGetDatePoll() {
        assertNull(event1.getDatePoll());
    }


    @Test
    public void canSetDatePoll() {
        event1.setDatePoll(datePoll);
        assertEquals(datePoll, event1.getDatePoll());
    }



}


