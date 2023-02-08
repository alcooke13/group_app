package com.group.group.models;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

//@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@Entity
@Table(name = "activity_polls")
public class ActivityPoll extends Poll {

    @OneToOne(cascade = CascadeType.ALL)
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
