package com.group.group.controllers;

import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.group.group.models.*;
import com.group.group.repositories.DatePollRepository;
import com.group.group.repositories.EventRepository;
import com.group.group.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
public class DatePollController {

    @Autowired
    DatePollRepository datePollRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

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

    @PostMapping(path = "/date-polls",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DatePoll> createDatePoll(@RequestBody HashMap<String, Long> body) throws ServerException {

        Event updateEvent = eventRepository.findById(body.get("eventId"))
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + body.get("eventId")));

        LocalDateTime timeout = LocalDateTime.now().withNano(0).plusHours(body.get("timeout"));
        DatePoll newDatePoll = new DatePoll(timeout, updateEvent);

        if (updateEvent.getDatePoll() == null) {
            datePollRepository.save(newDatePoll);
        }

        if (newDatePoll != null) {
            return new ResponseEntity<>(newDatePoll, HttpStatus.CREATED);
        } else {
            throw new ServerException("error: could not create event");
        }
    }

    @PutMapping("/date-polls/{id}/update-timeout")
    public ResponseEntity<DatePoll> updateDatePollTimeout(
            @PathVariable long id,
            @RequestBody HashMap<String, Long> body ) {

        DatePoll updateDatePoll = datePollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Date Poll Not Found: " + id));

        LocalDateTime timeout = LocalDateTime.now().withNano(0).plusHours(body.get("timeout"));

        updateDatePoll.setTimeout(timeout);

        datePollRepository.save(updateDatePoll);
        return ResponseEntity.ok(updateDatePoll);
    }
}



