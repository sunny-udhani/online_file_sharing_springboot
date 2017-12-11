package com.entity;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "filedetails")
public class FileDetails {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(name = "fileName",unique = true, nullable = false)
    private String fileName;

    @Column(name = "filePath")
    private String filePath;

    @Column(name = "fileType")
    private Boolean fileType;

    @Column(name = "fileStarInd")
    private Boolean fileStarInd;

    @Column(name = "fileCreatedDt", nullable = false)
    private Date fileCreatedDt;

    @Column(name = "fileDeletedDt")
    private Date fileDeletedDt;

    @Column(name = "fileSharedDt")
    private Date fileSharedDt;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Boolean getFileType() {
        return fileType;
    }

    public void setFileType(Boolean fileType) {
        this.fileType = fileType;
    }

    public Boolean getFileStarInd() {
        return fileStarInd;
    }

    public void setFileStarInd(Boolean fileStarInd) {
        this.fileStarInd = fileStarInd;
    }

    public Date getFileCreatedDt() {
        return fileCreatedDt;
    }

    public void setFileCreatedDt(Date fileCreatedDt) {
        this.fileCreatedDt = fileCreatedDt;
    }

    public Date getFileDeletedDt() {
        return fileDeletedDt;
    }

    public void setFileDeletedDt(Date fileDeletedDt) {
        this.fileDeletedDt = fileDeletedDt;
    }

    public Date getFileSharedDt() {
        return fileSharedDt;
    }

    public void setFileSharedDt(Date fileSharedDt) {
        this.fileSharedDt = fileSharedDt;
    }
}
