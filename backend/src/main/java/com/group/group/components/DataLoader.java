package com.group.group.components;

import com.group.group.models.*;
import com.group.group.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Profile("!test") //Run every time EXCEPT Tests
    @Component
    public class DataLoader implements ApplicationRunner {

        @Autowired
        ActivityPollRepository activityPollRepository;

        @Autowired
        DatePollRepository datePollRepository;

        @Autowired
        EventRepository eventRepository;

        @Autowired
        GroupRepository groupRepository;

        @Autowired
        LocationPollRepository locationPollRepository;

        @Autowired
        UserRepository userRepository;

        public DataLoader() {

        }

        public void run(ApplicationArguments args) {
            User jenna = new User("Jenna", "07447646000", "23 Canonsleigh Crescent, Leigh-On-Sea");
            User ed = new User("Ed", "07447351324", "1 Church Cottages, Church Street, Stratton Audley");
            User rory = new User("Rory", "07412908765", "Sydenham, Victoria Road, Dodford");
            User ali = new User("Alistair", "07908054321", "2 Mill Croft, Neston");
            User jacob = new User("Jacob", "079542321098", "66 Baulk Lane, Harworth");
            User heather = new User("Heather", "07163296035", "3 Fox Close, Dunton");
            User grace = new User("Grace", "0776543289", "24 Grange Road, Riddlesden");
            User samantha = new User("Samantha", "07096756432", "66 Baulk Lane, Harworth");
            User barbara = new User("Barbara", "07009887653", "45 Oulton Avenue, Belmont");
            User kenneth = new User("Kenneth", "07890888652", "The Cottage, Besselsleigh");

            rory.addFriend(ed);
            rory.addFriend(ali);
            rory.addFriend(jenna);
            ed.addFriend(heather);

            userRepository.save(rory);
            userRepository.save(ali);
            userRepository.save(jenna);
            userRepository.save(ed);
            userRepository.save(jacob);
            userRepository.save(heather);
            userRepository.save(grace);
            userRepository.save(samantha);
            userRepository.save(barbara);
            userRepository.save(kenneth);

            Group group1 = new Group("Group 1");
            Group group2 = new Group("Group 2");
            Group group3 = new Group("Group 3");

            groupRepository.save(group1);
            groupRepository.save(group2);
            groupRepository.save(group3);

            Event event1 = new Event("Monday 15th Feb", "Catching Up", "Edinburgh", "Beach", group1);
            Event event2 = new Event("Tuesday 20th Mar", "Seeing The Gang", "Edinburgh", "Pub", group1);
            Event event3 = new Event("Saturday 25th March", "Hang Out", "Glasgow", "Sam's House", group2);
            Event event4 = new Event("Sunday 3rd March", "Work Gals Night Out", "Edinburgh", "Dinner", group2);
            Event event5 = new Event("Tuesday 16th Feb", "Ken's Bday", "Edinburgh", "Ken's House", group3);
            Event event6 = new Event("Tuesday 16th Feb", "Games  Night", "Edinburgh", "Board Games", group3);

            eventRepository.save(event1);
            eventRepository.save(event2);
            eventRepository.save(event3);
            eventRepository.save(event4);
            eventRepository.save(event5);
            eventRepository.save(event6);

            DatePoll datePoll1 = new DatePoll(LocalDateTime.of(2023, 2, 18, 17, 0));
            DatePoll datePoll2 = new DatePoll(LocalDateTime.of(2023, 2, 20, 11, 0));
            DatePoll datePoll3 = new DatePoll(LocalDateTime.of(2023, 2, 19, 17, 0));

            ActivityPoll activityPoll1 = new ActivityPoll(LocalDateTime.of(2023, 2, 18, 17, 0));
            ActivityPoll activityPoll2 = new ActivityPoll(LocalDateTime.of(2023, 2, 19, 17, 0));
            ActivityPoll activityPoll3 = new ActivityPoll(LocalDateTime.of(2023, 2, 20, 17, 0));

            LocationPoll locationPoll1 = new LocationPoll(LocalDateTime.of(2023, 2, 18, 17, 0));
            LocationPoll locationPoll2 = new LocationPoll(LocalDateTime.of(2023, 2, 19, 17, 0));
            LocationPoll locationPoll3 = new LocationPoll(LocalDateTime.of(2023, 2, 20, 17, 0));

            group1.addUser(jenna);
            group1.addUser(rory);
            group1.addUser(ed);
            group1.addUser(ali);

            group2.addUser(samantha);
            group2.addUser(jacob);
            group2.addUser(heather);
            group2.addUser(grace);
            group2.addUser(barbara);
            group2.addUser(kenneth);

            group3.addUser(samantha);
            group3.addUser(jacob);
            group3.addUser(heather);

            groupRepository.save(group1);
            groupRepository.save(group2);
            groupRepository.save(group3);
        }
    }
