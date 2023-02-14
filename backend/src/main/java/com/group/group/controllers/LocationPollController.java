package com.group.group.controllers;

import com.group.group.models.ActivityPoll;
import com.group.group.models.DatePoll;
import com.group.group.models.LocationPoll;
import com.group.group.repositories.LocationPollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
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

    @PutMapping("/location-polls/{id}/add-vote")
    public ResponseEntity<LocationPoll> addVoterToLocationOption(
            @PathVariable long id,
            @RequestBody HashMap<String, Long> body ) {

        LocationPoll updatePollVoters = locationPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + id));

        updatePollVoters.addUserToOption(body.keySet().toArray()[0].toString(), body.get(body.keySet().toArray()[0].toString()));
        locationPollRepository.save(updatePollVoters);
        return ResponseEntity.ok(updatePollVoters);
    }

    @PutMapping("/location-polls/{id}/remove-vote")
    public ResponseEntity<LocationPoll> removeVoterFromLocationOption(
            @PathVariable long id,
            @RequestBody HashMap<String, Long> body ) {

        LocationPoll updatePollVoters = locationPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + id));

        updatePollVoters.removeUserFromOption(body.keySet().toArray()[0].toString(), body.get(body.keySet().toArray()[0].toString()));
        locationPollRepository.save(updatePollVoters);
        return ResponseEntity.ok(updatePollVoters);
    }

    @PutMapping("/location-polls/{id}/add-option")
    public ResponseEntity<LocationPoll> addOptionToLocationPoll(
            @PathVariable long id,
            @RequestBody HashMap<String, ArrayList<Long>> body ) {

        LocationPoll updatePollOptions = locationPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Poll Option Not Found: " + id));


        for(String key : body.keySet()){
            updatePollOptions.addOption(key);
        };
        locationPollRepository.save(updatePollOptions);
        return ResponseEntity.ok(updatePollOptions);
    }

    @PutMapping("/location-polls/{id}/update-timeout")
    public ResponseEntity<LocationPoll> updateLocationPollTimeout(
            @PathVariable long id,
            @RequestBody HashMap<String, Long> body ) {

        LocationPoll updateLocationPoll = locationPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Date Poll Not Found: " + id));

        LocalDateTime timeout = LocalDateTime.now().withNano(0).plusHours(body.get("timeout"));

        updateLocationPoll.setTimeout(timeout);

        locationPollRepository.save(updateLocationPoll);
        return ResponseEntity.ok(updateLocationPoll);
    }

    @PutMapping("/location-polls/{id}/set-completed")
    public ResponseEntity<LocationPoll> updateLocationPollToComplete(
            @PathVariable long id) {

        LocationPoll updateLocationPoll = locationPollRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Activity Poll Not Found: " + id));

        updateLocationPoll.setCompleted(true);

        locationPollRepository.save(updateLocationPoll);
        return ResponseEntity.ok(updateLocationPoll);
    }
}
