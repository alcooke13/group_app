package com.group.group.repositories;

import com.group.group.models.DatePoll;
import com.group.group.models.Group;
import com.group.group.models.LocationPoll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationPollRepository extends JpaRepository<LocationPoll, Long> {

    List<LocationPoll> findLocationPollByEventGroupUsersId(Long id);
    List<LocationPoll> findLocationPollByEventGroupId(Long id);
}
