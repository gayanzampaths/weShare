import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-tooldata',
  templateUrl: 'tooldata.html',
  providers: [AngularFireDatabase]
})
export class TooldataPage {

  toolData: FirebaseListObservable<any> ;
  //public toolData;

  userlist: FirebaseListObservable<any>;

  comments: FirebaseListObservable<any>;

  public toolID;
  public toolName;
  public cat;
  public price;
  public dep;
  public user;
  public name;

  public rate;
  public commentadd;
  commentlist: FirebaseListObservable<any> ;
  public com = [];

  public onlyRead: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFireDatabase) {

                this.comments = this.af.list('/comments');

                console.log(this.com);

  }

  async getData(){
    this.toolID = this.navParams.get('id');
    this.toolData = this.af.list('/tools/'+this.toolID);

    console.log(this.toolID);
                
      this.toolData.subscribe(tool=>{

        console.log(tool);

        console.log(tool);

        for(let i=0;i<tool.length;i++){

          if(tool[i].$key==="toolName"){
            this.toolName = tool[i].$value;
            console.log(this.toolName);
          }

          if(tool[i].$key==="category"){
            this.cat = tool[i].$value;
            console.log(this.cat);
          }

          if(tool[i].$key==="price"){
            this.price = tool[i].$value;
            console.log(this.price);
          }

          if(tool[i].$key==="rates"){
            this.rate = tool[i].$value;
            console.log(this.rate);
          }

          if(tool[i].$key==="userID"){
            this.user = tool[i].$value;
            console.log(this.user);

            this.userlist = this.af.list('/user/'+this.user);

            this.userlist.subscribe(user =>{
              for(let i=0;i<user.length;i++){
                if(user[i].$key==="name"){
                  this.name = user[i].$value;
                  console.log(this.name);
                }
              }
            })
          }

          //console.log(tool[i].$key + " : " + tool[i].$value);
        }
      })

                console.log(this.toolData);
                
  }

  ionViewDidLoad() {
    this.getData();
    this.loadComments();
  }

  loadComments(){
    this.toolID = this.navParams.get('id');
    this.commentlist = this.af.list('/comments');

    this.commentlist.subscribe(comm => {
      console.log(comm);
      for(let i=0;i<comm.length;i++){
       if(comm[i].toolID==this.toolID){
        this.com.push(comm[i].comment);
       }
      }
    })
  }

  goToProfile(){
    let data = {
      user: this.user
    }
    this.navCtrl.push(ProfilePage, data);
  }

  log(val){
    console.log(val);
    this.rate = val;
  }

  comment(){
    let comm = {
      comment: this.commentadd,
      toolID: this.toolID
    }
    this.comments.push(comm);
  }

  

}
