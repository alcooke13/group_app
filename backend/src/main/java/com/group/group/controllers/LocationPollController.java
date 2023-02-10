package com.group.group.controllers;

import com.group.group.models.DatePoll;
import com.group.group.models.LocationPoll;
import com.group.group.repositories.LocationPollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LocationPollController {

    @Autowired
    LocationPollRepository locationPollRepository;

    @GetMapping(value = "/location-polls")
    public ResponseEntity<List<LocationPoll>> getAllLocationPolls(
            @RequestParam(name="user_id", required = false) Long user_id,
            @RequestParam(name="group_id", required = false) Long group_id)
    {
        if (user_id != null & group_id == null) {
            return new ResponseEntity<>(locationPollRepository.findLocationPollByEventGroupId(user_id), HttpStatus.OK);
        } else if (user_id == null & group_id != null) {
            return new ResponseEntity<>(locationPollRepository.findLocationPollByEventGroupId(group_id), HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(locationPollRepository.findAll(), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/location-polls/{id}")
    public ResponseEntity getLocationPoll(@PathVariable Long id){
        return new ResponseEntity<>(locationPollRepository.findById(id), HttpStatus.OK);
    }
}
