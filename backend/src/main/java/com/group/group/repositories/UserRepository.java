package com.group.group.repositories;

import com.group.group.models.LocationPoll;
import com.group.group.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findUserByFriendOfId(Long id);
}
