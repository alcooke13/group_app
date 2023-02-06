package com.group.group.models;

import javax.persistence.*;
import java.util.Date;

//@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@Entity
@Table(name = "activity_polls")
public class ActivityPoll extends Poll {

    public ActivityPoll(Date timeout) {
        super(timeout);
    }

    public ActivityPoll() {

    }

}
