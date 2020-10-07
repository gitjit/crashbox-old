import { Component, OnInit } from '@angular/core';
import { CrashService } from '../services/crash.service';
import { Project } from '../models/project';
import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  progress:boolean =true;
  projects:Project[] = []

  constructor(private crashService: CrashService) { }

  ngOnInit(): void {
      this.loadProjects();
  }

  loadProjects() {
    this.crashService.getProjects().subscribe({
      next: (projects) => {
        for (var proj of projects) {
          let ap = new Project();
          ap.name = proj;
          console.log("inside load projects" + ap.name);
          this.crashService.getLastCrash(ap.name).subscribe({
            next: (cr) => {
              console.log("inside load last crash "+ cr._ts + cr.version);
              ap.lastEntry = cr._ts;
              this.crashService.getCrashCount(ap.name).subscribe({
                next: (cnt) => {
                  ap.count = cnt;
                  this.projects.push(ap);
                },
                error: (err) => console.log(err),
              });
            },
            error: (err) => console.log(err),
          });
        }
        this.progress =false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDate(dt){
    return moment(dt * 1000).fromNow();
  }

}
