package com.group.group.controllers;

import com.group.group.models.DatePoll;
import com.group.group.models.User;
import com.group.group.repositories.DatePollRepository;
import com.group.group.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @PutMapping("/date-polls/{id}/add-vote")
    public ResponseEntity<DatePoll> addVoteToPoll(
            @PathVariable long id,
            @RequestBody List<Long> userIds, String option) {

        DatePoll updatePoll = datePollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Poll Not Found: " + id));

        for (Long userId : userIds) {
            User voter = userRepository
                    .findById(userId)
                    .orElseThrow(() -> new RuntimeException("Voter Not Found: " + userId));
            if (voter != null) {
                updatePoll.addUserToOption(option, voter.getId());
            }
        }

        datePollRepository.save(updatePoll);

        return ResponseEntity.ok(updatePoll);
    }


}
