package com.group.group.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "activity_polls")
public class ActivityPoll extends Poll {

    @JsonManagedReference("event-activityPoll")
    @OneToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name = "event_id")
    private Event event;

    public ActivityPoll(LocalDateTime timeout, Event event) {
        super(timeout);
        this.event = event;
    }

    public ActivityPoll() {

    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
