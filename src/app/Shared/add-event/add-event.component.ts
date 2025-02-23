import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {DayModel} from '../../Models/DayModel';
import {CommonModule} from '@angular/common';
import {EventsDTO} from '../../Models/EventModel';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
    selector: 'dst-add-event',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDatepickerModule,
        MatTimepickerModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatDialogModule
    ],
    providers: [provideNativeDateAdapter(),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-event.component.html',
    styleUrl: './add-event.component.scss'
})
export class AddEventComponent implements OnInit {
    formDate!: FormGroup;
    day: DayModel = {}
    defaultTime: Date = new Date();
    id: number = 0

    constructor(
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<AddEventComponent>,
        @Inject(MAT_DIALOG_DATA) private data: DayModel,
        private cd: ChangeDetectorRef,
    ) {
    }


    close() {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.formDate = this._fb.group({
            title: new FormControl(''),
            fromTime: new FormControl(),
            toTime: new FormControl(''),
            date: new FormControl(this.data?.date || new Date().toISOString().split('T')[0])
            // date: new FormControl( new Date().toISOString().split('T')[0])
        })
    }

    submitEvent() {
        const formData = this.formDate.value;
        const fromDate = new Date(formData.fromTime);
        const toDate = new Date(formData.toTime);

        // toDate.setFullYear(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());

        toDate.toString();// Sun Feb 16 2025 23:00:00 GMT+0330 (Iran Standard Time)

        formData.toTime = toDate;
        formData.fromTime = fromDate;

        const eventDate: EventsDTO = {...formData, id: this.generateId()}
        // this.createEvent(formData);
        this.dialogRef.close(eventDate);
        this.formDate.reset();
        this.cd.detectChanges();
    }

    generateId(): string {
        const date = new Date()
        return (date.getFullYear() + date.getMonth() + date.getTime()).toString()
    }

    createEvent(formDate: EventsDTO) {
        // this._createEvent.createModel(formDate)
    }
}
