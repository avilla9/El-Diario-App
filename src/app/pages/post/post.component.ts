import { Component, OnInit, ViewEncapsulation, Pipe } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { SafeHtmlPipe } from '../../safe-html.pipe';
import { ReactionService } from '../../services/reaction.service';
import { Share } from '@capacitor/share';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  post;
  apiUrl = environment.apiUrl;
  id: any;

  constructor(
    private iab: InAppBrowser,
    public navCtrl: NavController,
    private reactions: ReactionService,
    public httpClient: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpClient.post(this.apiUrl + '/posts/postDetails', {
      postId: this.id,
      userId: parseInt(localStorage.getItem('user_id'), 10)
    }).subscribe(data => {
      console.log('my data: ', data);
      this.post = data;
    }, (err: any) => {
      console.log(err);
    });
  }

  ngOnInit() {
    // console.log(this.post);
  }

  externalPost(url) {
    this.iab.create(url, '_self', 'beforeload=yes,location=yes,clearcache=yes,navigationbuttoncolor=#ffc404');
  }

  interalRedirection(url) {
    this.navCtrl.navigateForward(url);
  }

  like(post, event) {
    console.log('event', event);
    const target = event.target || event.srcElement || event.currentTarget;
    this.reactions
      .doLike(post)
      .subscribe((response) => {
        console.log(response);
        if (response > 0) {
          target.setAttribute('class', 'icon md hydrated liked');
          target.setAttribute('name', 'heart');
        } else {
          target.setAttribute('class', 'icon md hydrated');
          target.setAttribute('name', 'heart-outline');
        }
      });
  }

  async shareApp(post) {
    if (post.external_link != null) {
      await Share.share({
        title: post.title,
        text: post.short_description,
        url: post.external_link,
        dialogTitle: '¡Comparte con tus amigos!',
      });
    } else {
      await Share.share({
        title: post.title,
        text: post.short_description,
       url: window.location.href + '/post/' + post.id,
        dialogTitle: '¡Comparte con tus amigos!',
      });
    }
  }
}
