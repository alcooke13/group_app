package com.group.group.controllers;

import com.group.group.models.LocationPoll;
import com.group.group.repositories.LocationPollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LocationPollController {

    @Autowired
    LocationPollRepository LocationPollRepository;

    @GetMapping(value = "/location-polls")
    public ResponseEntity<List<LocationPoll>> getAllLocationPolls() {
        return new ResponseEntity<>(LocationPollRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/location-polls/{id}")
    public ResponseEntity getLocationPoll(@PathVariable Long id){
        return new ResponseEntity<>(LocationPollRepository.findById(id), HttpStatus.OK);
    }
}
