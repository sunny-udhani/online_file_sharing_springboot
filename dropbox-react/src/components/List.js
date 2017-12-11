import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import * as API from '../api/API';
import folderIcon from '../1.png';
import NewFolder from "./NewFolder";
import NewSharedFolder from "./NewSharedFolder";
import Icon from '../smallFolderIcon.png';
import CreateNewFolder from '../CNF.png';
import realFolderIcon from '../5.jpeg';
import sharedFolderIcon from '../4.png';
import X from '../x.png';
import jpeg from '../jpeg.png';
import doc from '../doc.png';
import zip from '../zip.png';
import txt from '../txt.png';
import pdf from '../pdf.png';

import AlertContainer from 'react-alert';

import {alertOptions, showAlert} from "../alertConfig";



class List extends Component {

    static propTypes = {
        // classes: PropTypes.object.isRequired,
        images: PropTypes.array.isRequired,
        listFiles: PropTypes.func.isRequired,
        handleLogout: PropTypes.func.isRequired


    };

    toggleNewFolder =()=>{

        this.setState({
        newfolder: !this.state.newfolder
    })
    };

    toggleSharedFolder =()=>{

        this.setState({
            newSharedfolder: !this.state.newSharedfolder
        })
    };

    listGroupMembers= (payload) =>{
       API.listGroupMembers(payload)
           .then((data) => {
               console.log(data);
               this.setState({
                   groupMemberNames: data
               });
           });

   };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            images: [],
            filename: '',
            starredfile: [],
            imageStarred: false,
            newfolder: false,
            newSharedfolder: false,
            groupMembersFlag: false,
            groupMemberNames:[]


        }
    }

    componentWillMount() {
        console.log('FL inside compnt will mount1', this.state.username);


        API.getImages()
            .then((data) => {
              console.log(data);
              var x=[];
              var y=[];
              for(var i=0;i<data.length;i++){
                var z=data[i].split('/');
                x.push(z[z.length-1]);
                if(i%3==0){
                  y.push(z[z.length-1]);
                }
              }
                this.setState({
                    images: x,
                    starredfile:y
                    //username: data.objectSession
                    //imageStarred: data.resArray.starred
                });
            });
        console.log('FL inside compnt will mount2', this.state.username);
        console.log('imageStarred:', this.state.imageStarred);
    }

    handleFileUpload = (event) => {
        console.log('handleFileUP function:current user', this.state.username);
        const payload = new FormData();
        payload.append('username', this.state.username);
        payload.append('file', event.target.files[0]);

        showAlert("Uploaded successfully", "info", this);
        API.uploadFile(payload)
            .then((status) => {

              API.getImages()
                  .then((data) => {
                    console.log(data);
                    var x=[];
                    var y=[];
                    for(var i=0;i<data.length;i++){
                      var z=data[i].split('/');
                      x.push(z[z.length-1]);
                      if(i%3==0){
                        y.push(z[z.length-1]);
                      }
                    }
                      this.setState({
                          images: x,
                          starredfile:y
                          //username: data.objectSession
                          //imageStarred: data.resArray.starred
                      });


                  });

            });
    };

    handleDelete = (payload) => {
        console.log("payload received 1", payload);

        showAlert("Deleted successfully", "info", this);
        API.deleteFile(payload)
            .then((status) => {

                    console.log(status);
                    API.getImages()
                        .then((data) => {
                          console.log(data);
                          var x=[];
                          var y=[];
                          for(var i=0;i<data.length;i++){
                            var z=data[i].split('/');
                            x.push(z[z.length-1]);
                            if(i%3==0){
                              y.push(z[z.length-1]);
                            }
                          }
                            this.setState({
                                images: x,
                                starredfile:y
                                //username: data.objectSession
                                //imageStarred: data.resArray.starred
                            });
                        });

            });

    };

    createFolder = (payload) => {
        API.createFolder(payload)
            .then((data) => {
              API.getImages()
                  .then((data) => {
                    console.log(data);
                    var x=[];
                    var y=[];
                    for(var i=0;i<data.length;i++){
                      var z=data[i].split('/');
                      x.push(z[z.length-1]);
                      if(i%3==0){
                        y.push(z[z.length-1]);
                      }
                    }

                      showAlert("Folder Created successfully", "info", this);
                      this.setState({
                          images: x,
                          starredfile:y
                          //username: data.objectSession
                          //imageStarred: data.resArray.starred
                      });
                  });

            });
    };

    createSharedFolder = (payload) => {

        showAlert("Created successfully", "info", this);
        API.createSharedFolder(payload)
            .then((status) => {

              API.getImages()
                  .then((data) => {
                    console.log(data);
                    var x=[];
                    var y=[];
                    for(var i=0;i<data.length;i++){
                      var z=data[i].split('/');
                      x.push(z[z.length-1]);
                      if(i%3==0){
                        y.push(z[z.length-1]);
                      }
                    }
                      this.setState({
                          images: x,
                          starredfile:y
                          //username: data.objectSession
                          //imageStarred: data.resArray.starred
                      });
                  });

            });
    };

    handleStar = (payload) => {
        console.log('payload:', payload);
        this.state.starredfile.push(payload[0]);
        console.log('state star file array after push:', this.state.starredfile);

    };

    handleUnStar = (payload) => {
        console.log('payload in hadnleUnstar1:', payload);

        this.state.starredfile.pop(payload[0]);


        console.log('state star file array after pop:', this.state.starredfile);

    };

    renderUserMessage(filename){

    var arr = filename.split('/');
     var lastitem = arr[arr.length-1];

      if(lastitem.includes('.')) {
        return (
          <img src={folderIcon}/>
      );
      }
      else {
        if(lastitem.startsWith('Shared')){
          return (
            <img src={sharedFolderIcon}/>
          );
        }
        else {
        return (
        <img src={realFolderIcon}/>
      );
    }
      }

    }

    render() {
        const classes = this.props;


        return (

            <div className={classes.root}>
                <div className="row">
                    <div className="col-md-9 imageGridStyle ">
                      <div>
                      {
                            this.props.groupFlag
                            ?
                                <div>
                                    <h5 className="myStyle-main2">Groups</h5>
                                    <hr/>
                                    {this.props.groupNames.map(tile => (

                                        <div className="imageGridStyle " key={tile.groupId}>
                                            <a className="myStyle-main3"
                                               alt={'myimage'}>
                                                <img alt="myImg" src={folderIcon}/><label><b>Group ID: </b></label>{tile.groupId}</a>

                                            <a className="myStyle-main3"
                                               onClick={()=> {
                                                   this.setState({
                                                       groupMembersFlag: !this.state.groupMembersFlag
                                                   });
                                                   this.listGroupMembers({groupId: tile.groupId});
                                               }}
                                               alt={'myimage'}>
                                                <img alt="myImg" src={folderIcon}/><label><b>Group Name: </b></label>{tile.group_name}</a>


                                            <div className="download-button">
                                                <div>
                                                    <div className="dropdown">
                                                <span className="bold dropdownOption" data-toggle="dropdown">
                                                    ...
                                                </span>

                                                        <ul className="dropdown-menu">
                                                            <li className={'ddleft'}><a href={'#'}
                                                                                        download>Download</a></li>

                                                            <li className={'ddleft'}><a onClick={() => {
                                                                var x=tile.split('/');
                                                                var y=x[x.length-1];
                                                                this.handleDelete(y)
                                                            }}>Delete...</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <br/>
                                            <div className="myStyle-main4">
                                                <hr/>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                :
                                null



                        }
                      </div>
                        <br/><br/>
                        <div>
                        {
                            this.state.groupMembersFlag
                            ?
                                <div>
                                    {
                                        <ul><label><b>Group Member Names: </b></label>
                                            <hr/>
                                        {this.state.groupMemberNames.map(tile => (

                                                <label className="myStyle-main3"
                                                   alt={'myimage'} key={tile.id}><br/>
                                                    <li>Member Name: {tile.firstName} &nbsp; {tile.lastName} </li><br/>
                                                    <li>Member Email : {tile.email} </li>
                                                    <br/><br/>
                                                    </label>


                                        )
                                        )
                                        }
                                        </ul>
                                    }
                                </div>
                                :null
                        }
                      </div>
                        <br/><br/>

                        <h5 className="myStyle-main2">Starred</h5>
                        <div>
                        {this.state.starredfile.map(tile => (

                            <div className="imageGridStyle " key={tile}>
                                <a className="myStyle-main3" href={'http://localhost:3001/' + tile}
                                   alt={'myimage'}>
                                    <img alt="myImg" src={folderIcon}/>{tile}</a>
                                <svg onClick={() => {
                                    //tile.starred=!tile.starred;
                                    this.setState({});
                                    this.handleUnStar([{
                                        img: tile.img,
                                        cols: 2,
                                        myfileName: tile.myfileName,
                                        starred: tile.starred
                                    }])
                                }} width="32" height="32" className="playStarred">
                                    <path
                                        d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z">
                                    </path>
                                </svg>
                                <div className="download-button">
                                    <div>
                                        <div className="dropdown">
                                                <span className="bold dropdownOption" data-toggle="dropdown">
                                                    ...
                                                </span>

                                            <ul className="dropdown-menu">
                                                <li className={'ddleft'}><a href={'http://localhost:2181' + tile}
                                                                            download>Download</a></li>

                                                <li className={'ddleft'}><a onClick={() => {
                                                    var x=tile.split('/');
                                                    var y=x[x.length-1];
                                                    this.handleDelete(y)
                                                }}>Delete...</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <div className="myStyle-main4">
                                    <hr/>
                                </div>
                            </div>
                        ))}
                      </div>
                        <div className="myStyle-main4">
                            <hr/>
                        </div>
                        <br/>
                        <div className="myStyle-main4">
                            <hr/>
                        </div>
                        <h5 className="myStyle-main2">Recent</h5>
                        <div className="myStyle-main4">
                        </div>
                        <div>
                            {
                                this.state.newfolder
                                    ? <NewFolder createFolder={this.createFolder} toggleNewFolder={this.toggleNewFolder}/>
                                    : null
                            }
                        </div>

                        <div>
                            {
                                this.state.newSharedfolder
                                    ? <NewSharedFolder createSharedFolder={this.createSharedFolder} toggleSharedFolder={this.toggleSharedFolder}/>
                                    : null
                            }
                        </div>

                        {
                            this.state.images.map(tile => (

                                <div className="imageGridStyle toggleVisibility" key={tile} cols={tile || 1}>
                                    <br/>
                                    <a className="myStyle-main3" href={'http://localhost:3001/' + tile}
                                       alt={'myimage'}>
                                       {tile.includes('.')
                                         ?  tile.includes('.doc')
                                            ? <img alt="myImg" src={doc} style={{width:"30px",height:"30px"}}/>
                                          : tile.includes('.jpg')
                                            ?<img alt="myImg" src={jpeg} style={{width:"30px",height:"30px"}}/>
                                          : tile.includes('.txt')
                                            ?<img alt="myImg" src={txt} style={{width:"30px",height:"30px"}}/>
                                          :tile.includes('.zip')
                                            ?<img alt="myImg" src={zip} style={{width:"30px",height:"30px"}}/>
                                          :tile.includes('.pdf')
                                          ?<img alt="myImg" src={pdf} style={{width:"30px",height:"30px"}}/>
                                          :<img alt="myImg" src={folderIcon} style={{width:"30px",height:"30px"}}/>

                                       :  <img alt="myImg" src={realFolderIcon} style={{width:"30px",height:"30px"}}/>}
                                        {tile}</a>

                                    {
                                        tile.starred
                                            ? <svg onClick={() => {
                                                tile.starred = !tile.starred;
                                                this.setState({
                                                    imageStarred: !this.state.starredfile.starred
                                                });
                                                this.handleUnStar([{
                                                    img: tile.img,
                                                    cols: 2,
                                                    myfileName: tile.myfileName,
                                                    starred: tile.starred
                                                }])

                                            }} width="32" height="32" className="play">
                                                <path
                                                    d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z">
                                                </path>
                                            </svg>
                                            : <svg onClick={() => {
                                                tile.starred = !tile.starred;
                                                this.setState({
                                                    imageStarred: !this.state.starredfile.starred
                                                });
                                                this.handleStar([{
                                                    img: tile.img,
                                                    cols: 2,
                                                    myfileName: tile.myfileName,
                                                    starred: tile.starred
                                                }])
                                            }} width="32" height="32" className="play">
                                                <path
                                                    d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z">
                                                </path>
                                            </svg>
                                    }
                                    <div className="download-button">

                                        <div className="dropdown ">
                                                <span className="bold dropdownOption" data-toggle="dropdown">
                                                    ...
                                                </span>

                                            <ul className="dropdown-menu">
                                                <li className={'ddleft'}><a href={'http://localhost:3001/' + tile}
                                                                            download> Download </a></li>
                                                <li className={'ddleft'}><a onClick={() => {
                                                  var x=tile.split('/');
                                                  var y=x[x.length-1];
                                                  this.handleDelete(y)
                                                }}>Delete...</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="myStyle-main4">
                                        <hr/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-3">
                        <div className="maestro-nav__container" style={{background : "#cbe4fa"}}>
                            <div className="maestro-nav__panel">
                                <div className="maestro-nav__contents">

                                <button className="btn btn-primary logout" onClick={this.props.handleLogout}>Logout
                                </button>
                                <br/><br/>

                                    <ul className="maestro-nav__products">
                                        <li>
                                            <label className="btn btn-primary navuploadButton">
                                                Upload Files<input type="file" hidden onChange={this.handleFileUpload}/>
                                            </label>
                                        </li>

                                        <a>
                                            <li data-reactid="20">
                                                <br/><span onClick={() => {
                                                this.setState({newfolder: !this.state.newfolder});
                                            }}><img src={CreateNewFolder} alt={'Create New Folder'}/> Create New Folder
                                        </span>

                                            </li>
                                            <li data-reactid="25">
                                                <br/><span onClick={() => {
                                                this.setState({newSharedfolder: !this.state.newSharedfolder});
                                            }}><img alt="myImg" src={Icon}/> New Shared Folder</span>
                                            </li>
                                            <li data-reactid="25">
                                                <br/><span onClick={() => {
                                                let aaj = prompt('Please enter name of the group');

                                                showAlert("group created successfully", "info", this);
                                            }}><img alt="myImg" src={Icon}/> Create Group</span>
                                            </li>
                                            <li data-reactid="25">
                                                <br/><span onClick={() => {
                                                let user = prompt('Enter Emails to add in group');

                                                showAlert("user added to group successfully", "info", this);
                                            }}><img alt="myImg" src={Icon}/>Add Member To Group</span>
                                            </li>
                                        </a>

                                    </ul>
                                </div>

                                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default List;
