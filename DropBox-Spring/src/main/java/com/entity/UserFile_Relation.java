package com.entity;

import javax.persistence.*;

@Entity(name = "userfile_relation")
public class UserFile_Relation {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "userFile_relationID",nullable = false)
    private int id;

    @Column(name = "userfile_UserID",nullable = false)
    private int userId;

    @Column(name = "userfile_fileID",nullable = false)
    private int fileId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }
}
