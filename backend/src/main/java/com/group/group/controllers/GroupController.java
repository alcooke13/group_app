package com.group.group.controllers;

import com.group.group.models.Event;
import com.group.group.models.Group;
import com.group.group.models.User;
import com.group.group.repositories.GroupRepository;
import com.group.group.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
public class GroupController {

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    UserRepository userRepository;

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

    @PutMapping("/groups/{id}/remove-members")
    public ResponseEntity<Group> deleteMembers(
            @PathVariable long id,
            @RequestBody List<Long> userIds) {

        Group updateUser = groupRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Group Not Found: " + id));

        List<User> members = updateUser.getUsers();

        for (Long userId : userIds) {
            User member = userRepository
                    .findById(userId)
                    .orElseThrow(() -> new RuntimeException("Group Not Found: " + userId));

            if (members.contains(member)) {
                updateUser.removeMember(member);
            }
        }

        groupRepository.save(updateUser);

        return ResponseEntity.ok(updateUser);
    }

//    @GetMapping(value = "/groups/{id}/members")
//    public ResponseEntity getGroupMembers(@PathVariable Long id) {
//        return new ResponseEntity<>(groupRepository.findByGroupId(id), HttpStatus.OK);
//    }


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

    @PutMapping("/groups/{id}/add-users")
    public ResponseEntity<Group> addUsersToGroup(
            @PathVariable long id,
            @RequestBody List<Long> userIds) {

        Group updateGroup = groupRepository
                            .findById(id)
                            .orElseThrow(() -> new RuntimeException("Group Not Found: " + id));

        for (Long userId : userIds) {
            User groupUser = userRepository
                            .findById(userId)
                            .orElseThrow(() -> new RuntimeException("User Not Found: " + userId));
            if (groupUser != null) {
                updateGroup.addUser(groupUser);
            }
        }

        groupRepository.save(updateGroup);

        return ResponseEntity.ok(updateGroup);
    }

    @PutMapping("/groups/{id}/modify-title")
    public ResponseEntity<Group> changeGroupTitle(
            @PathVariable long id,
            @RequestBody HashMap<String, String> newTitle){

        Group groupToUpdate = groupRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Event Not Found: " + id));
        groupToUpdate.setGroupName(newTitle.get("title"));

        groupRepository.save(groupToUpdate);


        return ResponseEntity.ok(groupToUpdate);
    }
}
