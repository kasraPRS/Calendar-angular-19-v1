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
import {CreateEventService} from "../../Utilities Services/create-event.service";

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
    dayEvents: EventsDTO = {};
    day: DayModel = {}

    constructor(
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<AddEventComponent>,
        @Inject(MAT_DIALOG_DATA) private data: DayModel,
        private cd: ChangeDetectorRef,
        private _createEvent: CreateEventService
    ) {
        console.log(data)
    }


    close() {
        this.dialogRef.close(this.dayEvents);
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        const defaultTime = this.convertTimeStringToDate(this.data?.time)
        this.formDate = this._fb.group({
            title: new FormControl(''),
            fromTime: new FormControl(defaultTime),
            toTime: new FormControl(''),
            date: new FormControl(this.data?.date || new Date())
        })
    }

    convertTimeStringToDate(timeString: any): Date {
        const [hours, minutes] = timeString.split(':').map(Number); // Remove [0]
        const date = this.data?.date!;
        date?.setHours(hours, minutes, 0, 0);
        return date;
    }

    submitEvent() {
        const formData = this.formDate.value;
        const fromDate = new Date(formData.fromTime);
        const toDate = new Date(formData.toTime);

        toDate.setFullYear(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());

        toDate.toString();// Sun Feb 16 2025 23:00:00 GMT+0330 (Iran Standard Time)

        formData.toTime = toDate;
        this.createEvent(this.formDate.value);
        this.dialogRef.close(this.dayEvents);
        this.formDate.reset();
        this.cd.detectChanges();
    }

    createEvent(formDate: EventsDTO) {
        this._createEvent.createModel(formDate)
    }
}
