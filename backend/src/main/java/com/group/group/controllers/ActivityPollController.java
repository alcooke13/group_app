package com.group.group.controllers;

import com.group.group.models.ActivityPoll;
import com.group.group.models.DatePoll;
import com.group.group.models.Event;
import com.group.group.models.LocationPoll;
import com.group.group.repositories.ActivityPollRepository;
import com.group.group.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ActivityPollController {

    @Autowired
    ActivityPollRepository activityPollRepository;

    @Autowired
    EventRepository eventRepository;


    @GetMapping(value = "/activity-polls")
    public ResponseEntity<List<ActivityPoll>> getAllActivityPolls(
            @RequestParam(name = "user_id", required = false) Long user_id,
            @RequestParam(name = "group_id", required = false) Long group_id) {
        if (user_id != null & group_id == null) {
            return new ResponseEntity<>(activityPollRepository.findActivityPollByEventGroupUsersId(user_id), HttpStatus.OK);
        } else if (user_id == null & group_id != null) {
            return new ResponseEntity<>(activityPollRepository.findActivityPollByEventGroupId(group_id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(activityPollRepository.findAll(), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/activity-polls/{id}")
    public ResponseEntity getActivityPoll(@PathVariable Long id) {
        return new ResponseEntity<>(activityPollRepository.findById(id), HttpStatus.OK);
    }


    @PutMapping("/activity-polls/{id}/add-vote")
    public ResponseEntity<ActivityPoll> addVoterToActivityOption(
            @PathVariable long id,
            @RequestBody HashMap<String, Long> body ) {

        ActivityPoll updatePollVoters = activityPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + id));

        updatePollVoters.addUserToOption(body.keySet().toArray()[0].toString(), body.get(body.keySet().toArray()[0].toString()));
        activityPollRepository.save(updatePollVoters);
        return ResponseEntity.ok(updatePollVoters);
    }


    @PutMapping("/activity-polls/{id}/remove-vote")
    public ResponseEntity<ActivityPoll> removeVoterFromActivityOption(
            @PathVariable long id,
            @RequestBody HashMap<String, Long> body ) {

        ActivityPoll updatePollVoters = activityPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + id));

        updatePollVoters.removeUserFromOption(body.keySet().toArray()[0].toString(), body.get(body.keySet().toArray()[0].toString()));

        activityPollRepository.save(updatePollVoters);
        return ResponseEntity.ok(updatePollVoters);
    }

    @PutMapping("/activity-polls/{id}/add-option")
    public ResponseEntity<ActivityPoll> addOptionActivityPoll(
            @PathVariable long id,
            @RequestBody HashMap<String, ArrayList<Long>> body ) {

        ActivityPoll updatePollOptions = activityPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + id));


        for(String key : body.keySet()){
            updatePollOptions.addOption(key);
        };
        activityPollRepository.save(updatePollOptions);
        return ResponseEntity.ok(updatePollOptions);
    }

    @PutMapping("/activity-polls/{id}/update-timeout")
    public ResponseEntity<ActivityPoll> updateActivityPollTimeout(
            @PathVariable long id,
            @RequestBody HashMap<String, Long> body ) {

        ActivityPoll updateActivityPoll = activityPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Activity Poll Not Found: " + id));

        LocalDateTime timeout = LocalDateTime.now().withNano(0).plusHours(body.get("timeout"));

        updateActivityPoll.setTimeout(timeout);

        activityPollRepository.save(updateActivityPoll);
        return ResponseEntity.ok(updateActivityPoll);
    }

    @PutMapping("/activity-polls/{id}/set-completed")
    public ResponseEntity<ActivityPoll> updateActivityPollToComplete(
            @PathVariable long id) {

        ActivityPoll updateActivityPoll = activityPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Activity Poll Not Found: " + id));

        updateActivityPoll.setCompleted(true);

        activityPollRepository.save(updateActivityPoll);
        return ResponseEntity.ok(updateActivityPoll);
    }

    @PostMapping(path = "/activity-polls",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ActivityPoll> createActivityPoll(@RequestBody HashMap<String, Long> body) throws ServerException {

        Event updateEvent = eventRepository.findById(body.get("eventId"))
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + body.get("eventId")));

        LocalDateTime timeout = LocalDateTime.now().withNano(0).plusHours(body.get("timeout"));
        ActivityPoll activityPoll = new ActivityPoll(timeout, updateEvent);

        if (updateEvent.getDatePoll() == null) {
            activityPollRepository.save(activityPoll);
        }

        if (activityPoll != null) {
            return new ResponseEntity<>(activityPoll, HttpStatus.CREATED);
        } else {
            throw new ServerException("error: could not create activity poll");
        }
    }
}


