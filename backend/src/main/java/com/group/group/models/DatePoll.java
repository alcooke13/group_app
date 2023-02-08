package com.group.group.models;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "date_polls")
public class DatePoll extends Poll {

    public DatePoll(LocalDateTime timeout) {
        super(timeout);
    }

    public DatePoll() {

    }

}
