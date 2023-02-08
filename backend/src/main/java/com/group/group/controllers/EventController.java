package com.group.group.controllers;

import com.group.group.models.Event;
import com.group.group.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @GetMapping(value = "/events")
    public ResponseEntity<List<Event>> getAllEvents(
            @RequestParam(name="user_id", required = false) Long user_id)
    {
        if (user_id != null) {
            return new ResponseEntity<>(eventRepository.findByGroupUsersId(user_id), HttpStatus.OK);
        }
        return new ResponseEntity<>(eventRepository.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/events/{id}")
    public ResponseEntity getEvent(@PathVariable Long id){
        return new ResponseEntity<>(eventRepository.findById(id), HttpStatus.OK);
    }
}
