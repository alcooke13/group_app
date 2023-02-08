package com.group.group.repositories;

import com.group.group.models.ActivityPoll;
import com.group.group.models.Group;
import com.group.group.models.LocationPoll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityPollRepository extends JpaRepository<ActivityPoll, Long> {

    List<ActivityPoll> findActivityPollByEventGroupUsersId(Long id);
}
