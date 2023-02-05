package com.group.group.models;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class EventTests {

    Event event1;

    @Before
    public void before() {
        event1 = new Event("20-02-2023", "Hangout", "The pub", "Drinking");
    }

    @Test
    public void canGetDate() {
        assertEquals("20-02-2023", event1.getDate());
    }

    @Test
    public void canSetDate() {
        event1.setDate("25-02-2023");
        assertEquals("25-02-2023", event1.getDate());
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
}


