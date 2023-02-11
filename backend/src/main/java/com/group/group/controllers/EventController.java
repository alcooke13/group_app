package com.group.group.controllers;

import com.group.group.models.Event;
import com.group.group.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;
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

    @PostMapping(path = "/events",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Event> createEvent(@RequestBody Event newEvent) throws ServerException {

        Event event = eventRepository.save(newEvent);
        if (event != null) {
            return new ResponseEntity<>(event, HttpStatus.CREATED);
        } else {
            throw new ServerException("error: could not create event");
        }
    }



}
