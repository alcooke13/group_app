package com.group.group.controllers;

import com.group.group.models.Group;
import com.group.group.repositories.GroupRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;
import java.util.List;

@RestController
public class GroupController {

    @Autowired
    GroupRepository groupRepository;

    @GetMapping(value = "/groups")
    public ResponseEntity<List<Group>> getAllGroups(
            @RequestParam(name="user_id", required = false) Long user_id) {
        if (user_id != null) {
            return new ResponseEntity<>(groupRepository.findGroupsByUsersId(user_id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(groupRepository.findAll(), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/groups/{id}")
    public ResponseEntity getGroup(@PathVariable Long id) {
        return new ResponseEntity<>(groupRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping(path = "/groups",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Group> createGroup(@RequestBody Group newGroup) throws ServerException {

        Group group = groupRepository.save(newGroup);
        if (group != null) {
            return new ResponseEntity<>(group, HttpStatus.CREATED);
        } else {
            throw new ServerException("error: could not create group");
        }
    }

    @PutMapping("/groups/{id}")
    public ResponseEntity<Group> updateGroup(@PathVariable long id,@RequestBody Employee employeeDetails) {
        Employee updateEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        updateEmployee.setFirstName(employeeDetails.getFirstName());
        updateEmployee.setLastName(employeeDetails.getLastName());
        updateEmployee.setEmailId(employeeDetails.getEmailId());

        employeeRepository.save(updateEmployee);

        return ResponseEntity.ok(updateEmployee);
    }
}
