package com.group.group.controllers;

import com.group.group.models.Group;
import com.group.group.models.User;
import com.group.group.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> getAllUsers(
            @RequestParam(name="friends_of_user_id", required = false) Long friends_of_user_id) {
        if (friends_of_user_id != null) {
            return new ResponseEntity<>(userRepository.findUserByFriendOfId(friends_of_user_id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/users/{id}")
    public ResponseEntity getUser(@PathVariable Long id){
        return new ResponseEntity<>(userRepository.findById(id), HttpStatus.OK);
    }

    @PutMapping("/users/{id}/update-user-name")
    public ResponseEntity<User> updateUserName(
            @PathVariable long id,
            @RequestBody HashMap<String, String> userName) {

        User updateUser = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Group Not Found: " + id));

        updateUser.setUserName(userName.get("new"));

        userRepository.save(updateUser);

        return ResponseEntity.ok(updateUser);
    }

    @PutMapping("/users/{id}/update-address")
    public ResponseEntity<User> updateAddress(
            @PathVariable long id,
            @RequestBody HashMap<String, String> address) {

        User updateUser = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Group Not Found: " + id));

        updateUser.setAddress(address.get("new"));

        userRepository.save(updateUser);

        return ResponseEntity.ok(updateUser);
    }
}
