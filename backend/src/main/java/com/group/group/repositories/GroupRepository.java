package com.group.group.repositories;

import com.group.group.models.Group;
import com.group.group.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    List<Group> findGroupsByUsersId(Long id);



//    List<User> findByGroupId(Long id);
}
