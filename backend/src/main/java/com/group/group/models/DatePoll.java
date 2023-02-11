package com.group.group.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "date_polls")
public class DatePoll extends Poll {

    @JsonManagedReference("event-datePoll")
    @OneToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(name = "poll_type")
    private String type;

    public DatePoll(LocalDateTime timeout, Event event) {
        super(timeout);
        this.event = event;
        this.type= "Date";
    }

    public DatePoll() {

    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
