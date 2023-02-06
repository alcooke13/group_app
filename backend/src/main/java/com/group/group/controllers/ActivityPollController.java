package com.group.group.controllers;

import com.group.group.models.ActivityPoll;
import com.group.group.repositories.ActivityPollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ActivityPollController {

    @Autowired
    ActivityPollRepository activityPollRepository;

    @GetMapping(value = "/activity-polls")
    public ResponseEntity<List<ActivityPoll>> getAllActivityPolls() {
        return new ResponseEntity<>(activityPollRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/activity-polls/{id}")
    public ResponseEntity getActivityPoll(@PathVariable Long id){
        return new ResponseEntity<>(activityPollRepository.findById(id), HttpStatus.OK);
    }
}
