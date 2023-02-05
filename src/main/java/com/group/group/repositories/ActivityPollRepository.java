package com.group.group.repositories;

import com.group.group.models.ActivityPoll;
import com.group.group.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityPollRepository extends JpaRepository<ActivityPoll, Long> {
}
