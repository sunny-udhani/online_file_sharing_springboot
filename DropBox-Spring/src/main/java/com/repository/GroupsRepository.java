package com.repository;

import com.entity.Groups;
import org.springframework.data.repository.CrudRepository;

public interface GroupsRepository extends CrudRepository<Groups, Long> {
    // List<Groups> find
    // List<User> find
    //List<Groups> findBy(Integer group_id);

    Groups findByGroupId(Integer group_id);
}
