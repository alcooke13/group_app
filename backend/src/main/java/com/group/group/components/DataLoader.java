package com.group.group.components;

import com.group.group.models.*;
import com.group.group.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Profile("!test") //Run every time EXCEPT Tests
//    @Component
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
            User clint = new User("Clint Barton", "07234567123", "The Cottage, Besselsleigh");
            User henry = new User("Henry Pym", "07890000999", "The Cottage, Besselsleigh");
            User tchalla = new User("T'Challa Udaku", "07334211567", "The Cottage, Besselsleigh");
            User ororo = new User("Ororo Munroe", "07899765432", "The Cottage, Besselsleigh");
            User carol = new User("Carol Danvers", "07723098700", "The Cottage, Besselsleigh");
            User jennifer = new User("Jennifer Walters", "07897654788", "The Cottage, Besselsleigh");
            User jane = new User("Jane Foster", "07898776554", "The Cottage, Besselsleigh");
            User rogue = new User("Rogue", "07789543111", "The Cottage, Besselsleigh");
            User xavier = new User("Charles Xavier", "07665454676", "The Cottage, Besselsleigh");
            User scott = new User("Scott Summers", "07990887889", "The Cottage, Besselsleigh");

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
            stan.addFriend(jennifer);
            stan.addFriend(jane);
            stan.addFriend(rogue);
            stan.addFriend(xavier);
            stan.addFriend(scott);

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
            userRepository.save(jennifer);
            userRepository.save(jane);
            userRepository.save(rogue);
            userRepository.save(xavier);
            userRepository.save(scott);

            Group avengers = new Group("Avengers");
            Group xMen = new Group("X-Men");
            Group marvelGals = new Group("Marvel Gals");

            groupRepository.save(avengers);
            groupRepository.save(xMen);
            groupRepository.save(marvelGals);

            Event tonysBirthday = new Event((LocalDateTime.of(2023,3,5,17,0)), "Tony's Birthday", "Edinburgh", "Laser Quest", avengers);
            Event xMenReunion = new Event((LocalDateTime.of(2023,3,10,17,0)), "X-Men Reunion", "Edinburgh", "Pub", xMen);
            Event girlsNightFeb = new Event((LocalDateTime.of(2023,3,2,17,0)), "Girls Night Out", "Glasgow", "Meal & Drinks", marvelGals);
            Event gamesNight = new Event((LocalDateTime.of(2023,2,7,11,0)), "Games Night", "Edinburgh", "Boardgames", avengers);
            Event ninjaWarrior = new Event((LocalDateTime.of(2023,2,1,9,0)), "Ninja Warrior", "Glasgow", "Getting Fit", xMen);
            Event girlsNightJan = new Event((LocalDateTime.of(2023,2,3,17,0)), "Girls Night Out", "Edinburgh", "Natasha's House", marvelGals);
            Event avengersassemble = new Event((LocalDateTime.of(2023,1,3,14,0)), "Avengers Assemble", "Glasgow", "Tony's House", avengers);


            eventRepository.save(tonysBirthday);
            eventRepository.save(xMenReunion);
            eventRepository.save(girlsNightFeb);
            eventRepository.save(gamesNight);
            eventRepository.save(ninjaWarrior);
            eventRepository.save(girlsNightJan);
            eventRepository.save(avengersassemble);

            DatePoll datePoll1 = new DatePoll(LocalDateTime.of(2023,9,5,17,0), tonysBirthday);
            DatePoll datePoll2 = new DatePoll(LocalDateTime.of(2023,3,10,17,0), xMenReunion);
            DatePoll datePoll3 = new DatePoll(LocalDateTime.of(2023,3,2,17,0), girlsNightFeb);
            
            datePollRepository.save(datePoll1);
            datePollRepository.save(datePoll2);
            datePollRepository.save(datePoll3);

            ActivityPoll activityPoll1 = new ActivityPoll(LocalDateTime.of(2023,2,19,17,0), tonysBirthday);
            ActivityPoll activityPoll2 = new ActivityPoll(LocalDateTime.of(2023,3,10,17,0), xMenReunion);
            ActivityPoll activityPoll3 = new ActivityPoll(LocalDateTime.of(2023,3,2,17,0), girlsNightFeb);

            activityPollRepository.save(activityPoll1);
            activityPollRepository.save(activityPoll2);
            activityPollRepository.save(activityPoll3);

            LocationPoll locationPoll1 = new LocationPoll(LocalDateTime.of(2023,3,5,17,0), tonysBirthday);
            LocationPoll locationPoll2 = new LocationPoll(LocalDateTime.of(2023,3,10,17,0), xMenReunion);
            LocationPoll locationPoll3 = new LocationPoll(LocalDateTime.of(2023,3,2,17,0), girlsNightFeb);

            locationPollRepository.save(locationPoll1);
            locationPollRepository.save(locationPoll2);
            locationPollRepository.save(locationPoll3);

            tonysBirthday.setDatePoll(datePoll1);
            tonysBirthday.setActivityPoll(activityPoll1);
            tonysBirthday.setLocationPoll(locationPoll1);

            xMenReunion.setDatePoll(datePoll2);
            xMenReunion.setActivityPoll(activityPoll2);
            xMenReunion.setLocationPoll(locationPoll2);


            girlsNightFeb.setLocationPoll(locationPoll3);

            datePoll1.addOption("2023-02-18T18:00");
            datePoll1.addOption("2023-02-19T18:00");
            datePoll2.addOption("2023-02-18T18:00");
            datePoll1.addUserToOption("2023-02-18T18:00",1L);
            datePoll1.addUserToOption("2023-02-18T18:00",2L);
            datePoll1.addUserToOption("2023-02-18T18:00",3L);
            datePoll2.addUserToOption("2023-02-18T18:00",2L);

            datePollRepository.save(datePoll1);
            datePollRepository.save(datePoll2);

            activityPoll1.addOption("hike");
            activityPoll1.addUserToOption("hike",2L);
            activityPoll1.addUserToOption("hike",3L);

            activityPoll3.addOption("pub");
            activityPoll3.addOption("walk");
            activityPoll3.addUserToOption("pub",4L);
            activityPoll3.addUserToOption("walk",5L);
            activityPoll3.addUserToOption("walk",6L);

            activityPollRepository.save(activityPoll1);
            activityPollRepository.save(activityPoll3);

            locationPoll1.addOption("Edinburgh");
            locationPoll1.addUserToOption("Edinburgh", 1L);

            locationPollRepository.save(locationPoll1);

            locationPoll3.addOption("Edinburgh");
            locationPoll3.addOption("Glasgow");
            locationPoll3.addUserToOption("Edinburgh", 1L);
            locationPoll3.addUserToOption("Edinburgh", 2L);
            locationPoll3.addUserToOption("Edinburgh", 2L);
            locationPoll3.addUserToOption("Edinburgh", 3L);
            locationPoll3.addUserToOption("Edinburgh", 4L);

            locationPollRepository.save(locationPoll1);
            locationPollRepository.save(locationPoll3);

            eventRepository.save(tonysBirthday);
            eventRepository.save(xMenReunion);
            eventRepository.save(girlsNightFeb);
            eventRepository.save(gamesNight);
            eventRepository.save(ninjaWarrior);
            eventRepository.save(girlsNightJan);
            eventRepository.save(avengersassemble);


            avengers.addUser(stan);
            avengers.addUser(tony);
            avengers.addUser(peter);
            avengers.addUser(bruce);
            avengers.addUser(shuri);
            avengers.addUser(steve);
            avengers.addUser(stephen);
            avengers.addUser(thor);
            avengers.addUser(wanda);
            avengers.addUser(bucky);
            avengers.addUser(natasha);
            avengers.addUser(clint);
            avengers.addUser(henry);
            avengers.addUser(tchalla);

            xMen.addUser(stan);
            xMen.addUser(rogue);
            xMen.addUser(xavier);
            xMen.addUser(scott);
            xMen.addUser(ororo);

            marvelGals.addUser(stan);
            marvelGals.addUser(shuri);
            marvelGals.addUser(wanda);
            marvelGals.addUser(natasha);
            marvelGals.addUser(rogue);
            marvelGals.addUser(carol);
            marvelGals.addUser(jennifer);
            marvelGals.addUser(jane);


            groupRepository.save(avengers);
            groupRepository.save(xMen);
            groupRepository.save(marvelGals);
        }
    }
