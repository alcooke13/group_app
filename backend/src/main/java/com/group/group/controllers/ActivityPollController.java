package com.group.group.controllers;

import com.group.group.models.ActivityPoll;
import com.group.group.models.DatePoll;
import com.group.group.models.LocationPoll;
import com.group.group.repositories.ActivityPollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ActivityPollController {

    @Autowired
    ActivityPollRepository activityPollRepository;


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


}


