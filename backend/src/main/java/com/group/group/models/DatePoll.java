package com.group.group.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "date_polls")
public class DatePoll extends Poll {

    @JsonManagedReference
    @OneToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name = "event_id")
    private Event event;

    public DatePoll(LocalDateTime timeout, Event event) {
        super(timeout);
        this.event = event;
    }

    public DatePoll() {

    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
