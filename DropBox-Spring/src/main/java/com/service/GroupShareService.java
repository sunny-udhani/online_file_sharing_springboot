package com.service;

import com.entity.Groups;
import com.entity.User;
import com.repository.GroupsRepository;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.CreateShareFolder;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;

@Service
public class GroupShareService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GroupsRepository groupTRepository;

    public boolean createShareFolder(CreateShareFolder createsharefolder) {


        return false;

    }

    public boolean createGroup(String groupName, String memberEmail) {

        if (groupName.equals("") && memberEmail.equals("")) {
            return false;
        } else {
            Groups groups = new Groups();
            groups.setGroup_name(groupName);
            User user = userRepository.findByEmail(memberEmail);
            groups.setOwner_id(user.getId());
            groupTRepository.save(groups);
            boolean x = new File("./" + groups.getGroupId()).mkdir();
            if (x) return true;
            else return false;
        }
    }

    public boolean addMembersToGroup(Integer group_id, String memberEmail) {

        if (memberEmail.equals("") && group_id == null) {
            return false;
        } else {
            Groups group = groupTRepository.findByGroupId(group_id);
            User groupMemberUser = userRepository.findByEmail(memberEmail);

//
            Set<User> memberSet = group.getUser();
            memberSet.add(groupMemberUser);
            group.setUser(memberSet);
//

            Set<Groups> groupSet = groupMemberUser.getGroupt();
            groupSet.add(group);
            groupMemberUser.setGroupt(groupSet);

            userRepository.save(groupMemberUser);
            groupTRepository.save(group);
//            groupTRepository.save(group);


        }

        return true;

    }

    public Groups[] listUserGroups(String userEmail) {

        if (userEmail.equals("")) {
            return new Groups[]{};
        } else {
//            Groups group = groupTRepository.findByGroup_id(group_id).get(0);
            User user = userRepository.findByEmail(userEmail);
            Set<Groups> groupSet = user.getGroupt();
            return groupSet.toArray(new Groups[groupSet.size()]);
        }
    }

    public User[] listGroupMembers(Integer group_id) {

        if (group_id == null) {
            return new User[]{};
        } else {
//            Groups group = groupTRepository.findByGroup_id(group_id).get(0);
            Groups groups = groupTRepository.findByGroupId(group_id);
            Set<User> memberSet = groups.getUser();
            return memberSet.toArray(new User[memberSet.size()]);
        }
    }

    public void uploader(MultipartFile file, Integer group_id) {

        try {
            byte[] bytes = file.getBytes();

            Path path = Paths.get("./" + group_id);
            Files.write(path, bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
