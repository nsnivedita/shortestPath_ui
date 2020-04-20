import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';
import { Planets } from 'src/app/model/planets';
import { Distance } from 'src/app/model/distance';


@Component({
  selector: 'app-shortest-path',
  templateUrl: './shortest-path.component.html',
  styleUrls: ['./shortest-path.component.scss']
})
export class ShortestPathComponent implements OnInit {
  constructor(private dataService: DataService) { }
  modelsource: any;
  modeldest: any;
  planet: any;
  destplanet: [];
  planetlist: any;
  planets: Planets[];
  path: string;
  distance: Distance;
  displayData: boolean;
  displayData1: boolean;
  source: string;
  destination: string;
  distances: string;
  duration: string;


  
  @ViewChild('sourceinstance') sourceinstance: NgbTypeahead;
  sourceFocus$ = new Subject<string>();
  sourceClick$ = new Subject<string>();
  @ViewChild('destinstance') destinstance: NgbTypeahead;
  destFocus$ = new Subject<string>();
  destClick$ = new Subject<string>();

  ngOnInit() {
    this.dataService.findAll().subscribe(data=> {
      this.planets = data;
      this.planetlist = this.planets.map(a => a.planet_name); })
    this.displayData1 = false;
    this.displayData = true;
  }

  searchsource = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const sourceClicksWithClosedPopup$ = this.sourceClick$.pipe(filter(() => !this.sourceinstance.isPopupOpen()));
    const inputFocus$ = this.sourceFocus$;

    return merge(debouncedText$, inputFocus$, sourceClicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.planetlist
        : this.planetlist.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  searchdest = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const destClicksWithClosedPopup$ = this.destClick$.pipe(filter(() => !this.destinstance.isPopupOpen()));
    const inputFocus$ = this.destFocus$;

    return merge(debouncedText$, inputFocus$, destClicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.planetlist
        : this.planetlist.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  findShortestDistance(){

    
    this.dataService.findDirection(this.modelsource, this.modeldest ).subscribe(data=>{
      this.path = data.path,
      this.source = data.source,
      this.destination = data.destination,
      this.distances = data.distance,
      this.duration = data.duration
    });

      this.displayData = false;
      this.displayData1 = true;


      this.modeldest = '';
      this.modelsource = '';
     
   }
}
