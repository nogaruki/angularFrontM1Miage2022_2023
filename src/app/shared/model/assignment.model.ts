export class Assignment {
    _id?: string;
    id!: Number;
    dateDeRendu!: Date;
    nom!: string;
    rendu!: Boolean;
    note!: Number;
    subject_id!: Number;
    teacher_id!: Number;
    students_id!: Number[];

    Constructor() {

        this.students_id = [];
    }
}
