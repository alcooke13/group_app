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
            User stan = new User("Stan Lee", "07890765398", "1290 Avenue Of The Americas");
            User peter = new User("Peter Parker", "07447646000", "23 Canonsleigh Crescent, Leigh-On-Sea");
            User bruce = new User("Bruce Bannerman", "07447351324", "1 Church Cottages, Church Street, Stratton Audley");
            User tony = new User("Tony Stark", "07412908765", "Sydenham, Victoria Road, Dodford");
            User shuri = new User("Shuri Udaku", "07908054321", "2 Mill Croft, Neston");
            User steve = new User("Steve Rogers", "079542321098", "66 Baulk Lane, Harworth");
            User stephen = new User("Stephen Strange", "07163296035", "3 Fox Close, Dunton");
            User thor = new User("Thor Odison", "0776543289", "24 Grange Road, Riddlesden");
            User wanda = new User("Wanda Maximoff", "07096756432", "66 Baulk Lane, Harworth");
            User bucky = new User("Bucky Barnes", "07009887653", "45 Oulton Avenue, Belmont");
            User natasha = new User("Natasha Romanoff", "07890888652", "The Cottage, Besselsleigh");
            User clint = new User("Clint Barton", "07890888652", "The Cottage, Besselsleigh");
            User henry = new User("Henry Pym", "07890888652", "The Cottage, Besselsleigh");
            User tchalla = new User("T'Challa Udaku", "07890888652", "The Cottage, Besselsleigh");
            User ororo = new User("Ororo Munroe", "07890888652", "The Cottage, Besselsleigh");
            User carol = new User("Carol Danvers", "07890888652", "The Cottage, Besselsleigh");

            stan.addFriend(peter);
            stan.addFriend(bruce);
            stan.addFriend(tony);
            stan.addFriend(shuri);
            stan.addFriend(steve);
            stan.addFriend(stephen);
            stan.addFriend(thor);
            stan.addFriend(wanda);
            stan.addFriend(bucky);
            stan.addFriend(natasha);
            stan.addFriend(clint);
            stan.addFriend(henry);
            stan.addFriend(tchalla);
            stan.addFriend(ororo);
            stan.addFriend(carol);

            userRepository.save(stan);
            userRepository.save(peter);
            userRepository.save(bruce);
            userRepository.save(tony);
            userRepository.save(shuri);
            userRepository.save(steve);
            userRepository.save(stephen);
            userRepository.save(thor);
            userRepository.save(wanda);
            userRepository.save(bucky);
            userRepository.save(natasha);
            userRepository.save(clint);
            userRepository.save(henry);
            userRepository.save(tchalla);
            userRepository.save(ororo);
            userRepository.save(carol);

            Group avengers = new Group("Avengers");
            Group xMen = new Group("XMen");
            Group marvelGals = new Group("MarvelGals");

            groupRepository.save(avengers);
            groupRepository.save(xMen);
            groupRepository.save(marvelGals);

            Event event1 = new Event( "Catching Up", "Edinburgh", "Beach", group1);
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

            DatePoll datePoll1 = new DatePoll(LocalDateTime.of(2023, 2, 5, 17, 0), event1);
            DatePoll datePoll2 = new DatePoll(LocalDateTime.of(2023, 2, 20, 11, 0), event2);
            DatePoll datePoll3 = new DatePoll(LocalDateTime.of(2023, 2, 19, 17, 0), event4);

            datePollRepository.save(datePoll1);
            datePollRepository.save(datePoll2);
            datePollRepository.save(datePoll3);

            ActivityPoll activityPoll1 = new ActivityPoll(LocalDateTime.of(2023, 2, 18, 17, 0), event1);
            ActivityPoll activityPoll2 = new ActivityPoll(LocalDateTime.of(2023, 2, 5, 17, 0), event2);
            ActivityPoll activityPoll3 = new ActivityPoll(LocalDateTime.of(2023, 2, 20, 17, 0), event3);

            activityPollRepository.save(activityPoll1);
            activityPollRepository.save(activityPoll2);
            activityPollRepository.save(activityPoll3);

            LocationPoll locationPoll1 = new LocationPoll(LocalDateTime.of(2023, 2, 18, 17, 0), event1);
            LocationPoll locationPoll2 = new LocationPoll(LocalDateTime.of(2023, 2, 19, 17, 0), event4);
            LocationPoll locationPoll3 = new LocationPoll(LocalDateTime.of(2023, 2, 5, 17, 0), event5);

            locationPollRepository.save(locationPoll1);
            locationPollRepository.save(locationPoll2);
            locationPollRepository.save(locationPoll3);

            event1.setDatePoll(datePoll1);
            event1.setActivityPoll(activityPoll1);
            event1.setLocationPoll(locationPoll1);

            event2.setDatePoll(datePoll2);
            event2.setActivityPoll(activityPoll2);

            event3.setActivityPoll(activityPoll3);

            event4.setDatePoll(datePoll3);
            event4.setLocationPoll(locationPoll2);

            event5.setLocationPoll(locationPoll3);

            datePoll1.addOption("2023-02-18T18:00");
            datePoll2.addOption("2023-02-18T18:00");
            datePoll1.addUserToOption("2023-02-18T18:00",1L);
            datePoll2.addUserToOption("2023-02-18T18:00",2L);

            datePollRepository.save(datePoll1);
            datePollRepository.save(datePoll2);

            activityPoll1.addOption("hike");
            activityPoll1.addUserToOption("hike",2L);
            activityPoll1.addUserToOption("hike",3L);

            activityPollRepository.save(activityPoll1);
            activityPollRepository.save(activityPoll1);

            locationPoll1.addOption("Edinburgh");
            locationPoll1.addUserToOption("Edinburgh", 1L);

            locationPollRepository.save(locationPoll1);

            eventRepository.save(event1);
            eventRepository.save(event2);
            eventRepository.save(event3);
            eventRepository.save(event4);
            eventRepository.save(event5);

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
