package com.group.group.models;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "date_polls")
public class DatePoll extends Poll {

    public DatePoll(Date timeout) {
        super(timeout);
    }
    public DatePoll() {
    }

}
