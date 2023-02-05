package com.group.group.models;

public class Event {

    private String date;
    private String eventName;
    private String eventLocation;
    private String activity;

    //Polls to be added


    public Event(String date, String eventName, String eventLocation, String activity) {
        this.date = date;
        this.eventName = eventName;
        this.eventLocation = eventLocation;
        this.activity = activity;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getEventName() {
        return this.eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventLocation() {
        return this.eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public String getActivity() {
        return this.activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }
}
