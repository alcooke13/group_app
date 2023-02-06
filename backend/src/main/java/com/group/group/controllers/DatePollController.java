package com.group.group.controllers;

import com.group.group.models.DatePoll;
import com.group.group.repositories.DatePollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DatePollController {

    @Autowired
    DatePollRepository datePollRepository;

    @GetMapping(value = "/date-polls")
    public ResponseEntity<List<DatePoll>> getAllDatePolls() {
        return new ResponseEntity<>(datePollRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/date-polls/{id}")
    public ResponseEntity getDatePoll(@PathVariable Long id){
        return new ResponseEntity<>(datePollRepository.findById(id), HttpStatus.OK);
    }
}
