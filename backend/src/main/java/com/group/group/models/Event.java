package com.group.group.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private String date;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "event_location")
    private String eventLocation;

    @Column(name = "activity")
    private String activity;

    @OneToOne
    @JoinColumn(name = "event_id")
    private ActivityPoll activityPoll;

    @OneToOne
    @JoinColumn(name = "event_id")
    private LocationPoll locationPoll;

    @OneToOne
    @JoinColumn(name = "event_id")
    private DatePoll datePoll;

    public Event(String date, String eventName, String eventLocation, String activity) {
        this.date = date;
        this.eventName = eventName;
        this.eventLocation = eventLocation;
        this.activity = activity;
        this.activityPoll = null;
        this.locationPoll = null;
        this.datePoll = null;
    }

    public Event() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public ActivityPoll getActivityPoll() {
        return this.activityPoll;
    }

    public void setActivityPoll(ActivityPoll activityPoll) {
        this.activityPoll = activityPoll;
    }

    public LocationPoll getLocationPoll() {
        return this.locationPoll;
    }

    public void setLocationPoll(LocationPoll locationPoll) {
        this.locationPoll = locationPoll;
    }

    public DatePoll getDatePoll() {
        return this.datePoll;
    }

    public void setDatePoll(DatePoll datePoll) {
        this.datePoll = datePoll;
    }
}
