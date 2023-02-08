package com.group.group.repositories;

import com.group.group.models.DatePoll;
import com.group.group.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DatePollRepository extends JpaRepository<DatePoll, Long> {

    List<DatePoll> findDatePollsByUsersId(Long id);

    List<DatePoll> findDatePollsByGroupId(Long id);
}
