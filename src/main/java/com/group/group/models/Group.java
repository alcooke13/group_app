package com.group.group.models;

import java.util.ArrayList;

public class Group {

//    private ArrayList<User> users;
    private String groupName;
    private Event upcomingEvent;
    private ArrayList<Event> pastEvents;

    public Group(String groupName) {
        this.groupName = groupName;
        this.upcomingEvent = null;
        this.pastEvents = new ArrayList<Event>();
    }

    public String getGroupName() {
        return this.groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Event getUpcomingEvent() {
        return this.upcomingEvent;
    }

    public void setUpcomingEvent(Event upcomingEvent) {
        this.upcomingEvent = upcomingEvent;
    }

    public ArrayList<Event> getPastEvents() {
        return this.pastEvents;
    }

    public void addToPastEvents(Event event){
        this.pastEvents.add(event);
    }

}
