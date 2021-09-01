import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent, noop} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Store} from '../common/store.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;
    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private store:Store) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });
    }

  ngAfterViewInit() {

    /**
     * this.form.valueChanges -- we are taking this observable
     * which is the value that form ".subscribe(changes =>"
     * and we are converting in const saveCourses$  to a 2nd save observable
     * but we are not waiting for it to complete a save
     *
     * 1st thing we take(fromPromise(fetch(`/api/courses/${this.course.id}`,)
     * and assign it to a new function saveCourse()
     * 2nd it will take 1 argument (changes) which are the form changes
     * and going to get us back and obserable.
     *
     * 3rd step = .subscribe(const saveCourse$ = this.saveCourse(changes)
     *
     *
     */

    /**
     * we want to take the form values turn them into HTTP request
     * and wait for the first http request to complete
     * before creating the second http request
     * Map concat map is taking the values from value changes,
     * creating new observables, subscribing to themand concatenating
     * them together.
     */

    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        concatMap(changes => this.saveCourse(changes))
    )
      .subscribe();
  }

  saveCourse(changes) {
      return fromPromise(fetch(`/api/courses/${this.course.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      }));
    }

    save() {
        this.store.saveCourse(this.course.id, this.form.value)
            .subscribe(
                () => this.close(),
                err => console.log("Error saving course", err)
            );
    }




    close() {
        this.dialogRef.close();
    }


}
