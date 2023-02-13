package com.group.group.controllers;

import com.group.group.models.ActivityPoll;
import com.group.group.models.DatePoll;
import com.group.group.models.Group;
import com.group.group.models.User;
import com.group.group.repositories.DatePollRepository;
import com.group.group.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class DatePollController {

    @Autowired
    DatePollRepository datePollRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/date-polls")
    public ResponseEntity<List<DatePoll>> getAllDatePolls(
            @RequestParam(name="user_id", required = false) Long user_id,
            @RequestParam(name="group_id", required = false) Long group_id)
    {
        if (user_id != null & group_id == null) {
            return new ResponseEntity<>(datePollRepository.findDatePollByEventGroupUsersId(user_id), HttpStatus.OK);
        } else if (user_id == null & group_id != null) {
            return new ResponseEntity<>(datePollRepository.findDatePollByEventGroupId(group_id), HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(datePollRepository.findAll(), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/date-polls/{id}")
    public ResponseEntity getDatePoll(@PathVariable Long id){
        return new ResponseEntity<>(datePollRepository.findById(id), HttpStatus.OK);
    }


    @PutMapping("/date-polls/{id}/add-option")
    public ResponseEntity<DatePoll> addOptionToDatePoll(
            @PathVariable long id,
            @RequestBody HashMap<String, ArrayList<Long>> body ) {

        DatePoll updatePollOptions = datePollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + id));


        for(String key : body.keySet()){
        updatePollOptions.addOption(key);
        };
        datePollRepository.save(updatePollOptions);
        return ResponseEntity.ok(updatePollOptions);
    }

    @PutMapping("/date-polls/{id}/add-vote")
    public ResponseEntity<DatePoll> addVoterToDateOption(
            @PathVariable long id,
            @RequestBody HashMap<String, Long> body ) {

        DatePoll updatePollVoters = datePollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + id));

        updatePollVoters.addUserToOption(body.keySet().toArray()[0].toString(), body.get(body.keySet().toArray()[0].toString()));
        datePollRepository.save(updatePollVoters);
        return ResponseEntity.ok(updatePollVoters);
    }
}



