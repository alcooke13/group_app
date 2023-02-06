package com.group.group.models;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "location_polls")
public class LocationPoll extends Poll {
    public LocationPoll(Date timeout) {
        super(timeout);
    }
    public LocationPoll() {
    }

}
