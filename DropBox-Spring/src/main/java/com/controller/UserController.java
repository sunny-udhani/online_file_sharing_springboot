package com.controller;

import com.entity.CreateShareFolder;
import com.entity.Sharewith;
import com.entity.User;
import com.service.GroupShareService;
import com.service.UserService;
import com.entity.Groups;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

import java.io.File;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private GroupShareService sharefolderservice;

    @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> addNewUser(@RequestBody User user) {
        userService.addUser(user);
        System.out.println("Saved");
        return new ResponseEntity(null, HttpStatus.CREATED);
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Iterable<User> getAllUsers() {

        return userService.getAllUsers();
    }

    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session) {
        System.out.println("aaj ");

        JSONObject jsonObject = new JSONObject(user);
        session.setAttribute("name", jsonObject.getString("username"));


        System.out.println("kal "+jsonObject.getString("username"));
        System.out.println(session.getAttribute("name"));
        return new ResponseEntity(userService.login(jsonObject.getString("username"), jsonObject.getString("password")), HttpStatus.OK);
    }


    //list of files
    @PostMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    File[] getAllUsers1(HttpSession session) {

        return userService.getAllUsers1(session.getAttribute("name").toString());

    }

    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/delete", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deletefile(@RequestBody String filename, HttpSession session) {

        System.out.println("IN DELETE");
        boolean x = userService.deletefile(filename,session.getAttribute("name").toString());
        return new ResponseEntity(HttpStatus.OK);

    }

    @PostMapping(path = "/sharing", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> sharefile(@RequestBody Sharewith sharewith, HttpSession session) {
        boolean x = userService.sharefile(sharewith);
        return new ResponseEntity(HttpStatus.OK);

    }

    @PostMapping(path = "/createsharefolder", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createsharefolder(@RequestBody CreateShareFolder createsharefolder, HttpSession session) {

        userService.createShareFolder(createsharefolder, session.getAttribute("name").toString());
        return new ResponseEntity(HttpStatus.OK);

    }

    @PostMapping(path = "/createfolder", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createfolder(@RequestBody CreateShareFolder createsharefolder, HttpSession session) {
        userService.createFolder(createsharefolder, session.getAttribute("name").toString());
        return new ResponseEntity(HttpStatus.OK);

    }


    @PostMapping("/uploadfiles") // //new annotation since 4.3
    public ResponseEntity<?> singleFileUpload(@RequestParam("file") MultipartFile file, HttpSession session) {
       String userfolder = session.getAttribute("name").toString();
        userService.uploader(file, userfolder);
        return new ResponseEntity(HttpStatus.OK);
    }


    @PostMapping("/createGroup") // //new annotation since 4.3
    public ResponseEntity<?> createGroup(@RequestBody String user,
                                         HttpSession session) {
        String userEmail = session.getAttribute("name").toString();
        JSONObject userObj = new JSONObject(user);
        System.out.println(userObj);

        boolean success = sharefolderservice.createGroup(userObj.getString("groupname"), userEmail);

        if (success) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/addMembersToGroup") // //new annotation since 4.3
    public ResponseEntity<?> addMembersToGroup(@RequestBody String user,
                                               HttpSession session) {
        String userEmail = session.getAttribute("name").toString();
        JSONObject userObj = new JSONObject(user);
        System.out.println(userObj);

        boolean success = sharefolderservice.addMembersToGroup(Integer.parseInt(userObj.getString("groupId")), userObj.getString("memberEmail"));

        if (success) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/listUserGroups") // //new annotation since 4.3
    public ResponseEntity<?> listUserGroups(@RequestBody String user,
                                            HttpSession session) {
        String userEmail = session.getAttribute("name").toString();
        JSONObject userObj = new JSONObject(user);
        System.out.println(userObj);

        Groups[] groupList = sharefolderservice.listUserGroups(userEmail);

        if (groupList.length > 0) {
            return new ResponseEntity(groupList, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/listGroupMembers") // //new annotation since 4.3
    public ResponseEntity<?> listGroupMembers(@RequestBody String user,
                                              HttpSession session) {
        String userEmail = session.getAttribute("name").toString();
        JSONObject userObj = new JSONObject(user);
        System.out.println(userObj);

        User[] memberList = sharefolderservice.listGroupMembers((userObj.getInt("groupId")));

        if (memberList.length > 0) {
            return new ResponseEntity(memberList, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

}