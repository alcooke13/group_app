package com.group.group.repositories;

import com.group.group.models.DatePoll;
import com.group.group.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatePollRepository extends JpaRepository<DatePoll, Long> {
}
