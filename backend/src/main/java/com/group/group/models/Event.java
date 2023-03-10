package com.group.group.models;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "event_location")
    private String eventLocation;

    @Column(name = "activity")
    private String activity;

    @JsonBackReference("event-activityPoll")
    @OneToOne(mappedBy = "event", cascade=CascadeType.ALL)
    private ActivityPoll activityPoll;

    @JsonBackReference("event-locationPoll")
    @OneToOne(mappedBy = "event", cascade=CascadeType.ALL)
    private LocationPoll locationPoll;

    @JsonBackReference("event-datePoll")
    @OneToOne(mappedBy = "event", cascade=CascadeType.ALL)
    private DatePoll datePoll;

    public Event(LocalDateTime date, String eventName, String eventLocation, String activity, Group group) {
        this.group = group;
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

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public LocalDateTime getDate() {
        return this.date;
    }

    public void setDate(LocalDateTime date) {
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
